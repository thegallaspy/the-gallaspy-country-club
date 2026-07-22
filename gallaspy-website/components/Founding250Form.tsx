"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FoundingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  membershipInterest: string;
  golfHandicap: string;
  referralSource: string;
  comments: string;
  consent: boolean;
}

const initialFormData: FoundingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  membershipInterest: "",
  golfHandicap: "",
  referralSource: "",
  comments: "",
  consent: false,
};

export default function Founding250Form() {
  const [formData, setFormData] =
    useState<FoundingFormData>(initialFormData);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof FoundingFormData,
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
      const response = await fetch("/api/founding-250", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Your registration could not be submitted.",
        );
      }

      setStatus("success");
      setMessage(
        "Thank you. Your Founding 250 registration has been received. A member of The Gallaspy Development Group will contact you with the next steps.",
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
          Registration Received
        </p>

        <h2 className="relative mt-4 font-serif text-4xl font-light text-white sm:text-5xl">
          Welcome to the Beginning
        </h2>

        <p className="relative mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70">
          {message}
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="relative mt-9 inline-flex min-h-[50px] items-center justify-center border border-[#FFD76A] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD76A] transition duration-300 hover:bg-[#FFD76A] hover:text-[#10263F]"
        >
          Submit Another Registration
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#10263F]/10 bg-white shadow-[0_30px_90px_rgba(16,38,63,0.1)]">
      <div className="bg-[#10263F] px-7 py-9 text-white sm:px-10 sm:py-11">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#FFD76A]">
          Founding 250 Registration
        </p>

        <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
          Express Your Interest
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          Complete the form below to be considered for one of the first 250
          founding membership opportunities at The Gallaspy Golf &amp; Country
          Club.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-7 py-9 sm:px-10 sm:py-11"
      >
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

        <div className="grid gap-6 md:grid-cols-2">
          <SelectField
            label="Membership Interest"
            required
            value={formData.membershipInterest}
            onChange={(value) =>
              updateField("membershipInterest", value)
            }
            options={[
              "Charter Founder",
              "Founding Member",
              "Legacy Member",
              "Standard Membership",
              "Corporate Membership",
              "Residential Membership",
              "Undecided — Request More Information",
            ]}
          />

          <FormField
            label="Golf Handicap"
            value={formData.golfHandicap}
            onChange={(value) => updateField("golfHandicap", value)}
            placeholder="Optional"
          />
        </div>

        <SelectField
          label="How Did You Hear About The Gallaspy?"
          value={formData.referralSource}
          onChange={(value) => updateField("referralSource", value)}
          options={[
            "Family or Friend",
            "Social Media",
            "The Gallaspy Website",
            "Golf Community",
            "Business or Investment Contact",
            "Local Community",
            "Search Engine",
            "Other",
          ]}
        />

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
            placeholder="Tell us what interests you most about becoming a founding member."
            className="w-full resize-none rounded-none border border-[#10263F]/15 bg-[#F8F5EE] px-4 py-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#B89146] focus:ring-1 focus:ring-[#B89146]"
          />
        </div>

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
            I authorize The Gallaspy Development Group to contact me regarding
            membership opportunities, project updates, events, and related
            information. I understand that this registration is an expression
            of interest and does not guarantee membership or create a financial
            obligation.
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

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[54px] w-full items-center justify-center bg-[#10263F] px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#B89146] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting"
            ? "Submitting Registration..."
            : "Join the Founding 250 Interest List"}

          {status !== "submitting" && (
            <span className="ml-3 text-[#FFD76A]">→</span>
          )}
        </button>

        <p className="text-xs leading-5 text-[#10263F]/45">
          Your information will be used only for communications related to The
          Gallaspy Golf &amp; Country Club and The Gallaspy Development Group.
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
        className="h-13 w-full rounded-none border border-[#10263F]/15 bg-[#F8F5EE] px-4 py-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/40 focus:border-[#B89146] focus:ring-1 focus:ring-[#B89146]"
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
        className="h-[54px] w-full rounded-none border border-[#10263F]/15 bg-[#F8F5EE] px-4 text-sm text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-1 focus:ring-[#B89146]"
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