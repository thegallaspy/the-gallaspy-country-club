import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thegallaspy.com"),

  title: {
    default: "The Gallaspy Golf & Country Club",
    template: "%s | The Gallaspy Golf & Country Club",
  },

  description:
    "A premier private golf, wellness, hospitality, and lifestyle destination currently being envisioned in Metro Atlanta.",

  keywords: [
    "Private Golf Club",
    "Country Club",
    "Covington Georgia",
    "Metro Atlanta",
    "Luxury Golf",
    "Golf Community",
    "Private Membership",
    "Golf Course",
    "Championship Golf",
    "Wellness",
    "Luxury Real Estate",
    "The Gallaspy",
  ],

  authors: [{ name: "The Gallaspy Development Group" }],

  creator: "The Gallaspy Development Group",

  publisher: "The Gallaspy Development Group",

  icons: {
    icon: "/logos/logo.png",
    shortcut: "/logos/logo.png",
    apple: "/logos/logo.png",
  },

  openGraph: {
    title: "The Gallaspy Golf & Country Club",
    description:
      "A premier private golf and lifestyle destination in Metro Atlanta.",
    url: "https://thegallaspy.com",
    siteName: "The Gallaspy Golf & Country Club",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Gallaspy Golf & Country Club",
    description:
      "A premier private golf and lifestyle destination.",
    images: ["/images/og-image.jpg"],
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
      <body className="bg-[#F7F4EE] text-[#10263F] antialiased selection:bg-[#B89146] selection:text-white">
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