"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let revealTimer: number | undefined;
    let entranceCheck: number | undefined;

    const revealHero = () => {
      revealTimer = window.setTimeout(() => {
        setIsReady(true);
      }, 180);
    };

    const hasEnteredSite =
      sessionStorage.getItem("gallaspy-site-entered") === "true";

    if (hasEnteredSite) {
      revealHero();
    } else {
      entranceCheck = window.setInterval(() => {
        const hasNowEntered =
          sessionStorage.getItem("gallaspy-site-entered") === "true";

        if (hasNowEntered) {
          window.clearInterval(entranceCheck);
          revealHero();
        }
      }, 100);
    }

    return () => {
      if (revealTimer !== undefined) {
        window.clearTimeout(revealTimer);
      }

      if (entranceCheck !== undefined) {
        window.clearInterval(entranceCheck);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#10263F] px-5 pb-20 pt-[90px] sm:px-8 sm:pb-24 sm:pt-[96px] lg:min-h-screen lg:px-10 lg:pb-20 lg:pt-[100px]">
      {/* Cinematic background image */}
      <Image
        src="/images/hero.jpg"
        alt="The proposed Gallaspy Golf and Country Club"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[52%_center] transition-all duration-[9000ms] ease-out sm:object-center ${
          isReady ? "scale-100 opacity-100" : "scale-[1.08] opacity-75"
        }`}
      />

      {/* Image overlays */}
      <div className="absolute inset-0 bg-[#10263F]/40 sm:bg-[#10263F]/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/55 via-[#10263F]/15 to-[#071827]/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#10263F]/55 via-[#10263F]/10 to-[#071827]/95" />

      {/* Extra mobile readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_50%)]" />

      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.34)] sm:shadow-[inset_0_0_170px_rgba(0,0,0,0.38)]" />

      {/* Desktop decorative lines */}
      <div
        className={`absolute left-5 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD76A]/55 to-transparent transition-opacity delay-700 duration-1000 lg:block ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-5 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD76A]/55 to-transparent transition-opacity delay-700 duration-1000 lg:block ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center text-white">
        <div
          className={`flex items-center justify-center gap-3 transition-all duration-1000 sm:gap-4 ${
            isReady
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <span className="hidden h-px w-8 bg-[#FFD76A]/75 sm:block" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A] sm:text-[10px] sm:tracking-[0.42em]">
            Covington, Georgia
          </p>

          <span className="hidden h-px w-8 bg-[#FFD76A]/75 sm:block" />
        </div>

        <h1
          className={`mx-auto mt-5 max-w-[980px] font-serif text-[2.45rem] font-light leading-[0.96] tracking-[-0.025em] text-white transition-all delay-150 duration-[1200ms] min-[390px]:text-[2.75rem] sm:mt-6 sm:text-[4.2rem] md:text-[5rem] lg:text-[6.1rem] xl:text-[6.8rem] ${
            isReady
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          The Gallaspy

          <span className="mt-2 block text-[0.68em] font-light leading-[1.02] tracking-[-0.01em] sm:mt-3">
            Golf &amp; Country Club
          </span>
        </h1>

        <div
          className={`mt-7 h-px bg-[#FFD76A] transition-all delay-300 duration-[1200ms] sm:mt-8 ${
            isReady ? "w-20 opacity-100 sm:w-24" : "w-0 opacity-0"
          }`}
        />

        <p
          className={`mt-6 text-[9px] font-semibold uppercase tracking-[0.26em] text-[#FFD76A] transition-all delay-[400ms] duration-1000 sm:mt-7 sm:text-xs sm:tracking-[0.34em] ${
            isReady
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          A Legacy in the Making
        </p>

        <p
          className={`mx-auto mt-5 max-w-[620px] px-1 text-[13px] font-light leading-6 text-white/85 transition-all delay-500 duration-1000 sm:mt-6 sm:px-0 sm:text-base sm:leading-8 md:text-[17px] ${
            isReady
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          A future private golf and lifestyle destination where championship
          golf, timeless hospitality, family tradition, and enduring legacy
          come together.
        </p>

        <div
          className={`mt-8 flex w-full max-w-[360px] flex-col items-center justify-center gap-3 transition-all delay-[650ms] duration-1000 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4 ${
            isReady
              ? "translate-y-0 opacity-100"
              : "translate-y-7 opacity-0"
          }`}
        >
          <Link
            href="/membership"
            className="group relative inline-flex min-h-[50px] w-full items-center justify-center overflow-hidden border border-[#FFD76A] bg-[#FFD76A] px-6 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#10263F] shadow-[0_16px_45px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-transparent hover:text-white sm:min-h-[52px] sm:w-auto sm:min-w-[215px] sm:px-8 sm:text-[10px] sm:tracking-[0.22em]"
          >
            <span className="relative z-10">Explore Membership</span>

            <span
              aria-hidden="true"
              className="relative z-10 ml-3 transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-0"
            />
          </Link>

          <Link
            href="/invest"
            className="group inline-flex min-h-[50px] w-full items-center justify-center border border-white/55 bg-[#10263F]/30 px-6 text-[9px] font-semibold uppercase tracking-[0.19em] text-white shadow-[0_16px_45px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#FFD76A] hover:bg-[#10263F]/65 hover:text-[#FFD76A] sm:min-h-[52px] sm:w-auto sm:min-w-[215px] sm:px-8 sm:text-[10px] sm:tracking-[0.22em]"
          >
            Investment Overview

            <span
              aria-hidden="true"
              className="ml-3 transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Project marker */}
      <div
        className={`absolute bottom-7 left-6 z-10 hidden transition-all delay-700 duration-1000 sm:block lg:bottom-9 lg:left-10 ${
          isReady
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <div className="border-l border-[#FFD76A]/75 pl-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#FFD76A]">
            Proposed Development
          </p>

          <p className="mt-2 text-[11px] tracking-[0.04em] text-white/65">
            585.6 Acres · Metro Atlanta
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#vision"
        aria-label="Scroll to explore The Gallaspy"
        className={`group absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transition-all delay-[800ms] duration-1000 sm:bottom-5 lg:bottom-8 ${
          isReady
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[7px] font-semibold uppercase tracking-[0.28em] text-white/60 transition-colors duration-300 group-hover:text-[#FFD76A] sm:text-[8px] sm:tracking-[0.32em]">
            Explore
          </span>

          <span className="relative h-8 w-px overflow-hidden bg-white/20 sm:h-11">
            <span className="hero-scroll-line absolute left-0 top-0 h-4 w-px bg-[#FFD76A] sm:h-5" />
          </span>
        </div>
      </a>

      {/* Brand values */}
      <div
        className={`absolute bottom-7 right-6 z-10 hidden text-right transition-all delay-700 duration-1000 md:block lg:bottom-9 lg:right-10 ${
          isReady
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-white/55">
          Tradition · Family · Excellence
        </p>
      </div>

      <style jsx>{`
        .hero-scroll-line {
          animation: scrollLine 2.2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateY(220%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-scroll-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}