"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  department: string;
  employmentType: string;
  experience: string;
  availability: string;
  professionalLink: string;
  introduction: string;
  consent: boolean;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  department: "",
  employmentType: "",
  experience: "",
  availability: "",
  professionalLink: "",
  introduction: "",
  consent: false,
};

const inputClassName =
  "mt-2 min-h-[48px] w-full rounded-[12px] border border-[#1E3557]/15 bg-white px-4 text-sm text-[#10263F] outline-none transition placeholder:text-[#1E3557]/35 focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15";

const labelClassName =
  "text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E3557]";

export default function CareerApplicationForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    field: keyof FormState,
    value: string | boolean,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      setResume(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maximumSize = 4 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      event.target.value = "";
      setResume(null);
      setMessageType("error");
      setMessage("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (selectedFile.size > maximumSize) {
      event.target.value = "";
      setResume(null);
      setMessageType("error");
      setMessage("Your resume must be smaller than 4 MB.");
      return;
    }

    setResume(selectedFile);
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.consent) {
      setMessageType("error");
      setMessage("Please confirm the consent statement before submitting.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const submission = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submission.append(key, String(value));
      });

      if (resume) {
        submission.append("resume", resume);
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: submission,
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.error || "Your information could not be submitted.",
        );
      }

      setMessageType("success");
      setMessage(
        result.message ||
          "Thank you. Your professional information has been submitted.",
      );
      setFormData(initialFormState);
      setResume(null);

      const resumeInput = document.getElementById(
        "resume",
      ) as HTMLInputElement | null;

      if (resumeInput) {
        resumeInput.value = "";
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Your information could not be submitted. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[22px] border border-[#1E3557]/10 bg-white p-5 shadow-[0_18px_50px_rgba(16,38,63,0.08)] sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className={inputClassName}
            placeholder="First name"
          />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className={inputClassName}
            placeholder="Last name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClassName}
            placeholder="name@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClassName}
            placeholder="(404) 555-0000"
          />
        </div>

        <div>
          <label htmlFor="city" className={labelClassName}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            value={formData.city}
            onChange={(event) => updateField("city", event.target.value)}
            className={inputClassName}
            placeholder="City"
          />
        </div>

        <div>
          <label htmlFor="state" className={labelClassName}>
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            required
            maxLength={30}
            value={formData.state}
            onChange={(event) => updateField("state", event.target.value)}
            className={inputClassName}
            placeholder="Georgia"
          />
        </div>

        <div>
          <label htmlFor="department" className={labelClassName}>
            Area of Interest
          </label>
          <select
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={(event) => updateField("department", event.target.value)}
            className={inputClassName}
          >
            <option value="">Select an area</option>
            <option value="Golf Operations">Golf Operations</option>
            <option value="Hospitality and Dining">
              Hospitality &amp; Dining
            </option>
            <option value="Wellness and Spa">Wellness &amp; Spa</option>
            <option value="Racquet Sports">Racquet Sports</option>
            <option value="Events and Weddings">Events &amp; Weddings</option>
            <option value="Lodging and Housekeeping">
              Lodging &amp; Housekeeping
            </option>
            <option value="Grounds and Maintenance">
              Grounds &amp; Maintenance
            </option>
            <option value="Security">Security</option>
            <option value="Membership and Member Services">
              Membership &amp; Member Services
            </option>
            <option value="Administration">Administration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="employmentType" className={labelClassName}>
            Employment Preference
          </label>
          <select
            id="employmentType"
            name="employmentType"
            required
            value={formData.employmentType}
            onChange={(event) =>
              updateField("employmentType", event.target.value)
            }
            className={inputClassName}
          >
            <option value="">Select a preference</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Open to Multiple Options">
              Open to Multiple Options
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="experience" className={labelClassName}>
            Years of Experience
          </label>
          <select
            id="experience"
            name="experience"
            required
            value={formData.experience}
            onChange={(event) => updateField("experience", event.target.value)}
            className={inputClassName}
          >
            <option value="">Select experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-3 years">1–3 years</option>
            <option value="4-7 years">4–7 years</option>
            <option value="8-12 years">8–12 years</option>
            <option value="13+ years">13+ years</option>
          </select>
        </div>

        <div>
          <label htmlFor="availability" className={labelClassName}>
            Earliest Availability
          </label>
          <input
            id="availability"
            name="availability"
            type="text"
            required
            value={formData.availability}
            onChange={(event) =>
              updateField("availability", event.target.value)
            }
            className={inputClassName}
            placeholder="Example: Immediately or June 2027"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="professionalLink" className={labelClassName}>
            LinkedIn or Portfolio
          </label>
          <input
            id="professionalLink"
            name="professionalLink"
            type="url"
            value={formData.professionalLink}
            onChange={(event) =>
              updateField("professionalLink", event.target.value)
            }
            className={inputClassName}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="resume" className={labelClassName}>
            Resume
          </label>

          <div className="mt-2 rounded-[14px] border border-dashed border-[#B89146]/55 bg-[#F7F4EE] p-5">
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="block w-full text-sm text-[#1E3557] file:mr-4 file:rounded-full file:border-0 file:bg-[#10263F] file:px-5 file:py-2.5 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.15em] file:text-white hover:file:bg-[#B89146]"
            />

            <p className="mt-3 text-xs leading-5 text-[#1E3557]/60">
              PDF, DOC, or DOCX. Maximum file size: 4 MB.
            </p>

            {resume && (
              <p className="mt-2 text-xs font-semibold text-[#163A2F]">
                Selected: {resume.name}
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="introduction" className={labelClassName}>
            Professional Introduction
          </label>
          <textarea
            id="introduction"
            name="introduction"
            required
            rows={7}
            maxLength={1500}
            value={formData.introduction}
            onChange={(event) =>
              updateField("introduction", event.target.value)
            }
            className={`${inputClassName} resize-y py-4`}
            placeholder="Tell us about your experience, interests, and what you could bring to The Gallaspy."
          />

          <p className="mt-2 text-right text-xs text-[#1E3557]/45">
            {formData.introduction.length}/1500
          </p>
        </div>
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-[14px] border border-[#1E3557]/10 bg-[#F7F4EE] p-4">
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#B89146]"
        />

        <span className="text-xs leading-6 text-[#1E3557]/75">
          I understand that this submission is an expression of future career
          interest and does not represent an application for a currently open
          position, an interview guarantee, or an offer of employment.
        </span>
      </label>

      {message && (
        <div
          role="status"
          className={`mt-6 rounded-[12px] border px-4 py-3 text-sm ${
            messageType === "success"
              ? "border-[#163A2F]/20 bg-[#163A2F]/8 text-[#163A2F]"
              : "border-red-800/20 bg-red-50 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Career Interest"}
      </button>
    </form>
  );
}