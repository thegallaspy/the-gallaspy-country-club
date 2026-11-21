import type {
  ScorecardOperation,
  LegacyImportRequest,
} from "./contracts";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function object(value: unknown): value is Record<string, unknown> {
  return !!value &&
    typeof value === "object" &&
    !Array.isArray(value);
}

function uuid(value: unknown): boolean {
  return typeof value === "string" && UUID.test(value);
}

function integer(value: unknown, min: number, max: number): boolean {
  return typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= min &&
    value <= max;
}

function text(value: unknown, max: number): boolean {
  return typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= max;
}

function date(value: unknown): boolean {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) return false;

  const d = new Date(value + "T00:00:00Z");
  return Number.isFinite(d.getTime()) &&
    d.toISOString().slice(0, 10) === value;
}

function identity(value: Record<string, unknown>): boolean {
  return value.contract_version === 1 &&
    uuid(value.operation_id) &&
    uuid(value.device_id) &&
    uuid(value.round_id);
}

function only(
  value: Record<string, unknown>,
  allowed: string[]
): boolean {
  return Object.keys(value).every(key => allowed.includes(key));
}

export function validateOperation(
  input: unknown
): input is ScorecardOperation {
  if (
    !object(input) ||
    !identity(input) ||
    !object(input.payload) ||
    !only(input, [
      "contract_version", "operation_id", "device_id",
      "round_id", "operation_type", "expected_revision",
      "payload"
    ])
  ) return false;

  const p = input.payload;

  switch (input.operation_type) {
    case "create_round":
      return input.expected_revision === 0 &&
        only(p, ["course_name", "round_date", "hole_count"]) &&
        text(p.course_name, 200) &&
        date(p.round_date) &&
        (p.hole_count === 9 || p.hole_count === 18);

    case "record_hole":
      return integer(input.expected_revision, 1, Number.MAX_SAFE_INTEGER) &&
        only(p, [
          "hole_number", "par", "strokes", "putts",
          "fairway_result", "green_in_regulation"
        ]) &&
        integer(p.hole_number, 1, 18) &&
        integer(p.par, 3, 6) &&
        integer(p.strokes, 1, 20) &&
        (
          p.putts == null ||
          (
            typeof p.strokes === "number" &&
            integer(p.putts, 0, p.strokes)
          )
        ) &&
        (
          p.fairway_result == null ||
          ["left", "hit", "right"].includes(String(p.fairway_result))
        ) &&
        (
          p.green_in_regulation == null ||
          typeof p.green_in_regulation === "boolean"
        );

    case "complete_round":
    case "abandon_round":
      return integer(input.expected_revision, 1, Number.MAX_SAFE_INTEGER) &&
        Object.keys(p).length === 0;

    default:
      return false;
  }
}

export function validateLegacy(
  input: unknown
): input is LegacyImportRequest {
  if (
    !object(input) ||
    !identity(input) ||
    input.ownership_confirmed !== true ||
    !object(input.payload) ||
    !only(input, [
      "contract_version", "operation_id", "device_id",
      "round_id", "ownership_confirmed", "payload"
    ])
  ) return false;

  const p = input.payload;

  if (
    !only(p, [
      "id", "course", "date", "holeCount", "pars",
      "scores", "total"
    ]) ||
    !text(p.id, 200) ||
    !text(p.course, 200) ||
    !date(p.date) ||
    (p.holeCount !== 9 && p.holeCount !== 18) ||
    !Array.isArray(p.pars) ||
    !Array.isArray(p.scores)
  ) return false;

  return p.pars.length === p.holeCount &&
    p.scores.length === p.holeCount &&
    p.pars.every(n => integer(n, 3, 6)) &&
    p.scores.every(n => integer(n, 1, 20)) &&
    (p.total === undefined || integer(p.total, 1, 360));
}
