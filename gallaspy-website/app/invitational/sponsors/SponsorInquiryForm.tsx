"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-white/30 bg-[#1A344A] px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8BD72]";

function Field({
  label,
  name,
  required = true,
  type = "text",
  maxLength = 160,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {required && <span className="ml-1 text-[#D8BD72]">*</span>}
      <input
        className={inputClass}
        name={name}
        type={type}
        maxLength={maxLength}
        required={required}
      />
    </label>
  );
}

export default function SponsorInquiryForm({
  enabled,
}: {
  enabled: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState("");
  const [error, setError] = useState("");
  const submissionKey = useRef<string | null>(null);
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enabled || inFlight.current || successReference) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const value = (key: string) =>
      String(data.get(key) ?? "").trim();

    if (!submissionKey.current) {
      if (!globalThis.crypto?.randomUUID) {
        setError("Secure submission is unavailable on this device.");
        return;
      }
      submissionKey.current = globalThis.crypto.randomUUID();
    }

    const payload = {
      submissionKey: submissionKey.current,
      companyName: value("companyName"),
      contactName: value("contactName"),
      email: value("email"),
      phone: value("phone"),
      website: value("website"),
      industry: value("industry"),
      sponsorshipInterest: value("sponsorshipInterest"),
      estimatedBudget: value("estimatedBudget"),
      partnershipType: value("partnershipType"),
      proposedActivation: value("proposedActivation"),
      message: value("message"),
      preferredContactMethod: value("preferredContactMethod"),
      contactConsent: data.get("contactConsent") === "on",
      companyFaxNumber: value("companyFaxNumber"),
    };

    inFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/invitational/sponsors", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json();

      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("success" in result) ||
        result.success !== true ||
        !("applicationReference" in result) ||
        typeof result.applicationReference !== "string"
      ) {
        throw new Error("Submission could not be confirmed.");
      }

      setSuccessReference(result.applicationReference);
      form.reset();
    } catch {
      setError(
        "We could not confirm your application. Please contact info@thegallaspy.com before submitting again to avoid duplicate inquiries."
      );
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  if (successReference) {
    return (
      <div
        className="mt-10 rounded-2xl border border-[#80A994] bg-[#193F32] p-8"
        role="status"
      >
        <h3 className="text-2xl font-bold">Inquiry Received</h3>
        <p className="mt-4 text-sm leading-7">
          Thank you for your interest in partnering with THE GALLASPY.
          Our team will review your inquiry and contact you regarding
          available sponsorship opportunities.
        </p>
        <p className="mt-5 text-sm font-bold">
          Application reference: {successReference}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-10 grid gap-5 rounded-2xl border border-white/20 bg-white/[0.05] p-6 sm:grid-cols-2 sm:p-9"
    >
      <Field label="Company / Organization" name="companyName" />
      <Field label="Contact Person" name="contactName" />
      <Field label="Business Email" name="email" type="email" maxLength={254} />
      <Field label="Phone Number" name="phone" type="tel" maxLength={32} />
      <Field label="Business Website" name="website" type="url" required={false} maxLength={300} />
      <Field label="Industry / Category" name="industry" maxLength={100} />

      <label className="block text-sm font-semibold">
        Sponsorship Opportunity <span className="text-[#D8BD72]">*</span>
        <select name="sponsorshipInterest" required defaultValue="" className={inputClass}>
          <option value="" disabled className="text-[#10263F]">Select an opportunity</option>
          <option value="presenting" className="text-[#10263F]">Presenting Partner</option>
          <option value="championship" className="text-[#10263F]">Championship Partner</option>
          <option value="official_event" className="text-[#10263F]">Official Event Partner</option>
          <option value="hole" className="text-[#10263F]">Hole Sponsor</option>
          <option value="junior_falcon" className="text-[#10263F]">Junior Falcon Experience Partner</option>
          <option value="marketplace_vendor" className="text-[#10263F]">Marketplace Vendor</option>
          <option value="custom" className="text-[#10263F]">Custom Partnership</option>
        </select>
      </label>

      <label className="block text-sm font-semibold">
        Estimated Budget <span className="text-[#D8BD72]">*</span>
        <select name="estimatedBudget" required defaultValue="" className={inputClass}>
          <option value="" disabled className="text-[#10263F]">Select a budget range</option>
          <option value="Under $500" className="text-[#10263F]">Under $500</option>
          <option value="$500–$1,499" className="text-[#10263F]">$500–$1,499</option>
          <option value="$1,500–$4,999" className="text-[#10263F]">$1,500–$4,999</option>
          <option value="$5,000–$9,999" className="text-[#10263F]">$5,000–$9,999</option>
          <option value="$10,000+" className="text-[#10263F]">$10,000+</option>
          <option value="To discuss" className="text-[#10263F]">To discuss</option>
        </select>
      </label>

      <label className="block text-sm font-semibold sm:col-span-2">
        Partnership Type <span className="text-[#D8BD72]">*</span>
        <select name="partnershipType" required defaultValue="" className={inputClass}>
          <option value="" disabled className="text-[#10263F]">Select partnership type</option>
          <option value="Financial sponsorship" className="text-[#10263F]">Financial sponsorship</option>
          <option value="Product or service partnership" className="text-[#10263F]">Product or service partnership</option>
          <option value="Vendor participation" className="text-[#10263F]">Vendor participation</option>
          <option value="Media or promotional partnership" className="text-[#10263F]">Media or promotional partnership</option>
          <option value="Custom collaboration" className="text-[#10263F]">Custom collaboration</option>
        </select>
      </label>

      <label className="block text-sm font-semibold sm:col-span-2">
        Proposed Activation or Involvement
        <textarea
          name="proposedActivation"
          rows={3}
          maxLength={1500}
          className={inputClass}
          placeholder="Describe how your organization would like to participate."
        />
      </label>

      <label className="block text-sm font-semibold sm:col-span-2">
        Additional Information
        <textarea
          name="message"
          rows={3}
          maxLength={3000}
          className={inputClass}
          placeholder="Tell us anything else our partnership team should know."
        />
      </label>

      <label className="block text-sm font-semibold sm:col-span-2">
        Preferred Contact Method <span className="text-[#D8BD72]">*</span>
        <select name="preferredContactMethod" required defaultValue="email" className={inputClass}>
          <option value="email" className="text-[#10263F]">Email</option>
          <option value="phone" className="text-[#10263F]">Phone</option>
        </select>
      </label>

      <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Leave this empty
          <input name="companyFaxNumber" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2">
        <input
          name="contactConsent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          I authorize The Gallaspy team to contact me about this
          sponsorship inquiry using the information provided.
          I understand this application does not create a contract
          or payment obligation.
        </span>
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={!enabled || submitting}
          className="min-h-13 w-full rounded-xl bg-[#D8BD72] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#10263F] hover:bg-white disabled:cursor-not-allowed disabled:opacity-65"
        >
          {!enabled
            ? "APPLICATIONS OPENING SOON"
            : submitting
              ? "SUBMITTING..."
              : "BECOME A SPONSOR"}
        </button>

        <p role="status" aria-live="polite" className="mt-4 text-sm leading-6 text-white/75">
          {error ||
            (!enabled
              ? "Our secure sponsorship application system is being prepared. No applications can be submitted yet."
              : "Submission does not guarantee approval, benefits, or availability.")}
        </p>
      </div>
    </form>
  );
}
