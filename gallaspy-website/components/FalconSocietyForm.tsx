"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FalconSocietyFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  golfInterest: string;
  householdInterest: string;
  referralSource: string;
  comments: string;
  consent: boolean;
}

const initialFormData: FalconSocietyFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  golfInterest: "",
  householdInterest: "",
  referralSource: "",
  comments: "",
  consent: false,
};

export default function FalconSocietyForm() {
  const [formData, setFormData] =
    useState<FalconSocietyFormData>(initialFormData);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof FalconSocietyFormData,
    value: string | boolean,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/falcon-society", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Your interest could not be submitted.",
        );
      }

      setStatus("success");
      setMessage(
        "Thank you for your interest in the future Falcon Society. Your information has been received, and we'll keep you informed as The Gallaspy continues to develop.",
      );

      setFormData(initialFormData);
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-[28px] border border-[#B89146]/30 bg-[#10263F] px-7 py-12 text-center shadow-[0_30px_90px_rgba(16,38,63,0.16)] sm:px-12 sm:py-16">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B89146]/10 blur-3xl" />

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FFD76A]/45 bg-white/[0.06] text-2xl text-[#FFD76A]">
          ✓
        </div>

        <p className="relative mt-7 text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
          Interest Received
        </p>

        <h2 className="relative mt-4 font-serif text-4xl font-light text-white sm:text-5xl">
          Welcome to the Journey
        </h2>

        <p className="relative mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70">
          {message}
        </p>

        <div className="relative mx-auto mt-7 max-w-2xl border-t border-white/10 pt-6">
          <p className="text-xs leading-6 text-white/50">
            Your submission expresses interest only. It does not reserve,
            guarantee, or constitute an application for a future Falcon Society
            position or club membership.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="relative mt-9 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD76A] transition duration-300 hover:bg-[#FFD76A] hover:text-[#10263F]"
        >
          Submit Another Interest
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#10263F]/10 bg-white shadow-[0_30px_90px_rgba(16,38,63,0.1)]">
      {/* FORM HEADER */}
      <div className="bg-[#10263F] px-7 py-9 text-white sm:px-10 sm:py-11">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
          Falcon Society Interest
        </p>

        <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
          Express Your Interest
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          Stay connected to the future Falcon Society and the founding journey
          of The Gallaspy Golf &amp; Country Club.
        </p>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="max-w-2xl text-xs leading-6 text-white/50">
            Formal Falcon Society memberships are not currently being offered.
            This form is for expressions of interest and future communication
            only.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-7 py-9 sm:px-10 sm:py-11"
      >
        {/* CONTACT INFORMATION */}
        <div>
          <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Contact Information
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="First Name"
              required
              value={formData.firstName}
              onChange={(value) => updateField("firstName", value)}
              autoComplete="given-name"
            />

            <FormField
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(value) => updateField("lastName", value)}
              autoComplete="family-name"
            />

            <FormField
              label="Email Address"
              required
              type="email"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
            />

            <FormField
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              autoComplete="tel"
            />

            <FormField
              label="City"
              value={formData.city}
              onChange={(value) => updateField("city", value)}
              autoComplete="address-level2"
            />

            <FormField
              label="State"
              value={formData.state}
              onChange={(value) => updateField("state", value)}
              autoComplete="address-level1"
              placeholder="Georgia"
            />
          </div>
        </div>

        {/* INTEREST */}
        <div className="border-t border-[#10263F]/10 pt-8">
          <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#B89146]">
            Tell Us About Your Interest
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <SelectField
              label="Golf Interest"
              value={formData.golfInterest}
              onChange={(value) =>
                updateField("golfInterest", value)
              }
              options={[
                "Avid Golfer",
                "Recreational Golfer",
                "Beginner / Learning",
                "Family Golf Interest",
                "Primarily Social / Lifestyle",
                "Not Sure Yet",
              ]}
            />

            <SelectField
              label="Household Interest"
              value={formData.householdInterest}
              onChange={(value) =>
                updateField("householdInterest", value)
              }
              options={[
                "Individual",
                "Couple / Partner",
                "Family / Household",
                "Multigenerational Family",
                "Not Sure Yet",
              ]}
            />
          </div>
        </div>

        {/* REFERRAL */}
        <SelectField
          label="How Did You Hear About The Gallaspy?"
          value={formData.referralSource}
          onChange={(value) =>
            updateField("referralSource", value)
          }
          options={[
            "Family or Friend",
            "Social Media",
            "The Gallaspy Website",
            "The Gallaspy Invitational",
            "Golf Community",
            "Business or Professional Contact",
            "Local Community",
            "Search Engine",
            "Other",
          ]}
        />

        {/* COMMENTS */}
        <div>
          <label
            htmlFor="comments"
            className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F]"
          >
            Comments or Questions
          </label>

          <textarea
            id="comments"
            name="comments"
            rows={5}
            value={formData.comments}
            onChange={(event) =>
              updateField("comments", event.target.value)
            }
            placeholder="Tell us what interests you most about the future Falcon Society and The Gallaspy."
            className="w-full resize-none rounded-[12px] border border-[#10263F]/15 bg-[#F8F5EE] px-4 py-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#B89146] focus:bg-white focus:ring-1 focus:ring-[#B89146]"
          />
        </div>

        {/* DISCLOSURE */}
        <div className="rounded-[16px] border border-[#B89146]/20 bg-[#F8F5EE] px-5 py-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#B89146]">
            Expression of Interest Only
          </p>

          <p className="mt-3 text-xs leading-6 text-[#10263F]/62">
            The Falcon Society is a future founding-member concept. Submitting
            this form does not constitute a membership application, offer,
            acceptance, reservation, deposit, or financial commitment and does
            not reserve or guarantee one of the future 100 positions.
          </p>
        </div>

        {/* CONSENT */}
        <label className="flex cursor-pointer items-start gap-4 border-t border-[#10263F]/10 pt-7">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(event) =>
              updateField("consent", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 accent-[#10263F]"
          />

          <span className="text-sm leading-6 text-[#10263F]/65">
            I authorize The Gallaspy Development Group, LLC to contact me
            regarding the Falcon Society, future membership information,
            project updates, events, and related Gallaspy communications. I
            understand that this submission is an expression of interest only
            and does not guarantee future membership or create a financial
            obligation.
          </span>
        </label>

        {/* ERROR */}
        {status === "error" && (
          <div
            role="alert"
            className="rounded-[12px] border border-red-300 bg-red-50 px-5 py-4 text-sm leading-6 text-red-800"
          >
            {message}
          </div>
        )}

        {/* SUBMIT */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#10263F] px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#B89146] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting"
              ? "Submitting Interest..."
              : "Express Falcon Society Interest"}

            {status !== "submitting" && (
              <span className="ml-3 text-[#FFD76A]">→</span>
            )}
          </button>

          <p className="max-w-sm text-xs leading-5 text-[#10263F]/45">
            No membership payment or deposit is required.
          </p>
        </div>

        <p className="text-xs leading-5 text-[#10263F]/45">
          Your information will be used for communications related to The
          Gallaspy Golf &amp; Country Club, the future Falcon Society, and The
          Gallaspy Development Group, LLC.
        </p>
      </form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
}

function FormField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
}: FormFieldProps) {
  const fieldId = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F]"
      >
        {label}
        {required && <span className="ml-1 text-[#B89146]">*</span>}
      </label>

      <input
        id={fieldId}
        name={fieldId}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-[54px] w-full rounded-[12px] border border-[#10263F]/15 bg-[#F8F5EE] px-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#B89146] focus:bg-white focus:ring-1 focus:ring-[#B89146]"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) {
  const fieldId = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F]"
      >
        {label}
        {required && <span className="ml-1 text-[#B89146]">*</span>}
      </label>

      <select
        id={fieldId}
        name={fieldId}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[54px] w-full rounded-[12px] border border-[#10263F]/15 bg-[#F8F5EE] px-4 text-sm text-[#10263F] outline-none transition focus:border-[#B89146] focus:bg-white focus:ring-1 focus:ring-[#B89146]"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}