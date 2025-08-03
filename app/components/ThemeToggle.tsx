"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// SSR-safe mobile detection
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const Sparkle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={26} height={26} viewBox="0 0 22 22" fill="none" {...props}>
    <g filter="url(#sp1)">
      <path
        d="M11 2v18M2 11h18"
        stroke="#ffe4fc"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
    <defs>
      <filter id="sp1" x="0" y="0" width="22" height="22">
        <feGaussianBlur stdDeviation={0.82} result="blur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope={0.6} />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [blast, setBlast] = useState(false);

  // Mobile detect: restrict visual effects there
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
    setBlast(true);
    setTimeout(() => setBlast(false), 650);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={
        isMobile
          ? `fixed top-2 right-2 z-[100] p-2 w-10 h-10 rounded-full shadow bg-white/85 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800
             text-black dark:text-white transition
             focus:outline-none focus:ring-2 focus:ring-fuchsia-400`
          : `fixed top-4 right-4 z-[100] p-3 sm:p-3.5 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl bg-gradient-to-br from-fuchsia-200 via-indigo-200 to-yellow-100
             dark:from-[#2a1936] dark:via-[#090821] dark:to-[#33204c]
             text-black dark:text-white border-2 border-fuchsia-200/80 dark:border-indigo-700/60
             backdrop-blur-2xl group transition-all duration-[440ms] ease-[cubic-bezier(.21,1.25,.82,1.04)]
             hover:scale-110 hover:ring-4 hover:ring-fuchsia-200/60 dark:hover:ring-fuchsia-900/35
             active:scale-95 outline-none`
      }
      style={
        isMobile
          ? { boxShadow: "0 2px 16px -5px #d946ef21", overflow: "visible" }
          : {
              boxShadow: "0 7px 28px -8px #f472b6a0, 0 0 56px 2px #6366f12b",
              overflow: "visible",
            }
      }
    >
      {/* Sparkle burst when toggling (only on desktop/tablet, not on mobile) */}
      {!isMobile && blast && (
        <span className="absolute -top-4 -right-5 animate-sparkle-blast pointer-events-none select-none">
          <Sparkle className="opacity-90" />
        </span>
      )}
      {!isMobile && blast && (
        <span className="absolute left-0 -bottom-6 animate-[sparkleBlast2_0.7s]">
          <Sparkle className="opacity-50 rotate-45" />
        </span>
      )}
      {/* Icon with bounce/glow only on desktop/tablet */}
      <span
        className={
          "block transition-transform duration-400 " +
          (blast && !isMobile ? "animate-pop-bounce" : "")
        }
      >
        {isDark ? (
          <Sun
            className={
              isMobile
                ? "w-6 h-6 text-yellow-400"
                : "w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_12px_#fff7] text-yellow-400 animate-spin-sun"
            }
            strokeWidth={2}
          />
        ) : (
          <Moon
            className={
              isMobile
                ? "w-6 h-6 text-purple-600"
                : "w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_10px_#9f7aea90] text-purple-600 animate-twinkle-moon"
            }
            strokeWidth={2}
          />
        )}
      </span>
      {/* Extra background sparkles: only on desktop/tablet */}
      {!isMobile && (
        <>
          <span className="absolute left-0 bottom-0 opacity-25">
            <Sparkle style={{ width: 18, height: 18 }} />
          </span>
          <span className="absolute right-3 top-2 opacity-10">
            <Sparkle style={{ width: 12, height: 12 }} />
          </span>
        </>
      )}
      {/* Animation styles (scoped only for desktop/tablet) */}
      {!isMobile && (
        <style jsx>{`
          .animate-sparkle-blast {
            animation: sparkleBlast 0.62s cubic-bezier(0.79, 0.14, 0.15, 0.86) forwards;
          }
          @keyframes sparkleBlast {
            0% {
              opacity: 0.7;
              transform: scale(0.65) translateY(-8px) rotate(5deg);
            }
            45% {
              opacity: 1;
              transform: scale(1.1) translateY(0) rotate(-8deg);
            }
            100% {
              opacity: 0;
              transform: scale(1.5) translateY(-32px) rotate(20deg);
            }
          }
          @keyframes sparkleBlast2 {
            0% {
              opacity: 0.7;
              transform: scale(0.44) translateY(7px);
            }
            60% {
              opacity: 1;
              transform: scale(1.12) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scale(1.3) translateY(25px) rotate(-14deg);
            }
          }
          .animate-pop-bounce {
            animation: popBounce 0.52s cubic-bezier(0.29, 1.43, 0.54, 1.04) forwards;
          }
          @keyframes popBounce {
            0% {
              transform: scale(1.12) rotate(-7deg);
            }
            60% {
              transform: scale(1.25) rotate(14deg);
            }
            85% {
              transform: scale(0.96) rotate(-7deg);
            }
            100% {
              transform: scale(1) rotate(-2deg);
            }
          }
          .animate-spin-sun {
            animation: sunSpin 1.2s cubic-bezier(0.62, 0.05, 0.75, 0.96);
          }
          @keyframes sunSpin {
            0% {
              transform: scale(1.1) rotate(-10deg);
              filter: brightness(1.3) blur(2px);
            }
            50% {
              transform: scale(1.23) rotate(24deg);
              filter: brightness(1.6) blur(0px);
            }
            100% {
              transform: scale(1) rotate(0deg);
              filter: brightness(1) blur(0px);
            }
          }
          .animate-twinkle-moon {
            animation: moonTwinkle 1.32s linear;
          }
          @keyframes moonTwinkle {
            0% {
              filter: grayscale(0.2) brightness(1);
              opacity: 1;
              transform: scale(1) rotate(-15deg);
            }
            30% {
              filter: grayscale(0.5) brightness(1.25);
              opacity: 0.8;
              transform: scale(1.13) rotate(3deg);
            }
            70% {
              filter: grayscale(0) brightness(1.35);
              opacity: 1;
              transform: scale(0.98) rotate(-6deg);
            }
            100% {
              filter: grayscale(0.2) brightness(1);
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }
        `}</style>
      )}
    </button>
  );
}
