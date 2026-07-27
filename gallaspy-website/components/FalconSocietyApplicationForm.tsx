import FalconSocietyApplicationForm from "@/components/FalconSocietyApplicationForm";

export const metadata = {
  title: "Apply to the Falcon Society | The Gallaspy",
  description:
    "Express interest in becoming one of only 100 Founding Members of the Falcon Society at The Gallaspy Golf & Country Club.",
};

const benefits = [
  "Priority consideration as one of only 100 Founding Members",
  "Exclusive project updates and behind-the-scenes development progress",
  "Recognition as a Falcon Society member throughout the club's founding journey",
  "Priority invitations to private previews, events, and milestone celebrations",
];

export default function FalconSocietyApplicationFormPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <section className="relative overflow-hidden bg-[#10263F] px-6 py-24 text-white sm:py-32 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-[#B89146]" />
          <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full border border-[#B89146]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FFD76A]">
            One of Only 100
          </p>

          <h1 className="mt-6 font-serif text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl">
            Apply to the Falcon Society
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            The Falcon Society represents the first 100 individuals and families
            who share our vision of building one of Georgia&apos;s premier private
            golf and lifestyle destinations. Express your interest today and
            become part of our founding story.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B89146]">
              The Falcon Society
            </p>

            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl">
              Help establish the club&apos;s first chapter.
            </h2>

            <p className="mt-6 leading-8 text-[#33475B]">
              The Falcon Society is an exclusive opportunity for the first 100
              individuals and families selected to participate in the founding
              journey of The Gallaspy Golf &amp; Country Club.
            </p>

            <div className="mt-9 rounded-3xl border border-[#D8CEBC] bg-white p-7 shadow-sm">
              <h3 className="font-serif text-2xl">
                Falcon Society Benefits
              </h3>

              <div className="mt-6 space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10263F] text-xs font-bold text-[#FFD76A]">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-[#33475B]">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-3xl bg-[#EDE6DA] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8E6A2E]">
                Important
              </p>

              <p className="mt-3 text-sm leading-6 text-[#33475B]">
                Submitting this application is an expression of interest only
                and does not guarantee selection into the Falcon Society,
                membership approval, or reserve one of only 100 Founding Member
                positions. All applicants will be reviewed before invitations
                are extended.
              </p>
            </div>
          </aside>

          <div>
            <FalconSocietyApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}