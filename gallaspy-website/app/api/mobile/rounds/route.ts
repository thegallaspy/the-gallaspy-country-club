import { NextResponse } from "next/server";
import { getEventsByCategory } from "@/data/club";

export const dynamic = "force-dynamic";

export async function GET() {
  const rounds = getEventsByCategory("GALLASPY_ROUND")
    .map((event) => ({
      id: event.id,
      slug: event.slug,
      name: event.name,
      date: event.date,
      dateLabel: event.dateLabel,
      description: event.description,
      status: event.status,
      venue: event.venue,
      capacity: event.capacity,
      registrationHref: event.registrationHref ?? null,
    }))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

  return NextResponse.json(
    {
      success: true,
      rounds,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
