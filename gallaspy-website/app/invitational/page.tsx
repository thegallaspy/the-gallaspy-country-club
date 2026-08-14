import InvitationalNav from "@/components/invitational/InvitationalNav";

export default function InvitationalPage() {
  return (
    <main className="bg-[#F5F0E6] text-[#10263F]">
      <InvitationalNav />
      {/* HERO */}
      <section className="flex min-h-[90vh] items-center bg-[#10263F] px-6 pt-28 text-white sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
            The Gallaspy Presents
          </p>

          <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-[92px]">
            The 2027
            <span className="block text-[#FFD76A]">
              Gallaspy Invitational
            </span>
          </h1>

          <div className="mt-8 h-px w-24 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            The inaugural Gallaspy Invitational brings together competitive
            golf, hospitality, community, and partnership for a carefully
            curated tournament experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#registration"
              className="rounded-full bg-[#B89146] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#10263F]"
            >
              Player Registration
            </a>

            <a
              href="#sponsors"
              className="rounded-full border border-white/25 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#FFD76A] hover:text-[#FFD76A]"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="bg-white px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6A34]">
              Format
            </p>
            <p className="mt-2 font-serif text-2xl">4-Person Scramble</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6A34]">
              Field
            </p>
            <p className="mt-2 font-serif text-2xl">100 Players</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6A34]">
              Year
            </p>
            <p className="mt-2 font-serif text-2xl">2027</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6A34]">
              Start
            </p>
            <p className="mt-2 font-serif text-2xl">11:00 AM</p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              More Than a Tournament
            </p>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A tradition begins in 2027.
            </h2>
          </div>

          <div className="max-w-2xl lg:pt-8">
            <p className="text-lg leading-9 text-[#10263F]/75">
              The Gallaspy Invitational is being created as the first major
              public golf experience under The Gallaspy name — bringing the
              vision of the future club into the present through competition,
              hospitality, relationships, and shared experience.
            </p>

            <p className="mt-7 text-base leading-8 text-[#10263F]/65">
              The inaugural field will be intentionally limited to 100 players,
              allowing the event to deliver a more personal and elevated
              experience for golfers and sponsors while establishing the
              standards that will define future editions.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-[#0E2238] px-6 py-24 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              The Experience
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
              Built to feel different from the first tee.
            </h2>
          </div>

          <div className="grid border-t border-white/15 md:grid-cols-2">
            <article className="border-b border-white/15 py-10 md:p-10 lg:p-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#FFD76A]">
                01
              </p>
              <h3 className="mt-8 font-serif text-3xl">Championship Golf</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                An 18-hole competitive scramble built around a polished
                tournament-day experience for players, guests, and partners.
              </p>
            </article>

            <article className="border-b border-white/15 py-10 md:border-l md:p-10 lg:p-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#FFD76A]">
                02
              </p>
              <h3 className="mt-8 font-serif text-3xl">Player Experience</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                Premium gifting, registration, hospitality, on-course
                activations, contests, and a memorable awards experience.
              </p>
            </article>

            <article className="border-b border-white/15 py-10 md:p-10 lg:p-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#FFD76A]">
                03
              </p>
              <h3 className="mt-8 font-serif text-3xl">
                Meaningful Competition
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                Team competition and individual challenges designed to keep
                every group engaged throughout the round.
              </p>
            </article>

            <article className="border-b border-white/15 py-10 md:border-l md:p-10 lg:p-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#FFD76A]">
                04
              </p>
              <h3 className="mt-8 font-serif text-3xl">Founding Tradition</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                The first chapter in what is intended to become an annual
                Gallaspy tradition and a signature expression of the brand.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* COMPETITION & PRIZES */}
      <section className="bg-white px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              Competition & Prizes
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Every hole should have a reason to matter.
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#10263F]/68">
              The 2027 Gallaspy Invitational will combine team competition with
              individual on-course challenges, premium prizes, sponsor
              activations, and tournament moments designed to keep the entire
              field engaged from the opening tee shot through the awards
              presentation.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#10263F]/58">
              Final purse structure, contest awards, and prize details will be
              announced as tournament planning is finalized.
            </p>
          </div>

          <div className="border-t border-[#10263F]/15">
            {[
              "Team Championship",
              "Closest to the Pin",
              "Longest Drive",
              "Hole-in-One Challenge",
              "On-Course Sponsor Activations",
              "Awards Presentation",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-[#10263F]/15 py-5"
              >
                <span className="font-serif text-xl sm:text-2xl">{item}</span>

                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#8B6A34]">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TOURNAMENT RESOURCES */}
      <section className="bg-[#F5F0E6] px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
              Tournament Resources
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
              Everything you need for the 2027 Invitational.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#10263F]/62">
              Explore player registration, partnership opportunities, the
              working tournament-day schedule, and answers to frequently asked
              questions.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <a
              href="/invitational/register"
              className="group flex min-h-[250px] flex-col justify-between border border-[#10263F]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/50 hover:shadow-[0_18px_50px_rgba(16,38,63,0.08)]"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#8B6A34]">
                  01
                </p>

                <h3 className="mt-7 font-serif text-3xl">
                  Player Registration
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#10263F]/62">
                  Join the priority list and receive official registration,
                  pricing, venue, and player updates.
                </p>
              </div>

              <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition group-hover:text-[#10263F]">
                Register Interest →
              </span>
            </a>

            <a
              href="/invitational/sponsors"
              className="group flex min-h-[250px] flex-col justify-between border border-[#10263F]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/50 hover:shadow-[0_18px_50px_rgba(16,38,63,0.08)]"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#8B6A34]">
                  02
                </p>

                <h3 className="mt-7 font-serif text-3xl">
                  Sponsorship
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#10263F]/62">
                  Explore founding partnership opportunities, brand
                  activations, hospitality, gifting, and tournament exposure.
                </p>
              </div>

              <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition group-hover:text-[#10263F]">
                Explore Partnership →
              </span>
            </a>

            <a
              href="/invitational/schedule"
              className="group flex min-h-[250px] flex-col justify-between border border-[#10263F]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/50 hover:shadow-[0_18px_50px_rgba(16,38,63,0.08)]"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#8B6A34]">
                  03
                </p>

                <h3 className="mt-7 font-serif text-3xl">
                  Tournament Schedule
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#10263F]/62">
                  Review the current tournament-day framework from player
                  arrival through the awards presentation.
                </p>
              </div>

              <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition group-hover:text-[#10263F]">
                View Schedule →
              </span>
            </a>

            <a
              href="/invitational/faq"
              className="group flex min-h-[250px] flex-col justify-between border border-[#10263F]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/50 hover:shadow-[0_18px_50px_rgba(16,38,63,0.08)]"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#8B6A34]">
                  04
                </p>

                <h3 className="mt-7 font-serif text-3xl">
                  Tournament FAQ
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#10263F]/62">
                  Find answers about format, field size, registration, venue
                  status, prizes, contests, and sponsorship.
                </p>
              </div>

              <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6A34] transition group-hover:text-[#10263F]">
                Read FAQ →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* HOST COURSE */}
      <section className="bg-[#EFE7D8] px-6 py-24 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            2027 Host Course
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl">
            A championship setting is being finalized.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#10263F]/68">
            The Gallaspy is currently finalizing the host venue for the
            inaugural Invitational. Official course details will be announced
            following completion of the venue agreement.
          </p>

          <div className="mx-auto mt-10 h-px w-20 bg-[#B89146]" />

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#10263F]/50">
            Georgia · 2027
          </p>
        </div>
      </section>

      {/* SPONSORSHIP */}
      <section
        id="sponsors"
        className="bg-[#10263F] px-6 py-24 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
              Partnership
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Build the first chapter with us.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-white/65">
              Founding sponsors will have the opportunity to align with the
              inaugural tournament through player hospitality, on-course
              branding, digital exposure, gifting, activations, and custom
              partnership opportunities.
            </p>

            <a
              href="/invitational/sponsors"
              className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#FFD76A] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD76A] transition duration-300 hover:bg-[#FFD76A] hover:text-[#10263F]"
            >
              Explore Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="registration"
        className="px-6 py-24 text-center sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
            The First Annual
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Be there when the tradition begins.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#10263F]/65">
            Player registration, sponsorship opportunities, and additional
            tournament information will continue to be released through The
            Gallaspy as planning advances.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/invitational/register"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#10263F] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#B89146]"
            >
              Register Interest
            </a>

            <a
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#10263F]/20 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10263F] transition duration-300 hover:border-[#10263F] hover:bg-white"
            >
              Contact The Gallaspy
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
