"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const submission = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      organization: formData.get("organization"),
      city: formData.get("city"),
      state: formData.get("state"),
      interest: formData.get("interest"),
      preferredContact: formData.get("preferredContact"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your inquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-[#B89146]/30 bg-white p-8 text-center shadow-[0_22px_70px_rgba(16,38,63,0.12)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10263F] text-2xl text-[#FFD76A]">
          ✓
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-[#B89146]">
          Inquiry Received
        </p>

        <h3 className="mt-4 font-serif text-4xl font-light text-[#10263F]">
          Thank You for Reaching Out
        </h3>

        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#56616B]">
          Your message has been received by The Gallaspy Development Group. A
          member of our team will review your inquiry and respond as soon as
          possible.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#10263F]"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#10263F]/10 bg-white p-6 shadow-[0_22px_70px_rgba(16,38,63,0.12)] sm:p-9 lg:p-11"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            First Name *
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Last Name *
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Company or Organization
          </label>

          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="interest"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Area of Interest *
          </label>

          <select
            id="interest"
            name="interest"
            required
            defaultValue=""
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Founding 250">Founding 250</option>
            <option value="Membership">Membership</option>
            <option value="Investment">Investment</option>
            <option value="Banking or Lending">Banking or Lending</option>
            <option value="Strategic Partnership">
              Strategic Partnership
            </option>
            <option value="Real Estate or Land">Real Estate or Land</option>
            <option value="Vendor or Contractor">Vendor or Contractor</option>
            <option value="Media or Press">Media or Press</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="city"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            State
          </label>

          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            placeholder="Georgia"
            className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="preferredContact"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
        >
          Preferred Contact Method
        </label>

        <select
          id="preferredContact"
          name="preferredContact"
          defaultValue="Email"
          className="mt-3 w-full rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
        >
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="Either">Email or Phone</option>
        </select>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
        >
          How Can We Help? *
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="Tell us about your interest in The Gallaspy Golf & Country Club."
          className="mt-3 w-full resize-none rounded-xl border border-[#10263F]/15 bg-[#F8F6F1] px-4 py-4 text-[#10263F] outline-none transition focus:border-[#B89146] focus:ring-2 focus:ring-[#B89146]/15"
        />
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending Inquiry..." : "Submit Inquiry"}
      </button>

      <p className="mt-5 text-center text-xs leading-6 text-[#6D767D]">
        By submitting this form, you agree to be contacted by The Gallaspy
        Development Group regarding your inquiry.
      </p>
    </form>
  );
}