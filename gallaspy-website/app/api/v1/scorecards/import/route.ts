import {
  authenticate,
  readBody,
  json,
  failure,
  preflight,
  databaseError,
  ScorecardError,
} from "@/lib/scorecards/server";

import { validateLegacy } from "@/lib/scorecards/validation";

export const dynamic = "force-dynamic";

export function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  try {
    const { db, userId } = await authenticate(request);
    const input = await readBody(request);

    if (!validateLegacy(input)) {
      throw new ScorecardError(
        "INVALID_REQUEST", 400, "Invalid legacy scorecard."
      );
    }

    const { data, error } = await db.rpc(
      "gallaspy_import_legacy_scorecard_v1",
      {
        p_auth_user_id: userId,
        p_operation_id: input.operation_id,
        p_device_id: input.device_id,
        p_round_id: input.round_id,
        p_payload: input.payload,
      }
    );

    if (error) throw databaseError(error.message);

    return json(request, data);

  } catch (error) {
    return failure(request, error);
  }
}
