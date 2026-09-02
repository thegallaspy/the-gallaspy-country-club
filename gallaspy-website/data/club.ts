export type EventCategory =
  | "GALLASPY_ROUND"
  | "SIGNATURE_EVENT"
  | "COMPETITION"
  | "SOCIAL"
  | "FOUNDING_COMMUNITY";

export type EventStatus =
  | "DETAILS_COMING_SOON"
  | "REGISTRATION_OPENING_SOON"
  | "REGISTRATION_OPEN"
  | "WAITLIST"
  | "INVITATION_ONLY"
  | "SOLD_OUT"
  | "COMPLETED";

export type EventVenue = {
  name?: string;
  city?: string;
  state?: string;
  confirmed: boolean;
};

export type GuestPolicy = {
  allowed: boolean;
  label?: string;
};

export type EventArchive = {
  recap?: string;
  photoGallery?: string[];
  participantCount?: number;
  winnerNames?: string[];
  resultsPublished?: boolean;
};

export type GallaspyEvent = {
  id: string;
  slug: string;
  name: string;
  year: number;

  date?: string;
  month?: number;
  dateLabel: string;

  category: EventCategory;
  status: EventStatus;

  description: string;

  venue?: EventVenue;
  format?: string;

  capacity?: number;
  positionsRemaining?: number;

  priceCents?: number;

  href: string;
  registrationHref?: string;

  featured: boolean;

  guestPolicy?: GuestPolicy;

  traditionId?: string;

  archive?: EventArchive;
};

export type Tradition = {
  id: string;
  name: string;
  recurringMonth: number;
  monthLabel: string;
  firstOccurrenceYear: number;
  description: string;
  permanent: boolean;
  href?: string;
};

export const foundingCommunity = {
  goal: 100,
  confirmedCount: 3 as number | null,
};

export const traditions: Tradition[] = [
  {
    id: "opening-drive",
    name: "Opening Drive",
    recurringMonth: 9,
    monthLabel: "September",
    firstOccurrenceYear: 2026,
    description:
      "The official beginning of The Gallaspy's active golf community and founding calendar.",
    permanent: true,
    href: "/traditions",
  },
  {
    id: "spring-opener",
    name: "Spring Opener",
    recurringMonth: 3,
    monthLabel: "March",
    firstOccurrenceYear: 2027,
    description:
      "The spring return of Gallaspy Rounds and the opening round of the spring season.",
    permanent: true,
    href: "/rounds",
  },
  {
    id: "gallaspy-invitational",
    name: "The Gallaspy Invitational",
    recurringMonth: 6,
    monthLabel: "June",
    firstOccurrenceYear: 2027,
    description:
      "The flagship annual tournament of The Gallaspy.",
    permanent: true,
    href: "/invitational",
  },
  {
    id: "mercury-match",
    name: "The Mercury Match",
    recurringMonth: 10,
    monthLabel: "October",
    firstOccurrenceYear: 2027,
    description:
      "The annual Gallaspy team championship: Crest vs. Falcon. Eight singles matches. Eighteen holes. One team champion.",
    permanent: true,
    href: "/mercury-match",
  },
  {
    id: "night-at-the-nest",
    name: "Night at the Nest",
    recurringMonth: 12,
    monthLabel: "December",
    firstOccurrenceYear: 2027,
    description:
      "The annual year-end Gallaspy gathering and celebration.",
    permanent: true,
    href: "/traditions",
  },
];

