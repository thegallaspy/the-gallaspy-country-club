import {
  authenticate,
  json,
  failure,
  preflight,
  ScorecardError,
} from "@/lib/scorecards/server";

export const dynamic = "force-dynamic";

export function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  try {
    const { db, userId, playerId } =
      await authenticate(request);

    const url = new URL(request.url);

    const offset = Number(
      url.searchParams.get("offset") ?? "0"
    );

    if (!Number.isSafeInteger(offset) || offset < 0) {
      throw new ScorecardError(
        "INVALID_REQUEST",
        400,
        "Invalid history offset."
      );
    }

    const limit = 25;

    const { data: rows, error } = await db
      .from("gallaspy_scorecard_rounds")
      .select(`
        id,
        course_name,
        round_date,
        hole_count,
        revision,
        legacy_round_id,
        completed_at
      `)
      .eq("owner_player_id", playerId)
      .eq("status", "completed")
      .order("round_date", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + limit);

    if (error) throw error;

    const hasMore = (rows?.length ?? 0) > limit;
    const rounds = (rows ?? []).slice(0, limit);

    const result = [];

    for (const round of rounds) {
      const { data: player, error: playerError } =
        await db
          .from("gallaspy_scorecard_players")
          .select("id")
          .eq("round_id", round.id)
          .eq("player_id", playerId)
          .single();

      if (playerError) throw playerError;

      const { data: holes, error: holeError } =
        await db
          .from("gallaspy_hole_scores")
          .select(`
            hole_number,
            par,
            strokes,
            putts,
            fairway_result,
            green_in_regulation
          `)
          .eq("scorecard_player_id", player.id)
          .order("hole_number");

      if (holeError) throw holeError;

      const scores = holes ?? [];

      if (
        scores.length !== round.hole_count ||
        scores.some(h => h.strokes === null)
      ) {
        throw new Error("Incomplete stored scorecard");
      }

      const total = scores.reduce(
        (sum, h) => sum + Number(h.strokes), 0
      );

      const totalPar = scores.reduce(
        (sum, h) => sum + Number(h.par), 0
      );

      result.push({
        id: round.id,
        legacy_round_id: round.legacy_round_id,
        course: round.course_name,
        date: round.round_date,
        holeCount: round.hole_count,
        revision: round.revision,
        completed_at: round.completed_at,
        scores: scores.map(h => h.strokes),
        pars: scores.map(h => h.par),
        holes: scores,
        total,
        relative_to_par: total - totalPar,
        verified: false,
      });
    }

    return json(request, {
      success: true,
      contract_version: 1,
      account_id: userId,
      rounds: result,
      next_offset: hasMore ? offset + limit : null,
    });

  } catch (error) {
    return failure(request, error);
  }
}
