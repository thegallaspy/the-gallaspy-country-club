import Image from "next/image";
import Link from "next/link";

const marks = [
  {
    name: "The Falcon",
    label: "Club Symbol",
    image: "/logos/falcon.png",
    layout: "standard",
  },
  {
    name: "The Crest",
    label: "Club Crest",
    image: "/logos/crest.png",
    layout: "standard",
  },
  {
    name: "The Script",
    label: "Club Wordmark",
    image: "/logos/script.png",
    layout: "wide",
  },
];

export default function TheClubPage() {
  return (
    <main className="bg-[#F4F0E7] text-[#10263F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-16 pt-34 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[#0C352D] lg:block" />

        <div className="absolute right-[-6rem] top-24 text-[15rem] font-black leading-none tracking-[-0.09em] text-white/[0.025] sm:text-[21rem] lg:text-[25rem]">
          G
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            

            <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
              The Gallaspy Golf Club
            </p>
          </div>

          <h1 className="mt-8 max-w-[1050px] text-[4rem] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[7.8rem]">
            Club
            <span className="block text-[#E56A70]">Identity.</span>
          </h1>

          <div className="mt-9 grid gap-7 border-t border-white/15 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-[700px] text-[15px] leading-7 text-white/58 sm:text-[17px] sm:leading-8">
              Before there is a permanent home, there is a name, a set of marks,
              and a community that gives the club meaning.
            </p>

            <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white/35">
              Georgia · Est. 2026
            </p>
          </div>
        </div>
      </section>

      {/* THREE MARKS */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.4fr_1.6fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Three Marks
              </p>

              <h2 className="mt-4 text-[2.6rem] font-black uppercase leading-[0.86] tracking-[-0.055em] sm:text-[3.4rem]">
                One
                <span className="block text-[#0C352D]">Club.</span>
              </h2>

              <p className="mt-5 max-w-[300px] text-sm leading-6 text-[#10263F]/58">
                The Falcon, the Crest, and the Script form the visual identity
                of The Gallaspy.
              </p>
            </div>

            <div className="grid overflow-hidden border border-[#10263F]/15 bg-[#F8F5EE] md:grid-cols-3">
              {marks.map((mark, index) => {
                const isScript = mark.layout === "wide";

                return (
                  <article
                    key={mark.name}
                    className={`relative flex min-h-[215px] flex-col justify-between p-5 sm:min-h-[240px] sm:p-6 ${
                      index < marks.length - 1
                        ? "border-b border-[#10263F]/15 md:border-b-0 md:border-r"
                        : ""
                    } bg-[#F8F5EE] text-[#10263F]`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p
                        className="text-[7px] font-black uppercase tracking-[0.27em] text-[#8B6A34]"
                      >
                        {mark.label}
                      </p>

                      
                    </div>

                    <div className="flex flex-1 items-center justify-center py-3 sm:py-4">
                      <div
                        className={
                          isScript
                            ? "relative h-[105px] w-full max-w-[220px]"
                            : "relative h-[150px] w-[150px] sm:h-[165px] sm:w-[165px]"
                        }
                      >
                        <Image
                          src={mark.image}
                          alt={mark.name}
                          fill
                          sizes="220px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <h3 className="text-[1.35rem] font-black uppercase tracking-[-0.04em] sm:text-[1.5rem]">
                      {mark.name}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* IDENTITY STRIPE */}
      <section className="bg-[#0C352D] text-white">
        <div className="h-[6px] bg-[#B3262D]" />

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#FFD76A]">
                Built From The Beginning
              </p>

              <h2 className="mt-5 max-w-[760px] text-[3rem] font-black uppercase leading-[0.87] tracking-[-0.055em] sm:text-[4.2rem] lg:text-[4.8rem]">
                The Identity Comes
                <span className="block text-[#E56A70]">Before The History.</span>
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-white/55 sm:text-[15px]">
                The Gallaspy is being established through the people who play,
                compete, gather, and carry the club forward. The history will
                come from what happens next.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="border border-white/15 px-4 py-3 text-[7px] font-black uppercase tracking-[0.22em] text-white/65">
                  Play
                </span>
                <span className="border border-white/15 px-4 py-3 text-[7px] font-black uppercase tracking-[0.22em] text-white/65">
                  Compete
                </span>
                <span className="border border-white/15 px-4 py-3 text-[7px] font-black uppercase tracking-[0.22em] text-white/65">
                  Gather
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEGINNING */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.34em] text-[#B3262D]">
                Our Beginning
              </p>

              <div className="mt-5 h-[3px] w-12 bg-[#10263F]" />
            </div>

            <div>
              <h2 className="max-w-[900px] text-[2.8rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[3.8rem] lg:text-[4.5rem]">
                A Club Being Built
                <span className="block text-[#0C352D]">Through The Game.</span>
              </h2>

              <div className="mt-8 grid gap-7 md:grid-cols-2">
                <p className="text-[15px] leading-7 text-[#10263F]/58">
                  The Gallaspy is starting before the permanent course,
                  clubhouse, and decades of tradition.
                </p>

                <p className="text-[15px] leading-7 text-[#10263F]/58">
                  That gives the people participating now a chance to experience
                  the earliest rounds, events, and moments that shape the club.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#10263F]/15 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B3262D]">
              The Club Starts On The Course
            </p>

            <p className="mt-3 text-[1.6rem] font-black uppercase tracking-[-0.04em] sm:text-[2rem]">
              Come Play With The Gallaspy.
            </p>
          </div>

          <Link
            href="/play"
            className="inline-flex min-h-[50px] items-center justify-center bg-[#10263F] px-8 text-[8px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-[#B3262D]"
          >
            View Upcoming Play →
          </Link>
        </div>
      </section>
    </main>
  );
}
