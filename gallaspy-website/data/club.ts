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
  confirmedCount: null as number | null,
};

export const traditions: Tradition[] = [
  {
    id: "first-flight",
    name: "First Flight",
    recurringMonth: 9,
    monthLabel: "September",
    firstOccurrenceYear: 2026,
    description:
      "The gathering that marks the beginning of The Gallaspy's active golf community and becomes an annual anniversary tradition.",
    permanent: true,
    href: "/traditions",
  },
  {
    id: "opening-drive",
    name: "Opening Drive",
    recurringMonth: 3,
    monthLabel: "March",
    firstOccurrenceYear: 2027,
    description:
      "The ceremonial beginning of each Gallaspy golf season.",
    permanent: true,
    href: "/traditions",
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
    recurringMonth: 9,
    monthLabel: "September",
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
    id: "first-flight-2026",
    slug: "first-flight-2026",
    name: "First Flight",
    year: 2026,
    date: "2026-09-26",
    month: 9,
    dateLabel: "September 26, 2026",
    category: "SIGNATURE_EVENT",
    status: "INVITATION_ONLY",
    description:
      "The beginning of active Gallaspy club programming and the first official gathering of the club community.",
    venue: {
      confirmed: true,
      name: "Private Location",
    },
    href: "/events/first-flight-2026",
    featured: true,
    guestPolicy: {
      allowed: false,
    },
    traditionId: "first-flight",
  },
  {
    id: "gallaspy-round-october-2026",
    slug: "gallaspy-round-october-2026",
    name: "Gallaspy Round",
    year: 2026,
    month: 10,
    dateLabel: "October 2026",
    category: "GALLASPY_ROUND",
    status: "DETAILS_COMING_SOON",
    description:
      "A monthly Gallaspy golf gathering at a selected course.",
    venue: {
      confirmed: false,
    },
    href: "/rounds",
    featured: false,
  },
  {
    id: "gallaspy-round-november-2026",
    slug: "gallaspy-round-november-2026",
    name: "Gallaspy Round",
    year: 2026,
    month: 11,
    dateLabel: "November 2026",
    category: "GALLASPY_ROUND",
    status: "DETAILS_COMING_SOON",
    description:
      "A monthly Gallaspy golf gathering at a selected course.",
    venue: {
      confirmed: false,
    },
    href: "/rounds",
    featured: false,
  },
  {
    id: "opening-drive-2027",
    slug: "opening-drive-2027",
    name: "Opening Drive",
    year: 2027,
    month: 3,
    dateLabel: "March 2027",
    category: "SIGNATURE_EVENT",
    status: "DETAILS_COMING_SOON",
    description:
      "The ceremonial opening of the 2027 Gallaspy golf season.",
    venue: {
      confirmed: false,
    },
    href: "/events/opening-drive-2027",
    featured: false,
    traditionId: "opening-drive",
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
      "The 1st Annual Gallaspy Invitational and the club's flagship tournament.",
    venue: {
      confirmed: false,
    },
    format: "18-Hole Individual Stroke Play",
    capacity: 100,
    href: "/invitational",
    registrationHref: "/invitational/register",
    featured: true,
    guestPolicy: {
      allowed: false,
    },
    traditionId: "gallaspy-invitational",
  },
  {
    id: "mercury-match-2027",
    slug: "mercury-match-2027",
    name: "The Mercury Match",
    year: 2027,
    month: 9,
    dateLabel: "September 2027",
    category: "COMPETITION",
    status: "DETAILS_COMING_SOON",
    description:
      "The inaugural Crest vs. Falcon team championship featuring eight players per team in 18-hole singles match play.",
    venue: {
      confirmed: false,
    },
    href: "/mercury-match",
    featured: false,
    traditionId: "mercury-match",
  },
  {
    id: "night-at-the-nest-2027",
    slug: "night-at-the-nest-2027",
    name: "Night at the Nest",
    year: 2027,
    month: 12,
    dateLabel: "December 2027",
    category: "SOCIAL",
    status: "DETAILS_COMING_SOON",
    description:
      "The first annual year-end Gallaspy gathering and celebration.",
    venue: {
      confirmed: false,
    },
    href: "/events/night-at-the-nest-2027",
    featured: false,
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
