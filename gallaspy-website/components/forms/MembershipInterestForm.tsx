"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  membershipType: "",
  message: "",
};

export default function MembershipInterestForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");

  const updateField = (
    field: keyof typeof initialForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/membership-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to submit membership interest.");
      }

      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[22px] border border-[#1E3557]/12 bg-white p-6 shadow-[0_20px_60px_rgba(16,38,63,0.08)] sm:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your full name"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Your phone number"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            City &amp; State
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Atlanta, Georgia"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="membershipType"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Membership Interest
          </label>

          <select
            id="membershipType"
            name="membershipType"
            required
            value={form.membershipType}
            onChange={(event) =>
              updateField("membershipType", event.target.value)
            }
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="">Select a membership category</option>
            <option value="Founding Membership">
              Founding Membership
            </option>
            <option value="Full Golf Membership">
              Full Golf Membership
            </option>
            <option value="Legacy Family Membership">
              Legacy Family Membership
            </option>
            <option value="Corporate Membership">
              Corporate Membership
            </option>
            <option value="General Membership Information">
              General Membership Information
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Additional Information
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell us what interests you most about The Gallaspy."
            className="mt-2 w-full resize-none rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#1E3557] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting"
            ? "Submitting..."
            : "Submit Membership Interest"}
        </button>

        <p className="max-w-sm text-xs leading-5 text-[#1E3557]/65">
          Submission indicates interest only and does not constitute an offer
          or guarantee of membership.
        </p>
      </div>

      {status === "success" && (
        <div className="mt-6 rounded-[12px] border border-[#B89146]/30 bg-[#F7F4EE] px-4 py-3 text-sm text-[#1E3557]">
          Thank you. Your membership interest has been received.
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          We could not submit the form. Please try again.
        </div>
      )}
    </form>
  );
}