
export const SCORECARD_CONTRACT_VERSION = 1 as const;

export type HoleCount = 9 | 18;

export type RoundStatus =
  | "draft"
  | "active"
  | "completed"
  | "abandoned";

export type FairwayResult =
  | "left"
  | "hit"
  | "right";

export interface CreateRoundPayload {
  course_name: string;
  round_date: string;
  hole_count: HoleCount;
}

export interface RecordHolePayload {
  hole_number: number;
  par: number;
  strokes: number;
  putts?: number | null;
  fairway_result?: FairwayResult | null;
  green_in_regulation?: boolean | null;
}

export interface OperationIdentity {
  contract_version: 1;
  operation_id: string;
  device_id: string;
  round_id: string;
}

export type ScorecardOperation = OperationIdentity & (
  | {
      operation_type: "create_round";
      expected_revision: 0;
      payload: CreateRoundPayload;
    }
  | {
      operation_type: "record_hole";
      expected_revision: number;
      payload: RecordHolePayload;
    }
  | {
      operation_type: "complete_round";
      expected_revision: number;
      payload: Record<string, never>;
    }
  | {
      operation_type: "abandon_round";
      expected_revision: number;
      payload: Record<string, never>;
    }
);

export interface LegacyScorecard {
  id: string;
  course: string;
  date: string;
  holeCount: HoleCount;
  pars: number[];
  scores: number[];
  total?: number;
}

export interface LegacyImportRequest
  extends OperationIdentity {

  ownership_confirmed: true;
  payload: LegacyScorecard;
}

export interface ScorecardSyncResponse {
  success: true;
  contract_version: 1;
  operation_id: string;
  round_id: string;
  revision: number;
  status: RoundStatus;
}

export interface LegacyImportResponse
  extends ScorecardSyncResponse {

  legacy_round_id: string;
  total: number;
  relative_to_par: number;
  verified: false;
}

export type ScorecardErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "INVALID_REQUEST"
  | "PAYLOAD_TOO_LARGE"
  | "UNSUPPORTED_VERSION"
  | "FEATURE_DISABLED"
  | "ROUND_NOT_FOUND"
  | "REVISION_CONFLICT"
  | "ROUND_LOCKED"
  | "DUPLICATE_OPERATION"
  | "ALREADY_IMPORTED"
  | "INCOMPLETE_ROUND"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export interface ScorecardErrorResponse {
  success: false;
  contract_version: 1;
  error: {
    code: ScorecardErrorCode;
    message: string;
  };
}
