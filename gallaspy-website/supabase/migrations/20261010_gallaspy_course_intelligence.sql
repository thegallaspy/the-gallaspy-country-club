-- THE GALLASPY: COURSE INTELLIGENCE
-- Initial schema. No course measurements are assumed.

CREATE TABLE IF NOT EXISTS public.gallaspy_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text,
  state text,
  country text NOT NULL DEFAULT 'US',
  address text,
  latitude double precision CHECK (latitude BETWEEN -90 AND 90),
  longitude double precision CHECK (longitude BETWEEN -180 AND 180),
  is_archived boolean NOT NULL DEFAULT false,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'in_review', 'verified')),
  source_name text,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallaspy_course_tees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL
    REFERENCES public.gallaspy_courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text,
  course_rating numeric(4,1),
  slope_rating integer CHECK (slope_rating BETWEEN 55 AND 155),
  total_yards integer CHECK (total_yards > 0),
  UNIQUE (course_id, name)
);

CREATE TABLE IF NOT EXISTS public.gallaspy_course_holes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL
    REFERENCES public.gallaspy_courses(id) ON DELETE CASCADE,
  hole_number integer NOT NULL CHECK (hole_number BETWEEN 1 AND 18),
  par integer CHECK (par BETWEEN 3 AND 6),
  handicap_rank integer CHECK (handicap_rank BETWEEN 1 AND 18),
  UNIQUE (course_id, hole_number)
);

CREATE TABLE IF NOT EXISTS public.gallaspy_hole_tee_yardages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hole_id uuid NOT NULL
    REFERENCES public.gallaspy_course_holes(id) ON DELETE CASCADE,
  tee_id uuid NOT NULL
    REFERENCES public.gallaspy_course_tees(id) ON DELETE CASCADE,
  yards integer NOT NULL CHECK (yards BETWEEN 40 AND 900),
  tee_par integer CHECK (tee_par BETWEEN 3 AND 6),
  source_name text,
  verified_at timestamptz,
  UNIQUE (hole_id, tee_id)
);

CREATE TABLE IF NOT EXISTS public.gallaspy_course_map_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hole_id uuid NOT NULL
    REFERENCES public.gallaspy_course_holes(id) ON DELETE CASCADE,
  feature_type text NOT NULL CHECK (
    feature_type IN (
      'tee', 'green_front', 'green_center', 'green_back',
      'bunker', 'water', 'layup', 'pin'
    )
  ),
  label text,
  latitude double precision NOT NULL
    CHECK (latitude BETWEEN -90 AND 90),
  longitude double precision NOT NULL
    CHECK (longitude BETWEEN -180 AND 180),
  source_name text,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Restrict all five tables by default.
ALTER TABLE public.gallaspy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_course_tees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_course_holes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_hole_tee_yardages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_course_map_features ENABLE ROW LEVEL SECURITY;

-- No public read or write policies yet.
-- Future reads will use a controlled API.
-- Admin writes will require verified server-side authorization.

REVOKE ALL ON public.gallaspy_courses FROM anon, authenticated;
REVOKE ALL ON public.gallaspy_course_tees FROM anon, authenticated;
REVOKE ALL ON public.gallaspy_course_holes FROM anon, authenticated;
REVOKE ALL ON public.gallaspy_hole_tee_yardages FROM anon, authenticated;
REVOKE ALL ON public.gallaspy_course_map_features FROM anon, authenticated;


-- Ensure tee yardages never cross between different courses.
CREATE OR REPLACE FUNCTION public.gallaspy_validate_hole_tee_course()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  hole_course uuid;
  tee_course uuid;
BEGIN
  SELECT course_id INTO hole_course
  FROM public.gallaspy_course_holes
  WHERE id = NEW.hole_id;

  SELECT course_id INTO tee_course
  FROM public.gallaspy_course_tees
  WHERE id = NEW.tee_id;

  IF hole_course IS NULL
     OR tee_course IS NULL
     OR hole_course <> tee_course THEN
    RAISE EXCEPTION
      'Hole and tee must belong to the same course';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER gallaspy_check_hole_tee_course
BEFORE INSERT OR UPDATE OF hole_id, tee_id
ON public.gallaspy_hole_tee_yardages
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_validate_hole_tee_course();

-- Only one reference coordinate for each green position.
CREATE UNIQUE INDEX gallaspy_unique_green_reference
ON public.gallaspy_course_map_features (hole_id, feature_type)
WHERE feature_type IN (
  'green_front', 'green_center', 'green_back'
);

-- GPS measurements need a verification timestamp.
ALTER TABLE public.gallaspy_course_map_features
ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();

-- Prevent client roles from invoking the validation function.
REVOKE ALL ON FUNCTION
  public.gallaspy_validate_hole_tee_course()
FROM PUBLIC, anon, authenticated;


-- Preserve course relationships after hole and tee creation.
CREATE OR REPLACE FUNCTION public.gallaspy_prevent_course_reassignment()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.course_id IS DISTINCT FROM OLD.course_id THEN
    RAISE EXCEPTION
      'Moving a hole or tee to another course is not permitted';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER gallaspy_protect_hole_course
BEFORE UPDATE OF course_id
ON public.gallaspy_course_holes
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_prevent_course_reassignment();

CREATE TRIGGER gallaspy_protect_tee_course
BEFORE UPDATE OF course_id
ON public.gallaspy_course_tees
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_prevent_course_reassignment();

REVOKE ALL ON FUNCTION
  public.gallaspy_prevent_course_reassignment()
FROM PUBLIC, anon, authenticated;


-- Course search and lookup performance.
CREATE INDEX gallaspy_courses_search_idx
ON public.gallaspy_courses (state, city, name)
WHERE is_archived = false;

CREATE INDEX gallaspy_course_holes_course_idx
ON public.gallaspy_course_holes (course_id, hole_number);

CREATE INDEX gallaspy_map_features_hole_idx
ON public.gallaspy_course_map_features (hole_id, feature_type);
