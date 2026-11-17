import type {
  StandardMembershipPlan
} from "./standard-plan-policy";

import {
  MEMBERSHIP_DOCUMENTS,
  MEMBERSHIP_DOCUMENTS_APPROVED,
} from "./membership-document-registry";

export function validateMembershipLegalAcceptance(
  body: Record<string, unknown>,
  fullName: string,
  plan: StandardMembershipPlan
): string | null {
  if (
    body.electronicSignatureConsent !== true ||
    body.legalTermsAccepted !== true ||
    body.activityRiskAcknowledged !== true
  ) {
    return "Separate legal and electronic-signature consent required";
  }

  const normalize = (value: string) =>
    value.trim().replace(/\s+/g, " ").toLowerCase();

  if (
    typeof body.signedFullName !== "string" ||
    normalize(body.signedFullName) !== normalize(fullName) ||
    normalize(fullName).split(" ").length < 2
  ) {
    return "The electronic signature must match the member name";
  }

  if (body.signedMembershipPlan !== plan) {
    return "Signed membership plan does not match enrollment";
  }

  if (!MEMBERSHIP_DOCUMENTS_APPROVED) {
    return "Membership legal documents are awaiting approval";
  }

  if (
    body.membershipAgreementVersion !==
      MEMBERSHIP_DOCUMENTS["membership-agreement.md"].version ||
    body.clubRulesVersion !==
      MEMBERSHIP_DOCUMENTS["club-rules.md"].version ||
    body.activityWaiverVersion !==
      MEMBERSHIP_DOCUMENTS["activity-waiver.md"].version ||
    body.billingDisclosureVersion !==
      MEMBERSHIP_DOCUMENTS["billing-disclosure.md"].version ||
    body.electronicConsentVersion !==
      MEMBERSHIP_DOCUMENTS["electronic-consent.md"].version ||
    body.consent !== true
  ) {
    return "Membership document versions or billing consent do not match";
  }

  return null;
}
