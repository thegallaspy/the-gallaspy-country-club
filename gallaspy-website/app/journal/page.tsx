import Link from "next/link";
import { journalPosts } from "@/data/journal";

export const metadata = {
  title: "The Gallaspy Journal | The Gallaspy Golf Club",
  description:
    "Club stories, Gallaspy Rounds, competition, community, apparel, and announcements from The Gallaspy Golf Club.",
};

const categories = [
  "Club",
  "Rounds",
  "Invitational",
  "Mercury Match",
  "Community",
  "Apparel",
  "Announcements",
];

export default function JournalPage() {
  const hasPosts = journalPosts.length > 0;

  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <section className="bg-[#10263F] px-5 pb-20 pt-32 text-white sm:px-8 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D7B56D]">
            The Gallaspy Journal
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-[4rem] font-light leading-[0.9] sm:text-7xl lg:text-[6rem]">
            The story should be
            <span className="block text-[#D7B56D]">recorded as it happens.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Club news, Gallaspy Rounds, competition, community, apparel, and
            the moments that become part of the history of The Gallaspy.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-wrap gap-2 border-b border-[#10263F]/15 pb-8">
            {categories.map((category) => (
              <span
                key={category}
                className="border border-[#10263F]/15 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#10263F]/60"
              >
                {category}
              </span>
            ))}
          </div>

          {hasPosts ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {journalPosts.map((post) => (
                <article
                  key={post.slug}
                  className="border-t border-[#10263F]/20 pt-6"
                >
                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#B89146]">
                    {post.category}
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-light">
                    {post.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                    {post.excerpt}
                  </p>

                  <Link
                    href={post.href}
                    className="mt-5 inline-flex text-[8px] font-bold uppercase tracking-[0.18em] text-[#10263F]"
                  >
                    Read Journal Entry →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B89146]">
                  The First Entries Are Ahead
                </p>

                <h2 className="mt-4 max-w-2xl font-serif text-[2.8rem] font-light leading-[1.02] sm:text-5xl">
                  Real moments first.
                  <span className="block text-[#8B6A34]">
                    The archive follows.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#33475B]/70">
                  The Journal will begin filling as The Gallaspy hosts its
                  first rounds, competitions, gatherings, and club
                  milestones.
                </p>
              </div>

              <Link
                href="/calendar"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#10263F] px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#0C352D]"
              >
                See What Happens Next →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
