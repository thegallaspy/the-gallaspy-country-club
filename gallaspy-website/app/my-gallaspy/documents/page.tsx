import CancelMembership from "./CancelMembership";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSignedMembershipRecords } from "@/lib/membership/get-signed-records";

export const dynamic = "force-dynamic";

type SignedDocument = {
  version: string;
  sha256: string;
  content: string;
};

export default async function MembershipDocumentsPage() {
  const records = await getSignedMembershipRecords();

  if (!records) redirect("/my-gallaspy");

  return (
    <main className="min-h-screen bg-white px-5 py-24 text-[#10263F]">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/my-gallaspy/home" className="text-sm font-semibold text-[#164B3A]">
          ← My Gallaspy
        </Link>

        <header>
          <p className="text-xs font-bold uppercase tracking-widest text-[#164B3A]">
            The Gallaspy Golf Club
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Membership Documents
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Your private record of accepted membership agreements.
          </p>
        </header>

        <CancelMembership />

        {records.length === 0 ? (
          <p className="rounded-xl border p-6">
            No signed membership agreements are available yet.
          </p>
        ) : records.map((record) => (
          <section key={record.id} className="space-y-5 rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Standard {record.membership_plan === "annual" ? "Annual" : "Monthly"} Membership
            </h2>

            <p>Signed by: {record.signed_full_name}</p>
            <p>Accepted: {new Date(record.accepted_at).toISOString()}</p>

            <a href={`/api/membership/documents?id=${record.id}`}
              className="inline-block rounded-xl bg-[#164B3A] px-5 py-3 text-white">
              Download signed records
            </a>

            {Object.entries(record.documents as Record<string, SignedDocument>)
              .map(([name, doc]) => (
                <details key={name} className="rounded-xl border p-4">
                  <summary className="cursor-pointer font-semibold">
                    {name.replace(".md", "").replaceAll("-", " ")}
                  </summary>
                  <p className="mt-3 text-xs">Version: {doc.version}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7">
                    {doc.content}
                  </p>
                </details>
              ))}
          </section>
        ))}
      </div>
    </main>
  );
}
