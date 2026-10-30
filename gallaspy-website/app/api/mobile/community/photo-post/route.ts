import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ORIGIN = "capacitor://localhost";
const BUCKET = "gallaspy-community";
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 1_800_000;
const MAX_BODY_BYTES = 8_000_000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function respond(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "private, no-store",
      Vary: "Origin",
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      Vary: "Origin",
    },
  });
}

class PhotoError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

/** Limit bytes while streaming; content-length alone is not trustworthy. */
async function boundedFormData(request: NextRequest): Promise<FormData> {
  const contentType = request.headers.get("content-type") || "";
  if (!/^multipart\/form-data\s*;\s*boundary=/i.test(contentType)) {
    throw new PhotoError("Photo upload required.", 415);
  }
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > MAX_BODY_BYTES) {
    throw new PhotoError("Photo upload is too large.", 413);
  }
  if (!request.body) throw new PhotoError("Photo upload is empty.", 400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        throw new PhotoError("Photo upload is too large.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const blob = new Blob(chunks.map((chunk) => new Uint8Array(chunk)));
  const parsedRequest = new Request("https://gallaspy.invalid/photo-form", {
    method: "POST",
    headers: { "content-type": contentType },
    body: blob,
  });
  return parsedRequest.formData();
}

function validJpeg(bytes: Uint8Array) {
  return bytes.length >= 100 && bytes[0] === 0xff && bytes[1] === 0xd8 &&
    bytes[2] === 0xff && bytes[bytes.length - 2] === 0xff &&
    bytes[bytes.length - 1] === 0xd9;
}

async function authenticatedClients(request: NextRequest) {
  const authorization = request.headers.get("authorization") || "";
  if (!/^Bearer \S+$/.test(authorization)) throw new PhotoError("Sign in to post photos.", 401);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !anonKey || !serviceKey) throw new PhotoError("Community photo posting unavailable.", 503);
  const auth = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await auth.auth.getUser(authorization.slice(7));
  if (error || !data.user) throw new PhotoError("Sign in to post photos.", 401);
  // Use authenticated RLS for all draft/upload/registration/publish operations.
  const member = createClient(url, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // Service role is for cleanup of this request's verified-owned draft only.
  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return { userId: data.user.id, member, admin };
}

async function clearFailedDraft(admin: SupabaseClient, userId: string, draftId: string, paths: string[]) {
  try {
    const { data, error } = await admin.from("gallaspy_community_posts")
      .select("id,published_at")
      .eq("id", draftId).eq("user_id", userId).maybeSingle();
    // Never reverse a possibly successful publish.
    if (error || !data || data.published_at !== null) return;
    if (paths.length) {
      const { error: removalError } = await admin.storage.from(BUCKET).remove(paths);
      if (removalError) {
        console.error("Community photo cleanup: storage removal failed");
        return; // Do not discard the draft if photo objects cannot be deleted.
      }
    }
    const { error: deleteError } = await admin.from("gallaspy_community_posts")
      .delete().eq("id", draftId).eq("user_id", userId).is("published_at", null);
    if (deleteError) console.error("Community photo cleanup: draft delete failed");
  } catch {
    console.error("Community photo cleanup unavailable");
  }
}

export async function POST(request: NextRequest) {
  let cleanup: { admin: SupabaseClient; userId: string; draftId: string; paths: string[] } | null = null;
  try {
    const { userId, member, admin } = await authenticatedClients(request);
    const form = await boundedFormData(request);
    const values = form.getAll("photos");
    const caption = form.get("body");
    if (typeof caption !== "string" || caption.trim().length > 3000) {
      throw new PhotoError("Caption must be at most 3,000 characters.", 400);
    }
    if (values.length < 1 || values.length > MAX_PHOTOS) {
      throw new PhotoError("Select between one and four photos.", 400);
    }
    const images: Uint8Array[] = [];
    for (const value of values) {
      if (!(value instanceof File) || value.type !== "image/jpeg" ||
          value.size < 100 || value.size > MAX_PHOTO_BYTES) {
        throw new PhotoError("Each photo must be an optimized JPEG under 1.8 MB.", 400);
      }
      const bytes = new Uint8Array(await value.arrayBuffer());
      if (!validJpeg(bytes)) throw new PhotoError("Invalid photo data.", 400);
      images.push(bytes);
    }
    const { data: draft, error: createError } = await member.rpc("gallaspy_create_community_draft");
    if (createError || typeof draft !== "string" || !UUID_RE.test(draft)) {
      if (createError?.message?.includes("Maximum unfinished drafts")) {
        throw new PhotoError("Too many unfinished posts. Contact support for cleanup.", 429);
      }
      throw new PhotoError("Could not prepare photo post.", 503);
    }
    cleanup = { admin, userId, draftId: draft, paths: [] };
    for (let i = 0; i < images.length; i++) {
      const path = `${userId}/${draft}/${randomUUID()}.jpg`;
      const { error: uploadError } = await member.storage.from(BUCKET)
        .upload(path, images[i], {
          contentType: "image/jpeg", cacheControl: "3600", upsert: false,
        });
      if (uploadError) throw new PhotoError("Could not upload photo. Please retry.", 503);
      cleanup.paths.push(path);
      const { error: recordError } = await member.from("gallaspy_community_photos")
        .insert({ post_id: draft, storage_path: path, position: i });
      if (recordError) throw new PhotoError("Could not register photo. Please retry.", 503);
    }
    const { data: published, error: publishError } = await member.rpc(
      "gallaspy_publish_community_draft", { target_post_id: draft, post_body: caption.trim() },
    );
    if (publishError || published !== draft) {
      if (publishError?.message?.includes("Please wait 60 seconds") ||
          publishError?.message?.includes("Daily posting limit reached")) {
        throw new PhotoError(publishError.message, 429);
      }
      throw new PhotoError("Unable to publish photos. Please retry.", 503);
    }
    cleanup = null; // Published successfully; never remove a published post.
    return respond({ success: true, post: { id: draft, user_id: userId, body: caption.trim() } }, 201);
  } catch (error) {
    if (cleanup) {
      await clearFailedDraft(cleanup.admin, cleanup.userId, cleanup.draftId, cleanup.paths);
    }
    if (error instanceof PhotoError) {
      return respond({ success: false, error: error.message }, error.status);
    }
    console.error("Community photo-post unexpected error");
    return respond({ success: false, error: "Community photo posting unavailable." }, 503);
  }
}
