"use client";

import {
  useState,
  useEffect,
  useRef,
  memo,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, easeInOut } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";

// Dynamic imports (no SSR)
const ParticlesBackground = dynamic(() => import("../components/ParticlesBackground"), { ssr: false });
const SocialBar = dynamic(() => import("../components/SocialBar"), { ssr: false });

// setTimeout ref (number in browser, NodeJS.Timeout in node, both valid for client code)
type TimeoutRef = number | null;

// Haptic feedback for mobile devices
function triggerHaptic() {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate?.(20);
  }
}

// Memoized Wrapper for Avatar, disables Tilt for mobile
interface AvatarWrapperProps {
  children: ReactNode;
}
const AvatarWrapper = memo(({ children }: AvatarWrapperProps) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className="perspective-1000">{children}</div>
  ) : (
    <Tilt
      glareEnable
      glareMaxOpacity={0.2}
      scale={1.05}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      transitionSpeed={500}
      className="perspective-1000"
    >
      {children}
    </Tilt>
  );
});
AvatarWrapper.displayName = "AvatarWrapper";

// Framer motion variants
const avatarVariants = {
  spin: {
    rotateY: [0, 360],
    y: [0, -100, 0],
    transition: { duration: 1.5, ease: easeInOut },
  },
  idle: {},
};

export default function MainSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [bgSwap, setBgSwap] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const tossTimeoutRef = useRef<TimeoutRef>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // TypeScript: battery API is not standard everywhere, so we extend Navigator type
  type NavigatorWithBattery = Navigator & {
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
      dischargingTime: number;
    }>;
  };

  useEffect(() => {
    setIsClient(true);

    // Handle battery and reduced motion for particles
    const batteryHandler = (battery?: { level: number; dischargingTime: number }) => {
      if (
        isMobile ||
        prefersReducedMotion ||
        (battery && battery.level < 0.15 && battery.dischargingTime !== Infinity)
      ) {
        setShowParticles(false);
      }
    };
    try {
      const nav = window.navigator as NavigatorWithBattery;
      if (nav.getBattery) {
        nav.getBattery().then(batteryHandler);
      } else {
        batteryHandler();
      }
    } catch {
      batteryHandler();
    }
    return () => {
      if (tossTimeoutRef.current) clearTimeout(tossTimeoutRef.current);
    };
  }, [isMobile, prefersReducedMotion]);

  // Avatar click/tap animation logic
  const triggerToss = () => {
    if (spin || !canAnimate) return;
    setZap(true);
    setSpin(true);
    setBgSwap(true);
    setCanAnimate(false);
    triggerHaptic();
    tossTimeoutRef.current = window.setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
      setCanAnimate(true);
    }, 1500);
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-24 pb-32 text-center transition-all duration-500 text-black dark:text-white ${
        bgSwap
          ? "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-200 dark:from-indigo-900 dark:via-zinc-950 dark:to-purple-900"
          : "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950"
      }`}
    >
      {/* Show animated background only under right conditions */}
      {isClient && showParticles && !prefersReducedMotion && !isMobile && <ParticlesBackground />}

      {/* Social bar with safe positioning */}
      <div className="absolute bottom-6 left-6 z-20 md:bottom-6 md:left-6 sm:left-2 sm:bottom-2">
        <SocialBar />
      </div>

      {/* Interactive Avatar */}
      {isClient && (
        <AvatarWrapper>
          <motion.button
            className="relative cursor-pointer rounded-full border-4 border-violet-400 shadow-2xl w-fit focus:ring-4 focus:ring-violet-300 transition-none
             min-w-[56px] min-h-[56px] sm:min-w-[80px] sm:min-h-[80px] md:min-w-[110px] md:min-h-[110px]"
            style={{
              transformStyle: "preserve-3d",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={triggerToss}
            onMouseEnter={() => !isMobile && setZap(true)}
            onMouseLeave={() => !spin && setZap(false)}
            aria-label="Activate animated avatar"
            aria-pressed={spin}
            aria-describedby="avatar-action-desc"
            type="button"
            disabled={!canAnimate}
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
              if ((e.key === "Enter" || e.key === " ") && canAnimate) {
                e.preventDefault();
                triggerToss();
              }
            }}
          >
            <span id="avatar-action-desc" className="sr-only">
              Click, tap, or press Enter/Space to see animation.
            </span>
            <motion.div variants={avatarVariants} animate={spin && !prefersReducedMotion ? "spin" : "idle"}>
              <Image
                src="/avatar.jpg"
                alt="Avatar of Arshpreet Singh"
                width={256}
                height={256}
                priority
                quality={isMobile ? 60 : 90}
                sizes="(max-width: 640px) 120px, (max-width: 768px) 176px, 256px"
                className="rounded-full pointer-events-none select-none w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"
                draggable={false}
              />
            </motion.div>
            {zap && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full ring-3 ring-purple-400 z-10 pointer-events-none"
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 0, scale: 1.6 }}
                transition={{ duration: 1 }}
              />
            )}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-2xl opacity-25 z-0 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        </AvatarWrapper>
      )}

      {/* Headline */}
      <motion.h1
        className="mt-10 text-3xl sm:text-4xl md:text-5xl font-extrabold z-10 bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 bg-clip-text text-transparent tracking-wide transition duration-300"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl z-10 text-black/80 dark:text-white/90 hover:text-violet-500 dark:hover:text-violet-400 transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        • Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess &amp; Coding Enthusiast
      </motion.p>
    </section>
  );
}
