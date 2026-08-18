"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  golfInterest: "",
  householdInterest: "",
  primaryInterest: "",
  preferredCommunication: "",
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
      <div className="mb-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
          Membership Interest Form
        </p>

        <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-[#10263F]">
          Tell Us About Your Interest
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#1E3557]/70">
          This form allows you to stay connected with the future of The
          Gallaspy. Formal membership applications, categories, pricing, and
          availability will be announced at a later stage.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* FIRST NAME */}
        <div>
          <label
            htmlFor="firstName"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            First Name *
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={(event) =>
              updateField("firstName", event.target.value)
            }
            placeholder="First name"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* LAST NAME */}
        <div>
          <label
            htmlFor="lastName"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Last Name *
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={(event) =>
              updateField("lastName", event.target.value)
            }
            placeholder="Last name"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* PHONE */}
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
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Your phone number"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* CITY */}
        <div>
          <label
            htmlFor="city"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Atlanta"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* STATE */}
        <div>
          <label
            htmlFor="state"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            State
          </label>

          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            value={form.state}
            onChange={(event) => updateField("state", event.target.value)}
            placeholder="Georgia"
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>

        {/* PRIMARY INTEREST */}
        <div className="sm:col-span-2">
          <label
            htmlFor="primaryInterest"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            What Interests You Most? *
          </label>

          <select
            id="primaryInterest"
            name="primaryInterest"
            required
            value={form.primaryInterest}
            onChange={(event) =>
              updateField("primaryInterest", event.target.value)
            }
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="">Select an area of interest</option>
            <option value="Future Club Membership">
              Future Club Membership
            </option>
            <option value="Golf & Tournament Community">
              Golf &amp; Tournament Community
            </option>
            <option value="Family & Social Club Experience">
              Family &amp; Social Club Experience
            </option>
            <option value="Falcon Society">
              Falcon Society
            </option>
            <option value="Development Updates">
              Development Updates
            </option>
            <option value="General Interest">
              General Interest
            </option>
          </select>
        </div>

        {/* GOLF INTEREST */}
        <div>
          <label
            htmlFor="golfInterest"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Golf Interest
          </label>

          <select
            id="golfInterest"
            name="golfInterest"
            value={form.golfInterest}
            onChange={(event) =>
              updateField("golfInterest", event.target.value)
            }
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="">Select an option</option>
            <option value="Avid Golfer">Avid Golfer</option>
            <option value="Recreational Golfer">
              Recreational Golfer
            </option>
            <option value="Beginner / Learning">
              Beginner / Learning
            </option>
            <option value="Family Golf Interest">
              Family Golf Interest
            </option>
            <option value="Primarily Social / Lifestyle">
              Primarily Social / Lifestyle
            </option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>

        {/* HOUSEHOLD INTEREST */}
        <div>
          <label
            htmlFor="householdInterest"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Household Interest
          </label>

          <select
            id="householdInterest"
            name="householdInterest"
            value={form.householdInterest}
            onChange={(event) =>
              updateField("householdInterest", event.target.value)
            }
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="">Select an option</option>
            <option value="Individual">Individual</option>
            <option value="Couple / Partner">
              Couple / Partner
            </option>
            <option value="Family / Household">
              Family / Household
            </option>
            <option value="Multigenerational Family">
              Multigenerational Family
            </option>
            <option value="Not Sure Yet">
              Not Sure Yet
            </option>
          </select>
        </div>

        {/* COMMUNICATION */}
        <div className="sm:col-span-2">
          <label
            htmlFor="preferredCommunication"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Preferred Communication
          </label>

          <select
            id="preferredCommunication"
            name="preferredCommunication"
            value={form.preferredCommunication}
            onChange={(event) =>
              updateField("preferredCommunication", event.target.value)
            }
            className="mt-2 w-full rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition focus:border-[#B89146] focus:bg-white"
          >
            <option value="">Select a preference</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Text">Text</option>
            <option value="Email & Text">Email &amp; Text</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3557]"
          >
            Anything You&apos;d Like Us to Know?
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            placeholder="Tell us what interests you most about the future of The Gallaspy."
            className="mt-2 w-full resize-none rounded-[12px] border border-[#1E3557]/15 bg-[#F7F4EE] px-4 py-3.5 text-sm text-[#1E3557] outline-none transition placeholder:text-[#1E3557]/40 focus:border-[#B89146] focus:bg-white"
          />
        </div>
      </div>

      {/* DISCLOSURE */}
      <div className="mt-7 rounded-[14px] border border-[#B89146]/20 bg-[#F7F4EE] px-5 py-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
          Expression of Interest Only
        </p>

        <p className="mt-2 text-xs leading-5 text-[#1E3557]/68">
          By submitting this form, you are expressing interest in receiving
          future information about The Gallaspy. This submission is not a
          membership application, reservation, offer, acceptance, deposit, or
          financial commitment.
        </p>
      </div>

      {/* SUBMIT */}
      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#B89146] bg-[#B89146] px-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#10263F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting"
            ? "Submitting..."
            : "Join Membership Interest List"}
        </button>

        <p className="max-w-sm text-xs leading-5 text-[#1E3557]/60">
          No membership payment or deposit is required to join the interest
          list.
        </p>
      </div>

      {/* SUCCESS */}
      {status === "success" && (
        <div className="mt-6 rounded-[14px] border border-[#B89146]/30 bg-[#F7F4EE] px-5 py-4 text-sm leading-6 text-[#1E3557]">
          <strong>Thank you for your interest in The Gallaspy.</strong>
          <br />
          Your information has been received. We&apos;ll keep you informed as
          the future club vision continues to develop.
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div className="mt-6 rounded-[14px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          We could not submit your information. Please try again.
        </div>
      )}
    </form>
  );
}