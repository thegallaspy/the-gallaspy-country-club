import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { ArrowUpRight, Flag, ShoppingBag, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const number = new Intl.NumberFormat("en-US");
const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
const opportunities = [
  { title: "Host your own round", value: "+200 pts", detail: "Verified completed hosting", href: "/host-a-round#host-round", icon: Users },
  { title: "Play a Gallaspy Round", value: "+100 pts", detail: "Verified completed attendance", href: "/rounds", icon: Flag },
  { title: "Shop Gallaspy apparel", value: "1 pt / $1", detail: "Eligible subtotal, before tax and shipping", href: "/apparel", icon: ShoppingBag },
];

export default async function RewardsPage() {
  const session = await createClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user?.id) redirect("/my-gallaspy?next=%2Fmy-gallaspy%2Frewards");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const admin = url && key ? createAdminClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  const [balance, history] = admin ? await Promise.all([
    admin.from("gallaspy_points_balances").select("available_points,lifetime_earned").eq("user_id", user.id).maybeSingle(),
    admin.from("gallaspy_points_ledger").select("id,points,description,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
  ]) : [null, null];

  return <main className="min-h-screen bg-white px-5 pb-24 pt-32 text-[#10263F] sm:px-10">
    <div className="mx-auto max-w-5xl">
      <Link href="/my-gallaspy/home" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#164B3A]">← My Gallaspy</Link>
      <header className="mb-8 mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#164B3A]">Your digital clubhouse / 01</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-[-0.055em] sm:text-7xl">Gallaspy Rewards.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#10263F]/75">Every verified round and eligible purchase adds to your journey.</p>
      </header>
      <section aria-label="Your points balance" className="overflow-hidden rounded-2xl bg-[#123D32] p-6 !text-white sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] !text-[#E5C475]">Club Points wallet</p>
        <div className="mt-7 grid grid-cols-2 gap-5">
          <div><p className="text-xs !text-white/80">Available points</p><p className="mt-2 break-words text-4xl font-black tabular-nums !text-white sm:text-6xl">{balance && !balance.error ? number.format(balance.data?.available_points ?? 0) : "—"}</p></div>
          <div className="border-l border-white/20 pl-5"><p className="text-xs !text-white/80">Lifetime earned</p><p className="mt-2 break-words text-4xl font-black tabular-nums !text-white sm:text-6xl">{balance && !balance.error ? number.format(balance.data?.lifetime_earned ?? 0) : "—"}</p></div>
        </div>
        <p className="mt-8 text-sm !text-white/80">{balance && !balance.error ? "Redemption is not yet available. Keep building your balance." : "Your balance is temporarily unavailable. Please refresh to try again."}</p>
      </section>
      <section className="mt-10" aria-labelledby="earn-heading">
        <h2 id="earn-heading" className="text-2xl font-black tracking-tight">Make your next move.</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {opportunities.map(({ title, value, detail, href, icon: Icon }) => <Link key={href} href={href} className="group flex min-h-48 flex-col rounded-xl border border-[#10263F]/15 p-5 transition hover:border-[#164B3A] focus-visible:outline-2 focus-visible:outline-[#164B3A]">
            <div className="flex items-center justify-between"><Icon aria-hidden="true" size={25} className="text-[#164B3A]"/><ArrowUpRight aria-hidden="true" size={20}/></div>
            <p className="mt-5 text-xl font-black text-[#164B3A]">{value}</p><h3 className="mt-1 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-5 text-[#10263F]/70">{detail}</p>
          </Link>)}
        </div>
        <p className="mt-4 text-sm leading-6 text-[#10263F]/75">Hosting and attendance points cannot both be awarded for the same round. Refunds may reverse purchase points.</p>
      </section>
      <section className="mt-10" aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="text-2xl font-black tracking-tight">Points activity</h2>
        <div className="mt-4 divide-y divide-[#10263F]/10 rounded-xl border border-[#10263F]/15">
          {!history || history.error ? <p className="p-6 text-sm">Activity is temporarily unavailable. Refresh to try again.</p> : !history.data?.length ? <p className="p-6 text-sm leading-6">Your first verified activity will appear here. Find a round to get started.</p> : history.data.map(item => <div key={item.id} className="flex items-center justify-between gap-4 p-5"><div className="min-w-0"><p className="break-words font-semibold">{item.description || "Club Points activity"}</p><time className="mt-1 block text-sm text-[#10263F]/70" dateTime={item.created_at}>{Number.isNaN(new Date(item.created_at).getTime()) ? "Date unavailable" : date.format(new Date(item.created_at))}</time></div><strong className="shrink-0 tabular-nums text-[#164B3A]">{item.points > 0 ? "+" : ""}{number.format(item.points)} pts</strong></div>)}
        </div>
      </section>
    </div>
  </main>;
}
