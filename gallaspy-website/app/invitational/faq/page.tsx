import Link from "next/link";

export default function InvitationalFAQPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E6] px-6 pb-24 pt-32 text-[#10263F] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <Link
          href="/invitational"
          className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6A34]"
        >
          ← Back to Invitational
        </Link>

        <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A34]">
          Tournament Information
        </p>

        <h1 className="mt-5 font-serif text-5xl sm:text-6xl">
          Invitational FAQ
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[#10263F]/65">
          Frequently asked questions for the 2027 Gallaspy Invitational will
          be published here as registration, venue, sponsorship, prizes, and
          tournament operations are finalized.
        </p>
      </div>
    </main>
  );
}