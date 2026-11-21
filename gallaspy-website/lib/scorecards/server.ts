import { createClient } from "@supabase/supabase-js";
import type { ScorecardErrorCode } from "./contracts";

export class ScorecardError extends Error {
  constructor(
    public code: ScorecardErrorCode,
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export function headers(request: Request): Headers {
  const h = new Headers({
    "Cache-Control": "private, no-store",
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  });

  const origin = request.headers.get("origin");

  if (
    origin === "capacitor://localhost" ||
    origin === "https://localhost"
  ) {
    h.set("Access-Control-Allow-Origin", origin);
  }

  return h;
}

export function json(
  request: Request,
  body: unknown,
  status = 200
) {
  return Response.json(body, {
    status,
    headers: headers(request),
  });
}

export function preflight(request: Request) {
  return new Response(null, {
    status: 204,
    headers: headers(request),
  });
}

export async function authenticate(request: Request) {
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(\S+)$/i)?.[1];

  if (!token) {
    throw new ScorecardError(
      "UNAUTHENTICATED", 401, "Sign in to continue."
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anon || !secret) {
    throw new ScorecardError(
      "INTERNAL_ERROR", 503, "Scorecard service unavailable."
    );
  }

  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  };

  const auth = createClient(url, anon, options);
  const { data, error } = await auth.auth.getUser(token);

  if (error || !data.user) {
    throw new ScorecardError(
      "UNAUTHENTICATED", 401, "Sign in again to continue."
    );
  }

  if (!data.user.email_confirmed_at) {
    throw new ScorecardError(
      "FORBIDDEN", 403, "Verify your email first."
    );
  }

  const db = createClient(url, secret, options);

  const { data: player, error: playerError } = await db
    .from("gallaspy_players")
    .select("id")
    .eq("auth_user_id", data.user.id)
    .eq("player_status", "active")
    .maybeSingle();

  if (playerError) {
    throw new ScorecardError(
      "INTERNAL_ERROR", 503, "Player service unavailable."
    );
  }

  if (!player) {
    throw new ScorecardError(
      "FORBIDDEN", 403, "A linked Gallaspy Player ID is required."
    );
  }

  const { data: enabled, error: flagError } =
    await db.rpc("gallaspy_scorecard_access", {
      p_auth_user_id: data.user.id,
    });

  if (flagError) {
    throw new ScorecardError(
      "INTERNAL_ERROR", 503, "Scorecard service unavailable."
    );
  }

  if (enabled !== true) {
    throw new ScorecardError(
      "FEATURE_DISABLED", 503, "Scorecard sync is not yet available."
    );
  }

  return {
    db,
    userId: data.user.id,
    playerId: player.id as string,
  };
}

export async function readBody(request: Request): Promise<unknown> {
  const limit = 32768;
  const reader = request.body?.getReader();

  if (!reader) {
    throw new ScorecardError(
      "INVALID_REQUEST", 400, "Request body required."
    );
  }

  const decoder = new TextDecoder();
  let size = 0;
  let body = "";

  try {
    while (true) {
      const result = await reader.read();

      if (result.done) break;

      size += result.value.byteLength;

      if (size > limit) {
        await reader.cancel();

        throw new ScorecardError(
          "PAYLOAD_TOO_LARGE", 413, "Request too large."
        );
      }

      body += decoder.decode(result.value, { stream: true });
    }

    body += decoder.decode();
    return JSON.parse(body);

  } catch (error) {
    if (error instanceof ScorecardError) throw error;

    throw new ScorecardError(
      "INVALID_REQUEST", 400, "Invalid JSON request."
    );
  } finally {
    reader.releaseLock();
  }
}

export function databaseError(message: string): ScorecardError {
  const errors: Record<string, [ScorecardErrorCode, number]> = {
    "Scorecard revision conflict": ["REVISION_CONFLICT", 409],
    "Operation identifier reuse": ["DUPLICATE_OPERATION", 409],
    "Legacy round already imported": ["ALREADY_IMPORTED", 409],
    "Scorecard unavailable": ["ROUND_NOT_FOUND", 404],
    "Round is locked": ["ROUND_LOCKED", 409],
    "Incomplete scorecard": ["INCOMPLETE_ROUND", 422],
    "Active player account required": ["FORBIDDEN", 403],
    "Scorecard synchronization is disabled": ["FEATURE_DISABLED", 503],
    "Hole exceeds round length": ["INVALID_REQUEST", 422],
  };

  const result = errors[message];

  return result
    ? new ScorecardError(result[0], result[1], message)
    : new ScorecardError(
        "INTERNAL_ERROR", 500, "Unable to synchronize scorecard."
      );
}

export function failure(request: Request, error: unknown) {
  const e = error instanceof ScorecardError
    ? error
    : new ScorecardError(
        "INTERNAL_ERROR", 500, "Scorecard service unavailable."
      );

  if (e.status >= 500 && e.code !== "FEATURE_DISABLED") {
    console.error("Gallaspy scorecard service:", e.code);
  }

  return json(request, {
    success: false,
    contract_version: 1,
    error: {
      code: e.code,
      message: e.message,
    },
  }, e.status);
}
