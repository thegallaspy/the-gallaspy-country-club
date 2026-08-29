"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interest: formData.get("interest"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit the form.");
      }

      form.reset();
      setStatus("success");
      setMessage(
        "Thank you. Your message has been received, and our team will be in touch."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-[#B89146]/25 bg-white p-6 shadow-[0_20px_60px_rgba(16,38,63,0.08)] sm:p-8 lg:p-10"
    >
      <div className="mb-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
          Contact Form
        </p>

        <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-[#10263F]">
          Tell Us How We Can Help
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#56616B]">
          Select the area that best matches your inquiry so your message reaches
          the right conversation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Full Name *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            className="w-full rounded-[12px] border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3.5 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/35 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-[12px] border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3.5 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/35 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            className="w-full rounded-[12px] border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3.5 text-sm text-[#10263F] outline-none transition placeholder:text-[#10263F]/35 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="interest"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Area of Interest *
          </label>

          <select
            id="interest"
            name="interest"
            required
            defaultValue=""
            className="w-full rounded-[12px] border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3.5 text-sm text-[#10263F] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="" disabled>
              Select an option
            </option>

            <option value="Golf & Club Events">
              Golf & Club Events
            </option>

            <option value="Founding Community">
              Founding Community
            </option>

            <option value="The Gallaspy Invitational">
              The Gallaspy Invitational
            </option>

            <option value="Invitational Sponsorship">
              Invitational Sponsorship
            </option>

            <option value="Partnerships & Property">
              Partnerships & Property
            </option>

            <option value="Media & Press">
              Media & Press
            </option>

            <option value="Apparel">
              Apparel
            </option>

            <option value="General Inquiry">
              General Inquiry
            </option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10263F]"
        >
          Message *
        </label>

        <textarea
          id="message"
          name="message"
          rows={7}
          required
          placeholder="Tell us more about your inquiry."
          className="w-full resize-none rounded-[12px] border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-4 text-sm leading-7 text-[#10263F] outline-none transition placeholder:text-[#10263F]/35 focus:border-[#B89146] focus:bg-white"
        />
      </div>

      <div className="mt-7 rounded-[14px] border border-[#B89146]/20 bg-[#F7F4EC] px-5 py-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
          Communication Notice
        </p>

        <p className="mt-2 text-xs leading-5 text-[#56616B]">
          Information submitted through this form will be used to respond to
          your inquiry and for related communication from The Gallaspy
          Development Group, LLC.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#B89146] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-9"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>

      {message && (
        <div
          role={status === "error" ? "alert" : "status"}
          className={`mt-6 rounded-[12px] border px-5 py-4 text-sm leading-6 ${
            status === "success"
              ? "border-[#B89146]/30 bg-[#F7F4EC] text-[#10263F]"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
