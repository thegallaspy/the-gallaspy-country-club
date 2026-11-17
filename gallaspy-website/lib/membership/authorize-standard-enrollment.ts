import type { SupabaseClient } from "@supabase/supabase-js";

import {
  MEMBERSHIP_DOCUMENTS,
  MEMBERSHIP_DOCUMENTS_APPROVED,
} from "./membership-document-registry";

import {
  validateMembershipLegalAcceptance,
} from "./validate-legal-acceptance";

import {
  isStandardMembershipPlan,
} from "./standard-plan-policy";

import { matchesStandardBilling } from "./standard-billing-v2";

import { createHash } from "node:crypto";

export async function authorizeStandardEnrollment(
  admin: SupabaseClient,
  userId: string,
  fullName: string,
  body: Record<string, unknown>
) {
  if (!MEMBERSHIP_DOCUMENTS_APPROVED) {
    throw new Error("Membership documents awaiting approval");
  }

  if (!isStandardMembershipPlan(body.plan)) {
    throw new Error("Invalid membership plan");
  }

  const plan = body.plan;

  if (!matchesStandardBilling(plan, {
    initiationFeeCents: body.initiationFeeCents,
    initialPaymentCents: body.initialPaymentCents,
    renewalAmountCents: body.renewalAmountCents,
    renewalInterval: body.renewalInterval,
  })) {
    throw new Error("Membership pricing mismatch");
  }

  const legalError = validateMembershipLegalAcceptance(
    body, fullName, plan
  );

  if (legalError) throw new Error(legalError);

  const agreement = MEMBERSHIP_DOCUMENTS["membership-agreement.md"];
  const rules = MEMBERSHIP_DOCUMENTS["club-rules.md"];
  const waiver = MEMBERSHIP_DOCUMENTS["activity-waiver.md"];
  const billing = MEMBERSHIP_DOCUMENTS["billing-disclosure.md"];
  const electronic = MEMBERSHIP_DOCUMENTS["electronic-consent.md"];

  for (const doc of Object.values(MEMBERSHIP_DOCUMENTS)) {
    const actual = createHash("sha256")
      .update(doc.content, "utf8")
      .digest("hex");

    if (actual !== doc.sha256) {
      throw new Error("Membership document integrity failure");
    }
  }

  if (
    body.membershipAgreementVersion !== agreement.version ||
    body.clubRulesVersion !== rules.version ||
    body.activityWaiverVersion !== waiver.version ||
    body.billingDisclosureVersion !== billing.version ||
    body.electronicConsentVersion !== electronic.version ||
    body.consent !== true
  ) {
    throw new Error("Consent or agreement version mismatch");
  }

  const { data: attempts, error: reserveError } =
    await admin.rpc("gallaspy_reserve_standard_enrollment_v2", {
      p_user_id: userId,
      p_plan: plan,
    });

  if (
    reserveError ||
    !Array.isArray(attempts) ||
    attempts.length !== 1 ||
    attempts[0].enrollment_status !== "reserved"
  ) {
    throw new Error("Enrollment reservation unavailable");
  }

  const attemptId = attempts[0].attempt_id;

  const { data: legalId, error: legalRecordError } =
    await admin.rpc("gallaspy_record_membership_acceptance", {
      p_user_id: userId,
      p_enrollment_attempt_id: attemptId,
      p_membership_plan: plan,
      p_membership_agreement_version: agreement.version,
      p_membership_agreement_sha256: agreement.sha256,
      p_club_rules_version: rules.version,
      p_club_rules_sha256: rules.sha256,
      p_activity_waiver_version: waiver.version,
      p_activity_waiver_sha256: waiver.sha256,
      p_signed_full_name: body.signedFullName,
      p_electronic_signature_consent: true,
      p_legal_terms_accepted: true,
    });

  if (legalRecordError || typeof legalId !== "string") {
    throw new Error("Legal acceptance recording failed");
  }

  const { data: billingId, error: billingError } =
    await admin.rpc("gallaspy_record_membership_billing_consent", {
      p_user_id: userId,
      p_enrollment_attempt_id: attemptId,
      p_membership_plan: plan,
      p_billing_disclosure_version: billing.version,
      p_billing_consent_accepted: true,
    });

  if (billingError || typeof billingId !== "string") {
    throw new Error("Billing consent recording failed");
  }

  const { data: claimed, error: claimError } =
    await admin.rpc(
      "gallaspy_begin_standard_enrollment_processing_v2",
      {
        p_user_id: userId,
        p_attempt_id: attemptId,
      }
    );

  if (claimError || claimed !== true) {
    throw new Error("Enrollment already processing or unavailable");
  }

  return {
    attemptId,
    plan,
    legalId,
    billingId,
  };
}
