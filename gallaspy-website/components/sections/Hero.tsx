"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 180);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#10263F] px-5 pb-16 pt-[76px] sm:px-8 sm:pb-20 sm:pt-[90px] lg:min-h-screen lg:px-10 lg:pb-20 lg:pt-[100px]">
      <Image
        src="/images/home-hero.jpg"
        alt="The Gallaspy Golf Club"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[52%_center] transition-all duration-[9000ms] ease-out sm:object-center ${
          isReady ? "scale-100 opacity-100" : "scale-[1.08] opacity-75"
        }`}
      />

      <div className="absolute inset-0 bg-[#10263F]/18 sm:bg-[#10263F]/14" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/38 via-transparent to-[#071827]/20" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#071827]/24 via-transparent to-[#071827]/72" />

      <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.18)] sm:shadow-[inset_0_0_120px_rgba(0,0,0,0.2)]" />

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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center text-white">
        <div
          className={`flex flex-col items-center transition-all duration-1000 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <Image
            src="/logos/falcon.png"
            alt="The Gallaspy Falcon"
            width={160}
            height={160}
            priority
            className="mb-5 h-auto w-[96px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] sm:mb-7 sm:w-[118px] lg:w-[128px]"
          />

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden h-px w-8 bg-[#FFD76A]/75 sm:block" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#FFD76A] sm:text-[10px] sm:tracking-[0.42em]">
              Georgia · Est. 2026
            </p>

            <span className="hidden h-px w-8 bg-[#FFD76A]/75 sm:block" />
          </div>
        </div>

        <h1
          className={`mx-auto mt-5 max-w-[980px] font-serif text-[2.45rem] font-light leading-[0.96] tracking-[-0.025em] text-white transition-all delay-150 duration-[1200ms] min-[390px]:text-[2.75rem] sm:mt-6 sm:text-[4.2rem] md:text-[5rem] lg:text-[6.1rem] xl:text-[6.8rem] ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          The Gallaspy

          <span className="mt-2 block text-[0.68em] font-light leading-[1.02] tracking-[-0.01em] sm:mt-3">
            Golf Club
          </span>
        </h1>

        <div
          className={`mt-7 h-px bg-[#FFD76A] transition-all delay-300 duration-[1200ms] sm:mt-8 ${
            isReady ? "w-20 opacity-100 sm:w-24" : "w-0 opacity-0"
          }`}
        />

        <div
          className={`mt-6 transition-all delay-[400ms] duration-1000 sm:mt-7 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="whitespace-nowrap font-serif text-[0.92rem] font-light tracking-[-0.015em] text-white sm:text-[1.3rem] md:text-[1.55rem] lg:text-[1.8rem]">
            No course. No clubhouse. No history.
          </p>

          <p className="mt-2 font-serif text-[1.2rem] font-light italic text-[#FFD76A] sm:text-[1.55rem] md:text-[1.8rem]">
            Yet.
          </p>
        </div>

        <p
          className={`mx-auto mt-5 max-w-[720px] text-[13px] font-light leading-6 text-white/85 transition-all delay-500 duration-1000 sm:mt-6 sm:text-base sm:leading-8 md:text-[17px] ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          We&apos;re starting with the game and the people who play it —
          bringing golfers together through rounds, competition, gatherings,
          and the traditions we&apos;ll build along the way.
        </p>

        <div
          className={`mt-8 flex w-full max-w-[440px] flex-col items-center justify-center gap-3 transition-all delay-[650ms] duration-1000 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
          }`}
        >
          <Link
            href="/play"
            className="group relative inline-flex min-h-[50px] w-full items-center justify-center overflow-hidden border border-[#FFD76A] bg-[#FFD76A] px-6 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#10263F] shadow-[0_16px_45px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-transparent hover:text-white sm:min-h-[52px] sm:w-auto sm:min-w-[235px] sm:px-8 sm:text-[10px] sm:tracking-[0.22em]"
          >
            <span className="relative z-10">
              Play With The Gallaspy
            </span>

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
            href="/why-the-gallaspy"
            className="group inline-flex min-h-[50px] w-full items-center justify-center border border-white/55 bg-[#10263F]/30 px-6 text-[9px] font-semibold uppercase tracking-[0.19em] text-white shadow-[0_16px_45px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#FFD76A] hover:bg-[#10263F]/65 hover:text-[#FFD76A] sm:min-h-[52px] sm:w-auto sm:min-w-[235px] sm:px-8 sm:text-[10px] sm:tracking-[0.22em]"
          >
            Our Story

            <span
              aria-hidden="true"
              className="ml-3 transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}