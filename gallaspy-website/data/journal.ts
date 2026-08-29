export type JournalCategory =
  | "Club"
  | "Rounds"
  | "Invitational"
  | "Mercury Match"
  | "Community"
  | "Apparel"
  | "Announcements";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  publishedAt: string;
  href: string;
};

export const journalPosts: JournalPost[] = [];
