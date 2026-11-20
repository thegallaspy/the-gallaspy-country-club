import Link from "next/link";
export default function MembersLockerPage() {
  return <main className="min-h-screen bg-[#10263F] px-6 py-32 text-white"><div className="mx-auto max-w-xl">
    <p className="font-bold uppercase tracking-widest text-[#D7B56D]">Private access</p>
    <h1 className="mt-4 text-5xl font-black">MEMBERS LOCKER.</h1>
    <p className="mt-6 leading-7">The Falcon Society collection is available exclusively in The Gallaspy app. Approved Society members must enter their individual locker code to view the collection.</p>
    <Link className="mt-8 inline-block font-bold underline" href="/apparel">Return to the public Pro Shop</Link>
  </div></main>;
}
