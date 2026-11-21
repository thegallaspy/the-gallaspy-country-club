import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const courseFields = "id,name,slug,city,state,country,latitude,longitude,location_verified,verification_status";

function headers(request: Request) {
  const h = new Headers({ "Cache-Control": "private, no-store", Vary: "Origin",
    "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Authorization, Content-Type" });
  const origin = request.headers.get("origin");
  if (origin === "capacitor://localhost" || origin === "https://localhost") h.set("Access-Control-Allow-Origin", origin);
  return h;
}
export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: headers(request) });
}

export async function GET(request: Request) {
  const reply = (body: object, status = 200) => Response.json({ contract_version: 1, ...body }, { status, headers: headers(request) });
  const fail = (code: string, message: string, status: number) => reply({ success: false, error: { code, message } }, status);
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return fail("UNAUTHENTICATED", "Sign in to continue.", 401);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !secret) return fail("UNAVAILABLE", "Course service unavailable.", 503);
  const options = { auth: { persistSession: false, autoRefreshToken: false } };
  try {
    const auth = createClient(url, anon, options);
    const { data: session, error: authError } = await auth.auth.getUser(token);
    if (authError || !session.user) return fail("UNAUTHENTICATED", "Sign in again to continue.", 401);
    if (!session.user.email_confirmed_at) return fail("FORBIDDEN", "Verify your email first.", 403);
    const db = createClient(url, secret, options);
    const params = new URL(request.url).searchParams;
    const q = params.get("q")?.trim();
    const courseId = params.get("course_id");
    const layoutId = params.get("layout_id");
    if (q !== undefined && (courseId || layoutId) || layoutId && !courseId ||
        courseId && !uuid.test(courseId) || layoutId && !uuid.test(layoutId)) {
      return fail("INVALID_REQUEST", "Choose a valid course or search.", 400);
    }
    if (!courseId) {
      if (!q || q.length < 2 || q.length > 100 || /[%_*\\\u0000-\u001f]/.test(q)) return fail("INVALID_REQUEST", "Enter a course name.", 400);
      const { data, error } = await db.from("gallaspy_courses").select(courseFields)
        .eq("is_archived", false).is("canonical_course_id", null).eq("course_status", "active")
        .ilike("name", `%${q}%`).order("name").order("id").limit(25);
      if (error) throw error;
      return reply({ success: true, courses: data.map(c => ({ ...c, latitude: c.location_verified ? c.latitude : null, longitude: c.location_verified ? c.longitude : null })) });
    }
    const { data: course, error: courseError } = await db.from("gallaspy_courses").select(courseFields)
      .eq("id", courseId).eq("is_archived", false).is("canonical_course_id", null).eq("course_status", "active").maybeSingle();
    if (courseError) throw courseError;
    if (!course) return fail("NOT_FOUND", "Course not found.", 404);
    // Existing account-scoped pilot gate governs access to provisional scorecards.
    const { data: pilot, error: pilotError } = await db.rpc("gallaspy_scorecard_access", { p_auth_user_id: session.user.id });
    if (pilotError) throw pilotError;
    const { data: layouts, error: layoutError } = await db.from("gallaspy_course_layouts")
      .select("id,layout_name,layout_code,hole_count,verification_status,source_url,verified_at")
      .eq("course_id", courseId).order("layout_name").limit(50);
    if (layoutError) throw layoutError;
    const canRead = (l: typeof layouts[number]) => l.verification_status === "verified" && Boolean(l.verified_at) || l.verification_status === "in_review" && pilot === true;
    const publicCourse = { ...course, latitude: course.location_verified ? course.latitude : null, longitude: course.location_verified ? course.longitude : null };
    if (!layoutId) return reply({ success: true, course: publicCourse, layouts: layouts.map(l => ({ ...l, available: canRead(l) })) });
    const layout = layouts.find(l => l.id === layoutId);
    if (!layout) return fail("NOT_FOUND", "Layout not found.", 404);
    if (!canRead(layout)) return fail("DATA_UNAVAILABLE", "Scorecard data is not available for this layout yet.", 409);
    const [tees, holes] = await Promise.all([
      db.from("gallaspy_course_tees").select("id,name,color,total_yards").eq("course_id", courseId).eq("layout_id", layoutId).order("name").limit(50),
      db.from("gallaspy_course_holes").select("id,hole_number,par,handicap_rank").eq("course_id", courseId).eq("layout_id", layoutId).order("hole_number").limit(18),
    ]);
    if (tees.error || holes.error) throw tees.error || holes.error;
    if (!tees.data.length || !holes.data.length) return fail("DATA_UNAVAILABLE", "Scorecard data is incomplete.", 409);
    const teeIds = tees.data.map(t => t.id);
    const holeIds = holes.data.map(h => h.id);
    const [ratings, distances, features] = await Promise.all([
      db.from("gallaspy_course_tee_ratings").select("tee_id,rating_category,par,course_rating,slope_rating,source_name,source_url,verified_at").in("tee_id", teeIds).limit(100),
      db.from("gallaspy_hole_tee_yardages").select("hole_id,tee_id,yards,tee_par,source_name,verified_at").in("hole_id", holeIds).in("tee_id", teeIds).limit(900),
      db.from("gallaspy_course_map_features").select("hole_id,feature_type,label,latitude,longitude,source_name,verified_at").in("hole_id", holeIds).not("verified_at", "is", null).limit(900),
    ]);
    if (ratings.error || distances.error || features.error) throw ratings.error || distances.error || features.error;
    const provisional = layout.verification_status !== "verified";
    return reply({ success: true, course: publicCourse, layout, provisional,
      official_handicap_eligible: false,
      tees: tees.data.map(t => {
        const rows = holes.data.map(h => {
          const y = distances.data.find(d => d.hole_id === h.id && d.tee_id === t.id && (provisional || d.verified_at));
          return { number: h.hole_number, par: y?.tee_par ?? h.par, hcp: h.handicap_rank, yards: y?.yards ?? null,
            source_name: y?.source_name ?? null, source: !y ? "unavailable" : provisional ? "in_review" : "verified",
            map_features: features.data.filter(f => f.hole_id === h.id) };
        });
        const complete = rows.length === layout.hole_count && rows.every((h, i) => h.number === i + 1 && h.par !== null && h.yards !== null) &&
          rows.reduce((sum, h) => sum + (h.yards ?? 0), 0) === t.total_yards;
        return { ...t, complete, ratings: ratings.data.filter(r => r.tee_id === t.id), holes: rows };
      }),
    });
  } catch (error) {
    console.error("course-intelligence request failed", error instanceof Error ? error.name : "database error");
    return fail("UNAVAILABLE", "Course service unavailable. Try again.", 503);
  }
}
