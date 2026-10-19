import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const ORIGIN = "capacitor://localhost";
const TABLE = "gallaspy_player_avatars";
const BUCKET = "gallaspy-avatars";
const MAX_UPLOAD = 1048576;
const MAX_BODY = 1400000;

function respond(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
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
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      Vary: "Origin",
    },
  });
}

async function authorize(request: NextRequest): Promise<{
  admin: SupabaseClient;
  userId: string;
} | null> {
  const authorization = request.headers.get("authorization") || "";
  if (!/^Bearer \S+$/.test(authorization)) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !anon || !secret) return null;
  const auth = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await auth.auth.getUser(authorization.slice(7));
  if (error || !data.user) return null;
  return {
    admin: createClient(url, secret, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
    userId: data.user.id,
  };
}

async function getExisting(admin: SupabaseClient, userId: string) {
  const { data, error } = await admin.from(TABLE)
    .select("storage_path").eq("user_id", userId).maybeSingle();
  if (error) throw new Error("avatar read failed");
  const path = data?.storage_path;
  return typeof path === "string" && path.startsWith(userId + "/") ? path : null;
}

async function getSigned(admin: SupabaseClient, path: string | null) {
  if (!path) return null;
  const { data, error } = await admin.storage.from(BUCKET).createSignedUrl(path, 1800);
  if (error || !data?.signedUrl) throw new Error("avatar sign failed");
  return data.signedUrl;
}

function isJpeg(bytes: Uint8Array) {
  return bytes.length >= 100 && bytes[0] === 255 && bytes[1] === 216 &&
    bytes[bytes.length - 2] === 255 && bytes[bytes.length - 1] === 217;
}

export async function GET(request: NextRequest) {
  try {
    const context = await authorize(request);
    if (!context) return respond({ success: false, error: "Sign in to view your photo." }, 401);
    const path = await getExisting(context.admin, context.userId);
    return respond({ success: true, avatar_url: await getSigned(context.admin, path) });
  } catch {
    return respond({ success: false, error: "Photo unavailable." }, 503);
  }
}

export async function POST(request: NextRequest) {
  try {
    const context = await authorize(request);
    if (!context) return respond({ success: false, error: "Sign in to add your photo." }, 401);
    const size = Number(request.headers.get("content-length") ?? "0");
    if (size > MAX_BODY) return respond({ success: false, error: "Upload too large." }, 413);
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data;")) {
      return respond({ success: false, error: "Image upload required." }, 415);
    }
    // Bound the stream before collecting multipart bytes; don't trust Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return respond({ success: false, error: "Image upload required." }, 400);
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY) {
        await reader.cancel();
        return respond({ success: false, error: "Upload too large." }, 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    const multipart = new Request("https://local.invalid", {
      method: "POST", body, headers: { "Content-Type": contentType },
    });
    const form = await multipart.formData();
    const photo = form.get("photo");
    if (!(photo instanceof File) || photo.type !== "image/jpeg" || photo.size > MAX_UPLOAD) {
      return respond({ success: false, error: "Use a JPEG photo under 1 MB." }, 400);
    }
    const bytes = new Uint8Array(await photo.arrayBuffer());
    if (!isJpeg(bytes)) return respond({ success: false, error: "Invalid photo." }, 400);

    const previous = await getExisting(context.admin, context.userId);
    const path = `${context.userId}/${randomUUID()}.jpg`;
    const { error: storageError } = await context.admin.storage.from(BUCKET).upload(path, bytes, {
      contentType: "image/jpeg", cacheControl: "60", upsert: false,
    });
    if (storageError) return respond({ success: false, error: "Unable to upload photo." }, 503);

    const { error: dbError } = await context.admin.from(TABLE).upsert({
      user_id: context.userId, storage_path: path, updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (dbError) {
      await context.admin.storage.from(BUCKET).remove([path]);
      return respond({ success: false, error: "Unable to save photo." }, 503);
    }
    if (previous && previous !== path) {
      await context.admin.storage.from(BUCKET).remove([previous]);
    }
    return respond({ success: true, avatar_url: await getSigned(context.admin, path) });
  } catch {
    return respond({ success: false, error: "Unable to process photo." }, 503);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const context = await authorize(request);
    if (!context) return respond({ success: false, error: "Sign in to remove your photo." }, 401);
    const previous = await getExisting(context.admin, context.userId);
    const { error } = await context.admin.from(TABLE).delete().eq("user_id", context.userId);
    if (error) return respond({ success: false, error: "Unable to remove photo." }, 503);
    if (previous) await context.admin.storage.from(BUCKET).remove([previous]);
    return respond({ success: true, avatar_url: null });
  } catch {
    return respond({ success: false, error: "Unable to remove photo." }, 503);
  }
}
