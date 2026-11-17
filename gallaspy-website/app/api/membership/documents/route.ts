import { NextResponse } from "next/server";
import { getSignedMembershipRecords } from "@/lib/membership/get-signed-records";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");

  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid record" }, { status: 400 });
  }

  try {
    const records = await getSignedMembershipRecords(id);

    if (!records) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (records.length !== 1) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return new Response(JSON.stringify(records[0], null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="gallaspy-signed-membership.json"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Record unavailable" }, { status: 503 });
  }
}