export const events: GallaspyEvent[] = [
  {
    id: "opening-drive-2026",
    slug: "opening-drive-2026",
    name: "Opening Drive",
    year: 2026,
    date: "2026-09-26",
    month: 9,
    dateLabel: "September 26, 2026",
    category: "SIGNATURE_EVENT",
    status: "DETAILS_COMING_SOON",
    description:
      "The official beginning of The Gallaspy's founding golf calendar.",
    venue: {
      confirmed: false,
    },
    href: "/rounds",
    featured: true,
  },
  {
    id: "gallaspy-round-002",
    slug: "gallaspy-round-002",
    name: "Round 002",
    year: 2026,
    date: "2026-10-24",
    month: 10,
    dateLabel: "October 24, 2026",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The second gathering in the founding Gallaspy Rounds calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-round-002",
    featured: true,
  },
  {
    id: "gallaspy-round-003",
    slug: "gallaspy-round-003",
    name: "Round 003",
    year: 2026,
    date: "2026-11-14",
    month: 11,
    dateLabel: "November 14, 2026",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The third gathering in the founding Gallaspy Rounds calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-round-003",
    featured: false,
  },
  {
    id: "gallaspy-final-round-2026",
    slug: "gallaspy-final-round-2026",
    name: "Final Round of Founding Year",
    year: 2026,
    date: "2026-12-12",
    month: 12,
    dateLabel: "December 12, 2026",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The final Gallaspy Round of the club's founding calendar year.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-final-round-2026",
    featured: false,
  },
  {
    id: "gallaspy-new-year-round-2027",
    slug: "gallaspy-new-year-round-2027",
    name: "New Year Round",
    year: 2027,
    date: "2027-01-23",
    month: 1,
    dateLabel: "January 23, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The first Gallaspy Round of the new year.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-new-year-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-winter-round-2027",
    slug: "gallaspy-winter-round-2027",
    name: "Winter Round",
    year: 2027,
    date: "2027-02-20",
    month: 2,
    dateLabel: "February 20, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "A winter Gallaspy Round for the growing club community.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-winter-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-spring-opener-2027",
    slug: "gallaspy-spring-opener-2027",
    name: "Spring Opener",
    year: 2027,
    date: "2027-03-20",
    month: 3,
    dateLabel: "March 20, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The spring opening round on the 2027 Gallaspy calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-spring-opener-2027",
    featured: false,
  },
  {
    id: "gallaspy-spring-round-2027",
    slug: "gallaspy-spring-round-2027",
    name: "Spring Round",
    year: 2027,
    date: "2027-04-17",
    month: 4,
    dateLabel: "April 17, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The April gathering in the Gallaspy Rounds calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-spring-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-pre-invitational-round-2027",
    slug: "gallaspy-pre-invitational-round-2027",
    name: "Final Regular Round Before Invitational",
    year: 2027,
    date: "2027-05-15",
    month: 5,
    dateLabel: "May 15, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The final regular Gallaspy Round before the 1st Annual Gallaspy Invitational.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-pre-invitational-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-invitational-2027",
    slug: "gallaspy-invitational-2027",
    name: "The Gallaspy Invitational",
    year: 2027,
    date: "2027-06-21",
    month: 6,
    dateLabel: "June 21, 2027",
    category: "COMPETITION",
    status: "REGISTRATION_OPEN",
    description:
      "The 1st Annual Gallaspy Invitational and the club's flagship individual stroke-play championship.",
    venue: {
      confirmed: false,
    },
    format: "18-Hole Individual Stroke Play",
    capacity: 72,
    href: "/invitational",
    registrationHref: "/invitational/register",
    featured: true,
    guestPolicy: {
      allowed: false,
    },
    traditionId: "gallaspy-invitational",
  },
  {
    id: "gallaspy-summer-round-2027",
    slug: "gallaspy-summer-round-2027",
    name: "Summer Round",
    year: 2027,
    date: "2027-07-24",
    month: 7,
    dateLabel: "July 24, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The July gathering in the Gallaspy Rounds calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-summer-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-late-summer-round-2027",
    slug: "gallaspy-late-summer-round-2027",
    name: "Late-Summer Round",
    year: 2027,
    date: "2027-08-21",
    month: 8,
    dateLabel: "August 21, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The late-summer Gallaspy Round.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-late-summer-round-2027",
    featured: false,
  },
  {
    id: "gallaspy-anniversary-weekend-2027",
    slug: "gallaspy-anniversary-weekend-2027",
    name: "One-Year Anniversary Weekend",
    year: 2027,
    date: "2027-09-25",
    month: 9,
    dateLabel: "September 25, 2027",
    category: "SIGNATURE_EVENT",
    status: "DETAILS_COMING_SOON",
    description:
      "A one-year anniversary gathering marking the first year of Gallaspy club programming.",
    venue: {
      confirmed: false,
    },
    href: "/calendar",
    featured: true,
  },
  {
    id: "mercury-match-2027",
    slug: "mercury-match-2027",
    name: "The Mercury Match",
    year: 2027,
    date: "2027-10-23",
    month: 10,
    dateLabel: "October 23, 2027",
    category: "COMPETITION",
    status: "DETAILS_COMING_SOON",
    description:
      "The inaugural Crest vs. Falcon team championship featuring eight players per team in 18-hole singles match play.",
    venue: {
      confirmed: false,
    },
    format: "16 Players · 8 Singles Matches · Match Play",
    href: "/mercury-match",
    featured: true,
    traditionId: "mercury-match",
  },
  {
    id: "gallaspy-final-golf-event-2027",
    slug: "gallaspy-final-golf-event-2027",
    name: "Final Golf Event of 2027",
    year: 2027,
    date: "2027-11-13",
    month: 11,
    dateLabel: "November 13, 2027",
    category: "GALLASPY_ROUND",
    status: "REGISTRATION_OPEN",
    description:
      "The final golf gathering on the 2027 Gallaspy calendar.",
    venue: {
      confirmed: false,
    },
    format: "Gallaspy Round",
    href: "/rounds",
    registrationHref: "/rounds/register?round=gallaspy-final-golf-event-2027",
    featured: false,
  },
  {
    id: "night-at-the-nest-2027",
    slug: "night-at-the-nest-2027",
    name: "Night at the Nest",
    year: 2027,
    date: "2027-12-11",
    month: 12,
    dateLabel: "December 11, 2027",
    category: "SOCIAL",
    status: "DETAILS_COMING_SOON",
    description:
      "The first annual year-end Gallaspy gathering and celebration.",
    venue: {
      confirmed: false,
    },
    href: "/calendar",
    featured: true,
    traditionId: "night-at-the-nest",
  },
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getUpcomingEvents(limit?: number) {
  const now = new Date();

  const upcoming = events
    .filter((event) => event.status !== "COMPLETED")
    .filter((event) => {
      if (event.date) {
        return new Date(`${event.date}T23:59:59`).getTime() >= now.getTime();
      }

      const month = event.month ?? 1;
      const endOfMonth = new Date(event.year, month, 0, 23, 59, 59);

      return endOfMonth.getTime() >= now.getTime();
    })
    .sort((a, b) => {
      const aDate = a.date
        ? new Date(`${a.date}T12:00:00`).getTime()
        : new Date(a.year, (a.month ?? 1) - 1, 1).getTime();

      const bDate = b.date
        ? new Date(`${b.date}T12:00:00`).getTime()
        : new Date(b.year, (b.month ?? 1) - 1, 1).getTime();

      return aDate - bDate;
    });

  return typeof limit === "number"
    ? upcoming.slice(0, limit)
    : upcoming;
}

export function getNextEvent() {
  return getUpcomingEvents(1)[0] ?? null;
}

export function getEventsByCategory(category: EventCategory) {
  return events.filter((event) => event.category === category);
}

export function getEventsByYear(year: number) {
  return events.filter((event) => event.year === year);
}

export function getCompletedEvents() {
  return events.filter((event) => event.status === "COMPLETED");
}
