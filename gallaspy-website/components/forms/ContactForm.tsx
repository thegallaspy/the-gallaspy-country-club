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
      className="rounded-2xl border border-[#B89146]/25 bg-white p-6 shadow-xl sm:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3 text-[#10263F] outline-none transition focus:border-[#B89146]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3 text-[#10263F] outline-none transition focus:border-[#B89146]"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3 text-[#10263F] outline-none transition focus:border-[#B89146]"
          />
        </div>

        <div>
          <label
            htmlFor="interest"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
          >
            Area of Interest
          </label>

          <select
            id="interest"
            name="interest"
            required
            defaultValue=""
            className="w-full rounded-lg border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3 text-[#10263F] outline-none transition focus:border-[#B89146]"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Membership">Membership</option>
            <option value="Founding 250">Founding 250</option>
            <option value="Investment">Investment</option>
            <option value="Partnership">Strategic Partnership</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#10263F]"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-none rounded-lg border border-[#10263F]/20 bg-[#F7F4EC] px-4 py-3 text-[#10263F] outline-none transition focus:border-[#B89146]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#B89146] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {message && (
        <p
          className={`mt-5 text-center text-sm ${
            status === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}