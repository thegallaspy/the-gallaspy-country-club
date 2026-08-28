import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";

import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://thegallaspy.com"),

  title: {
    default: "The Gallaspy Golf Club",
    template: "%s | The Gallaspy Golf Club",
  },

  description:
    "A golf club being built through the game. The Gallaspy brings golfers together through play, competition, gatherings, and traditions across Georgia.",

  keywords: [
    "The Gallaspy",
    "The Gallaspy Golf Club",
    "Georgia Golf",
    "Atlanta Golf",
    "Golf Club",
    "Golf Community",
    "Golf Events",
    "Golf Tournament",
    "The Gallaspy Invitational",
    "Georgia Golf Events",
  ],

  authors: [{ name: "The Gallaspy Development Group" }],

  creator: "The Gallaspy Development Group",

  publisher: "The Gallaspy Development Group",

  icons: {
    icon: "/logos/crest.png",
    shortcut: "/logos/crest.png",
    apple: "/logos/crest.png",
  },

  openGraph: {
    title: "The Gallaspy Golf Club",
    description:
      "A golf club being built through the game, the people who play it, and the traditions created along the way.",
    url: "https://thegallaspy.com",
    siteName: "The Gallaspy Golf Club",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "The Gallaspy Golf Club",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Gallaspy Golf Club",
    description:
      "A golf club being built through the game, the people who play it, and the traditions created along the way.",
    images: ["/images/home-hero.jpg"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const squareScript =
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F7F4EE] text-[#10263F] antialiased selection:bg-[#B89146] selection:text-white">
        <Script
          src={squareScript}
          strategy="afterInteractive"
        />

        <LoadingScreen />

        <Navbar />

        <main className="min-h-screen w-full overflow-x-hidden">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
