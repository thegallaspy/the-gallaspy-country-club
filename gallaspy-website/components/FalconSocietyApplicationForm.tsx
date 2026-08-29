"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FalconSocietyApplicationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  membershipInterest: string;
  golfInterest: string;
  householdInterest: string;
  referralSource: string;
  comments: string;
  consent: boolean;
};

const initialFormData: FalconSocietyApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  membershipInterest: "",
  golfInterest: "",
  householdInterest: "",
  referralSource: "",
  comments: "",
  consent: false,
};

export default function FalconSocietyApplicationForm() {
  const [formData, setFormData] =
    useState<FalconSocietyApplicationData>(initialFormData);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof FalconSocietyApplicationData,
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
          result.message || "Your application could not be submitted.",
        );
      }

      setStatus("success");
      setMessage(
        result.message ||
          "Your Falcon Society application has been received for consideration.",
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
      <div className="border border-[#8C1D2C]/20 bg-white px-7 py-12 text-center shadow-sm sm:px-12 sm:py-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#8C1D2C]/25 text-xl text-[#8C1D2C]">
          ✓
        </div>

        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.34em] text-[#8C1D2C]">
          Application Received
        </p>

        <h2 className="mt-4 font-serif text-4xl font-light text-[#10263F] sm:text-5xl">
          Your Place in the Story Starts Here
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#33475B]">
          {message}
        </p>

        <div className="mx-auto mt-7 max-w-2xl border-t border-[#10263F]/10 pt-6">
          <p className="text-xs leading-6 text-[#33475B]/65">
            Submission does not guarantee selection into the Falcon Society or
            reserve one of the Founding 100 positions. Applications are reviewed
            before any founding designation is confirmed.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="mt-9 inline-flex min-h-[48px] items-center justify-center border border-[#10263F] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:bg-[#10263F] hover:text-white"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[#10263F]/10 bg-white shadow-sm">
      <div className="bg-[#8C1D2C] px-7 py-9 text-white sm:px-10 sm:py-11">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/70">
          The Falcon Society
        </p>

        <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
          Apply for the Founding 100
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
          The Falcon Society is the founding community of The Gallaspy — the
          first 100 individuals and families selected to become part of the
          club&apos;s earliest chapter.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-9 px-7 py-9 sm:px-10 sm:py-11"
      >
        <div>
          <SectionLabel>Contact Information</SectionLabel>

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
              required
              type="tel"
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              autoComplete="tel"
            />

            <FormField
              label="City"
              required
              value={formData.city}
              onChange={(value) => updateField("city", value)}
              autoComplete="address-level2"
            />

            <FormField
              label="State"
              required
              value={formData.state}
              onChange={(value) => updateField("state", value)}
              autoComplete="address-level1"
              placeholder="Georgia"
            />
          </div>
        </div>

        <div className="border-t border-[#10263F]/10 pt-8">
          <SectionLabel>Your Interest in The Gallaspy</SectionLabel>

          <div className="grid gap-6 md:grid-cols-2">
            <SelectField
              label="Founding Community Interest"
              required
              value={formData.membershipInterest}
              onChange={(value) =>
                updateField("membershipInterest", value)
              }
              options={[
                "Individual",
                "Couple / Partner",
                "Family / Household",
                "Business / Community Leader",
                "Still Exploring",
              ]}
            />

            <SelectField
              label="Golf Interest"
              value={formData.golfInterest}
              onChange={(value) => updateField("golfInterest", value)}
              options={[
                "Avid Golfer",
                "Recreational Golfer",
                "Beginner / Learning",
                "Family Golf Interest",
                "Competition",
                "Primarily Social / Community",
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
                "Gallaspy Round",
                "Golf Community",
                "Business or Professional Contact",
                "Local Community",
                "Search Engine",
                "Other",
              ]}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="comments"
            className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#10263F]"
          >
            Why Does The Gallaspy Interest You?
          </label>

          <textarea
            id="comments"
            name="comments"
            rows={5}
            value={formData.comments}
            onChange={(event) =>
              updateField("comments", event.target.value)
            }
            placeholder="Tell us what draws you to the Falcon Society, golf community, competition, gatherings, or the long-term vision of The Gallaspy."
            className="w-full resize-none border border-[#10263F]/15 bg-[#F7F4EE] px-4 py-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#8C1D2C] focus:bg-white"
          />
        </div>

        <div className="border border-[#8C1D2C]/20 bg-[#FAF4F3] px-5 py-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#8C1D2C]">
            Founding 100 Application
          </p>

          <p className="mt-3 text-xs leading-6 text-[#10263F]/65">
            Applying does not automatically make an applicant a member of the
            Falcon Society. Submission does not guarantee selection, reserve a
            Founding 100 position, create a financial obligation, or represent a
            formal offer of future club membership.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-4 border-t border-[#10263F]/10 pt-7">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(event) =>
              updateField("consent", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 accent-[#8C1D2C]"
          />

          <span className="text-sm leading-6 text-[#10263F]/65">
            I authorize The Gallaspy Development Group, LLC to contact me
            regarding my Falcon Society application, Gallaspy Rounds,
            competitions, gatherings, announcements, and related club
            communications.
          </span>
        </label>

        {status === "error" && (
          <div
            role="alert"
            className="border border-red-300 bg-red-50 px-5 py-4 text-sm leading-6 text-red-800"
          >
            {message}
          </div>
        )}

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[52px] w-full items-center justify-center bg-[#8C1D2C] px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting"
              ? "Submitting Application..."
              : "Apply for Consideration"}
          </button>

          <p className="max-w-sm text-xs leading-5 text-[#10263F]/45">
            No payment or deposit is required to apply.
          </p>
        </div>
      </form>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#8C1D2C]">
      {children}
    </p>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
};

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
        {required && <span className="ml-1 text-[#8C1D2C]">*</span>}
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
        className="h-[52px] w-full border border-[#10263F]/15 bg-[#F7F4EE] px-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#8C1D2C] focus:bg-white"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
};

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
        {required && <span className="ml-1 text-[#8C1D2C]">*</span>}
      </label>

      <select
        id={fieldId}
        name={fieldId}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] w-full border border-[#10263F]/15 bg-[#F7F4EE] px-4 text-sm text-[#10263F] outline-none transition focus:border-[#8C1D2C] focus:bg-white"
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
