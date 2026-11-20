import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AppBottomNav from "@/components/app/AppBottomNav";

import "./globals.css";
import "./site-premium.css";
import "./site-v2.css";
import "./site-v3.css";
import "./site-v4.css";
import "./site-v5.css";
import "./site-v6.css";
import "./site-v7.css";
import "./site-v8.css";
import "./site-v9.css";
import "./site-v10.css";
import "./site-v11.css";
import "./site-v12.css";
import "./site-final.css";
import "./site-compact.css";

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
    "The Gallaspy Championship",
    "The Gallaspy Cup",
    "Georgia Golf Events",
  ],

  authors: [{ name: "The Gallaspy Development Group" }],

  creator: "The Gallaspy Development Group",

  publisher: "The Gallaspy Development Group",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [{ url: "/icons/falcon-web-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/icons/falcon-web-32.png",
    apple: "/icons/falcon-web-180.png",
  },

  applicationName: "The Gallaspy",

  appleWebApp: {
    capable: true,
    title: "The Gallaspy",
    statusBarStyle: "black-translucent",
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
        url: "/gallaspy-social-preview.png",
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
    images: ["/gallaspy-social-preview.png"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#10263F] antialiased selection:bg-[#B89146] selection:text-white">
        <a href="#gallaspy-page-content" className="gallaspy-skip-link">Skip to content</a>
        <LoadingScreen />

        <Navbar />

        <main id="gallaspy-page-content" tabIndex={-1} className="min-h-screen w-full overflow-x-hidden">
          {children}
        </main>

        <AppBottomNav />

        <Footer />
      </body>
    </html>
  );
}
