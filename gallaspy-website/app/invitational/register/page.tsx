import Link from "next/link";

export default function InvitationalRegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#10263F]">
      {/* HERO */}
      <section className="bg-[#10263F] px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/invitational"
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 transition hover:text-[#FFD76A]"
          >
            ← Back to Invitational
          </Link>

          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A]">
            The First Annual
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            2027 Gallaspy
            <span className="block text-[#FFD76A]">Invitational</span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
            Join the priority list for player registration and be among the
            first to receive official tournament registration information.
          </p>
        </div>
      </section>

      {/* EVENT SNAPSHOT */}
      <section className="border-b border-[#10263F]/10 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          <div className="border-b border-r border-[#10263F]/10 px-4 py-7 md:border-b-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-xl">4-Person Scramble</p>
          </div>

          <div className="border-b border-[#10263F]/10 px-4 py-7 md:border-b-0 md:border-r">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-xl">100 Players</p>
          </div>

          <div className="border-r border-[#10263F]/10 px-4 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Start
            </p>
            <p className="mt-2 font-serif text-xl">11:00 AM</p>
          </div>

          <div className="px-4 py-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]">
              Host Course
            </p>
            <p className="mt-2 font-serif text-xl">To Be Announced</p>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A34]">
              Player Interest
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Be there when the tradition begins.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#10263F]/65">
              The inaugural field is planned for 100 players. Submit your
              interest to receive registration announcements, finalized player
              pricing, host-course information, and tournament updates.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#10263F]/10 bg-white p-7 sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8B6A34]">
              Registration Status
            </p>

            <h3 className="mt-4 font-serif text-3xl">
              Priority Interest List
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#10263F]/65">
              Official paid registration has not opened yet. Joining the
              interest list does not reserve a tournament position or require
              payment.
            </p>

            <form className="mt-8 space-y-6">
              {/* NAME */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    First Name *
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    Last Name *
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>
              </div>

              {/* CONTACT */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>
              </div>

              {/* PLAYER INTEREST */}
              <div>
                <label
                  htmlFor="playerInterest"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                >
                  How Would You Like to Register? *
                </label>

                <select
                  id="playerInterest"
                  name="playerInterest"
                  required
                  defaultValue=""
                  className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="individual">Individual Player</option>
                  <option value="two-players">2 Players</option>
                  <option value="three-players">3 Players</option>
                  <option value="team">Full 4-Person Team</option>
                </select>
              </div>

              {/* HANDICAP + SHIRT */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="handicap"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    Handicap / GHIN
                  </label>

                  <input
                    id="handicap"
                    name="handicap"
                    type="text"
                    placeholder="Optional"
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="shirtSize"
                    className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                  >
                    Polo Size
                  </label>

                  <select
                    id="shirtSize"
                    name="shirtSize"
                    defaultValue=""
                    className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">XL</option>
                    <option value="2xl">2XL</option>
                    <option value="3xl">3XL</option>
                  </select>
                </div>
              </div>

              {/* SPONSOR */}
              <div>
                <label
                  htmlFor="sponsorInterest"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                >
                  Interested in Sponsorship?
                </label>

                <select
                  id="sponsorInterest"
                  name="sponsorInterest"
                  defaultValue="no"
                  className="h-[50px] w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 text-sm outline-none transition focus:border-[#B89146]"
                >
                  <option value="no">No</option>
                  <option value="yes">
                    Yes — Send Me Sponsorship Information
                  </option>
                  <option value="maybe">
                    Possibly — I&apos;d Like to Learn More
                  </option>
                </select>
              </div>

              {/* NOTES */}
              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34]"
                >
                  Team Information or Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Team member names, questions, or additional information..."
                  className="w-full rounded-xl border border-[#10263F]/15 bg-[#F9F7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B89146]"
                />
              </div>

              {/* NOTICE */}
              <div className="border-l-2 border-[#B89146] bg-[#F5F0E6] px-5 py-4">
                <p className="text-[11px] leading-6 text-[#10263F]/60">
                  This form expresses player interest only. Your place in the
                  tournament is not confirmed until official registration opens
                  and payment is completed.
                </p>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#10263F] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#B89146]"
              >
                Join the Priority List
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}