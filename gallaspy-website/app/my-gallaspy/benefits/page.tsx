import Link from "next/link";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GET as verifyMembership } from "@/app/api/mobile/membership/route";

export const dynamic = "force-dynamic";

const benefits = [
  ["Monthly round", "One organized round each month. Green fees are separate.", "/rounds"],
  ["Additional golf activity", "One additional golf activity each month.", "/calendar"],
  ["Social connection", "One networking or social opportunity each month.", "/calendar"],
  ["Golf Partners", "Connect with playing partners.", "/play"],
  ["Priority access", "Normally 72 hours early where offered, subject to eligibility and capacity. Cup selection is not guaranteed.", "/calendar"],
  ["Pro Shop", "Up to 25% off select eligible apparel.", "/apparel"],
  ["Rewards", "Earn points through eligible verified activity and purchases.", "/my-gallaspy/rewards"],
];

export default async function BenefitsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) redirect("/my-gallaspy?next=%2Fmy-gallaspy%2Fbenefits");
  const response = await verifyMembership(new NextRequest("https://thegallaspy.com/api/mobile/membership", { headers: { Authorization: `Bearer ${session.access_token}` } }));
  if (response.status === 401) redirect("/my-gallaspy");
  const result = response.ok ? await response.json() : null;
  const verified = result?.membership?.is_official_member === true;
  const falcon = verified && result.membership.is_falcon_society_member === true;
  const label = !result ? "Verification unavailable" : falcon ? "Falcon Society verified" : verified ? "Standard Membership verified" : "No active membership verified";

  return <main className="min-h-screen bg-white px-5 pb-24 pt-32 text-[#10263F] sm:px-10">
    <div className="mx-auto max-w-5xl">
      <Link href="/my-gallaspy/home" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#164B3A]">← My Gallaspy</Link>
      <header className="my-8"><p className="text-xs font-bold uppercase tracking-widest text-[#164B3A]">The Gallaspy Golf Club</p><h1 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-6xl">Member benefits wallet.</h1><p className="mt-4 text-[#47596A]">Your guide to club privileges and membership access.</p></header>
      <section className="rounded-xl bg-[#123D32] p-6 !text-white" aria-label="Membership verification"><p className="text-xs font-bold uppercase tracking-widest !text-white/80">Membership status</p><h2 className="mt-3 text-2xl font-bold !text-white">{label}</h2><p className="mt-3 !text-white/80">{verified ? "Access remains subject to the eligibility and availability of each benefit." : "The benefits below are a preview, not an entitlement. A My Gallaspy account is separate from official club membership."}</p></section>
      <h2 className="mt-10 text-2xl font-black">Standard Membership privileges</h2>
      {falcon ? <p className="mt-2 text-sm text-[#47596A]">Standard privileges are listed for reference. See Falcon Society for your founder-specific program.</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{benefits.map(([title, copy, href]) => <article key={title} className="rounded-lg border border-[#10263F]/15 p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#47596A]">{copy}</p><Link href={href} className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-[#164B3A]">Explore →</Link></article>)}</div>
      <p className="mt-5 text-sm text-[#47596A]">GHIN handicap access is planned, pending USGA/GSGA authorization and per-member arrangements.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href={verified ? "/my-gallaspy/documents" : "/membership"} className="rounded-md bg-[#164B3A] px-5 py-3 font-bold !text-white">{verified ? "Membership documents" : "Explore membership plans"}</Link><Link href="/falcon-society" className="rounded-md border border-[#10263F]/20 px-5 py-3 font-bold">Falcon Society</Link></div>
    </div>
  </main>;
}
