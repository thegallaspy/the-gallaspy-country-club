import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Gallaspy Golf & Country Club",
  description:
    "A premier private golf and lifestyle destination in Covington, Georgia.",
  icons: {
    icon: "/logos/logo.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#F7F4EE] text-[#10263F] antialiased">
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