import Link from "next/link";
import { journalPosts } from "@/data/journal";

export default function JournalPreview() {
  const latestPosts = journalPosts.slice(0, 3);

  return (
    <section className="bg-white px-5 py-16 text-[#10263F] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 border-b border-[#10263F]/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              The Gallaspy Journal
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-[3rem] font-light leading-[0.98] sm:text-5xl">
              Today&apos;s moments.
              <span className="block text-[#8B6A34]">
                Tomorrow&apos;s history.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#33475B]/70">
              Rounds, competition, community, announcements, and the stories
              that document The Gallaspy as it grows.
            </p>
          </div>

          <Link
            href="/journal"
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#10263F] transition hover:text-[#B89146]"
          >
            Visit The Journal →
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-8 pt-10 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="border-t border-[#10263F]/15 pt-6"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#B89146]">
                  {post.category}
                </p>

                <h3 className="mt-3 font-serif text-2xl font-light leading-tight">
                  {post.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#33475B]/65">
                  {post.excerpt}
                </p>

                <Link
                  href={post.href}
                  className="mt-5 inline-flex text-[8px] font-bold uppercase tracking-[0.18em] text-[#10263F]"
                >
                  Read Entry →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 pt-10 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
            <p className="font-serif text-5xl font-light text-[#B89146]">
              001
            </p>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#B89146]">
                The First Entry Is Ahead
              </p>

              <p className="mt-3 max-w-2xl font-serif text-2xl font-light leading-snug">
                The Journal begins with real club moments — not manufactured
                history.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
