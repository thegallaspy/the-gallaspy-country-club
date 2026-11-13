import type {
  StandardMembershipPlan
} from "./standard-plan-policy";

type ApprovedDocuments = Readonly<{
  agreement: string;
  clubRules: string;
  activityWaiver: string;
}>;

/**
 * Remains null until the documents receive legal approval,
 * immutable versions are recorded, and the signing workflow
 * is ready for controlled testing.
 */
const APPROVED_DOCUMENTS: ApprovedDocuments | null = null;

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

  // Fail closed: draft legal documents are not approved versions.
  const documents = APPROVED_DOCUMENTS as ApprovedDocuments | null;

  if (documents === null) {
    return "Membership legal documents are awaiting approval";
  }

  if (
    body.membershipAgreementVersion !== documents.agreement ||
    body.clubRulesVersion !== documents.clubRules ||
    body.activityWaiverVersion !== documents.activityWaiver
  ) {
    return "Membership document versions do not match";
  }

  return null;
}
