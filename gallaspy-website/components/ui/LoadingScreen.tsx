"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    const checkSession = window.setTimeout(() => {
      const hasEntered = sessionStorage.getItem("gallaspy-site-entered");

      if (!hasEntered) {
        setIsVisible(true);
        document.body.style.overflow = "hidden";
      }

      setHasCheckedSession(true);
    }, 0);

    return () => {
      window.clearTimeout(checkSession);
      document.body.style.overflow = "";
    };
  }, []);

  const enterSite = () => {
    if (isExiting) return;

    setIsExiting(true);

    window.setTimeout(() => {
      sessionStorage.setItem("gallaspy-site-entered", "true");
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 1800);
  };

  if (!hasCheckedSession || !isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enter The Gallaspy Golf Club website"
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#10263F] transition-all duration-[1800ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        isExiting
          ? "pointer-events-none scale-[1.035] opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      <Image
        src="/images/home-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className={`object-cover object-center transition-all duration-[2200ms] ease-out ${
          isExiting ? "scale-100 opacity-60" : "scale-105 opacity-24"
        }`}
      />

      <div
        className={`absolute inset-0 bg-[#10263F] transition-opacity duration-[1800ms] ease-in-out ${
          isExiting ? "opacity-30" : "opacity-78"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#10263F]/70 via-[#10263F]/50 to-[#08192B]/92" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,106,0.12),transparent_42%)]" />

      <div className="entrance-frame absolute inset-4 border border-[#FFD76A]/20 sm:inset-7" />

      <span className="entrance-corner absolute left-4 top-4 h-16 w-px bg-gradient-to-b from-[#FFD76A]/80 to-transparent sm:left-7 sm:top-7" />
      <span className="entrance-corner absolute left-4 top-4 h-px w-16 bg-gradient-to-r from-[#FFD76A]/80 to-transparent sm:left-7 sm:top-7" />

      <span className="entrance-corner absolute right-4 top-4 h-16 w-px bg-gradient-to-b from-[#FFD76A]/80 to-transparent sm:right-7 sm:top-7" />
      <span className="entrance-corner absolute right-4 top-4 h-px w-16 bg-gradient-to-l from-[#FFD76A]/80 to-transparent sm:right-7 sm:top-7" />

      <span className="entrance-corner absolute bottom-4 left-4 h-16 w-px bg-gradient-to-t from-[#FFD76A]/80 to-transparent sm:bottom-7 sm:left-7" />
      <span className="entrance-corner absolute bottom-4 left-4 h-px w-16 bg-gradient-to-r from-[#FFD76A]/80 to-transparent sm:bottom-7 sm:left-7" />

      <span className="entrance-corner absolute bottom-4 right-4 h-16 w-px bg-gradient-to-t from-[#FFD76A]/80 to-transparent sm:bottom-7 sm:right-7" />
      <span className="entrance-corner absolute bottom-4 right-4 h-px w-16 bg-gradient-to-l from-[#FFD76A]/80 to-transparent sm:bottom-7 sm:right-7" />

      <div
        className={`relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center transition-all duration-[1200ms] ${
          isExiting
            ? "-translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="entrance-crest-wrap relative">
          <div className="crest-glow absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD76A]/12 blur-3xl sm:h-56 sm:w-56" />

          <div className="entrance-crest relative h-36 w-36 sm:h-44 sm:w-44">
            <Image
              src="/logos/falcon.png"
              alt="The Gallaspy Falcon"
              fill
              priority
              sizes="176px"
              className="object-contain"
            />
          </div>
        </div>

        <p className="entrance-location mt-5 text-[8px] font-semibold uppercase tracking-[0.36em] text-[#FFD76A] sm:text-[9px]">
          Georgia · Est. 2026
        </p>

        <h1 className="entrance-title mt-5 font-serif text-4xl font-light leading-none text-white sm:text-5xl md:text-6xl">
          The Gallaspy
        </h1>

        <p className="entrance-subtitle mt-3 font-serif text-lg font-light tracking-[0.05em] text-white sm:text-2xl">
          Golf Club
        </p>

        <div className="entrance-line mt-7 h-px bg-[#FFD76A]" />

        <p className="entrance-values mt-6 text-[9px] font-semibold uppercase tracking-[0.32em] text-white sm:text-[10px]">
          Play · Compete · Gather
        </p>

        <p className="entrance-legacy mt-4 font-serif text-sm italic tracking-[0.04em] text-white/70 sm:text-base">
          A golf club being built through the game.
        </p>

        <button
          type="button"
          onClick={enterSite}
          className="entrance-button group relative mt-10 inline-flex min-h-12 items-center justify-center overflow-hidden border border-[#FFD76A] bg-[#FFD76A] px-9 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#10263F] transition-all duration-500 hover:-translate-y-1 hover:bg-transparent hover:text-white hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-[#FFD76A] focus:ring-offset-4 focus:ring-offset-[#10263F]"
        >
          <span className="relative z-10">Enter</span>

          <span
            aria-hidden="true"
            className="relative z-10 ml-3 transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>

          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-0"
          />
        </button>
      </div>

      <div className="entrance-footer absolute inset-x-0 bottom-10 z-10 flex w-full justify-center px-8">
        <p className="w-full text-center text-[8px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[9px]">
          The Club Starts With The People
        </p>
      </div>

      <style jsx>{`
        .entrance-frame,
        .entrance-corner {
          animation: frameFade 1.8s ease-out 0.2s both;
        }

        .entrance-crest-wrap {
          animation: crestReveal 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }

        .entrance-location {
          animation: contentReveal 1.1s ease-out 1.15s both;
        }

        .entrance-title {
          animation: contentReveal 1.2s ease-out 1.45s both;
        }

        .entrance-subtitle {
          animation: contentReveal 1.2s ease-out 1.7s both;
        }

        .entrance-line {
          width: 5rem;
          animation: lineReveal 1.1s ease-out 2.05s both;
        }

        .entrance-values {
          animation: contentReveal 1.1s ease-out 2.35s both;
        }

        .entrance-legacy {
          animation: contentReveal 1.1s ease-out 2.6s both;
        }

        .entrance-button {
          animation: buttonReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) 2.95s both;
        }

        .entrance-footer {
          animation: footerReveal 1.2s ease-out 3.3s both;
        }

        @keyframes frameFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes crestReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineReveal {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 5rem;
            opacity: 1;
          }
        }

        @keyframes buttonReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes footerReveal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
