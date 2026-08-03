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
import usePortfolioMode from "../hooks/usePortfolioMode";

// Dynamic imports (no SSR)
const ParticlesBackground = dynamic(() => import("../components/ParticlesBackground"), { ssr: false });
const SocialBar = dynamic(() => import("../components/SocialBar"), { ssr: false });

type TimeoutRef = ReturnType<typeof setTimeout> | null;

// Haptic feedback for mobile devices
function triggerHaptic(): void {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate?.(20);
  }
}

// Memoized Wrapper for Avatar, disables Tilt for mobile & formal mode
interface AvatarWrapperProps {
  children: ReactNode;
  isFormal: boolean;
}
const AvatarWrapper = memo(({ children, isFormal }: AvatarWrapperProps) => {
  const isMobile = useIsMobile();
  if (isMobile || isFormal) {
    return <div className="perspective-1000">{children}</div>;
  }
  return (
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
const getAvatarVariants = (isMobile: boolean, isFormal: boolean) => ({
  spin: isFormal ? {} : {
    rotateY: [0, 360],
    y: [0, isMobile ? -60 : -100, 0],
    transition: { duration: isMobile ? 0.9 : 1.5, ease: easeInOut },
  },
  idle: {},
});

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
  
  const mode = usePortfolioMode();
  const isFormal = mode === "formal";

  // Battery & capability check
  useEffect(() => {
    setIsClient(true);

    const batteryHandler = (
      battery?: { level: number; dischargingTime: number }
    ) => {
      if (
        isMobile ||
        prefersReducedMotion ||
        isFormal || // Disable particles in formal mode
        (battery && battery.level < 0.15 && battery.dischargingTime !== Infinity)
      ) {
        setShowParticles(false);
      } else {
        setShowParticles(true);
      }
    };
    try {
      const nav = window.navigator as Navigator & {
        getBattery?: () => Promise<{ level: number; dischargingTime: number }>;
      };
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
  }, [isMobile, prefersReducedMotion, isFormal]);

  // Avatar click/tap animation logic
  const triggerToss = () => {
    if (spin || !canAnimate || isFormal) return; // Disable toss in formal mode
    setZap(true);
    setSpin(true);
    setBgSwap(true);
    setCanAnimate(false);
    triggerHaptic();
    tossTimeoutRef.current = setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
      setCanAnimate(true);
    }, isMobile ? 900 : 1500);
  };

  const avatarVariants = getAvatarVariants(isMobile, isFormal);

  // Background styling
  const sectionBg = isFormal
    ? "bg-white dark:bg-[#0A0A0A]"
    : bgSwap
      ? isMobile
        ? "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-200 dark:from-indigo-950 dark:via-zinc-950 dark:to-purple-950"
        : "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-200 dark:from-indigo-900 dark:via-zinc-950 dark:to-purple-900"
      : isMobile
        ? "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-950 dark:to-purple-950"
        : "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950";

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-24 pb-32 text-center transition-all duration-500 text-black dark:text-white ${sectionBg}`}
    >
      {/* Animated background only on fun mode + desktop/tablet */}
      {isClient && showParticles && !isFormal && <ParticlesBackground />}

      {/* Social bar */}
      <div
        className={`absolute z-20 ${
          isMobile
            ? "left-2 bottom-[max(1.1rem,env(safe-area-inset-bottom,1.1rem))]"
            : "left-6 bottom-6"
        }`}
      >
        <SocialBar />
      </div>

      {/* Interactive Avatar */}
      {isClient && (
        <AvatarWrapper isFormal={isFormal}>
          <motion.button
            className={`relative rounded-full focus:outline-none transition-all duration-300
            ${isFormal 
              ? "border-2 border-black dark:border-zinc-800 cursor-default shadow-none grayscale hover:grayscale-0" 
              : `cursor-pointer border-4 border-violet-400 focus:ring-4 focus:ring-violet-300 ${isMobile ? "shadow-lg" : "shadow-2xl"}`
            }
            min-w-[56px] min-h-[56px] sm:min-w-[80px] sm:min-h-[80px] md:min-w-[110px] md:min-h-[110px]`}
            style={{
              transformStyle: "preserve-3d",
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={triggerToss}
            onMouseEnter={() => !isMobile && !isFormal && setZap(true)}
            onMouseLeave={() => !spin && setZap(false)}
            aria-label="Profile Avatar"
            aria-pressed={spin}
            type="button"
            disabled={!canAnimate || isFormal}
            tabIndex={isFormal ? -1 : 0}
          >
            <motion.div
              variants={avatarVariants}
              animate={spin && !prefersReducedMotion ? "spin" : "idle"}
            >
              <Image
                src={isFormal ? "/avatar-formal.jpg" : "/avatar.jpg"}
                alt="Avatar of Arshpreet Singh"
                width={isMobile ? 120 : 256}
                height={isMobile ? 120 : 256}
                priority
                quality={isMobile ? 50 : 90}
                sizes="(max-width: 640px) 120px, (max-width: 768px) 176px, 256px"
                className={`rounded-full pointer-events-none select-none ${
                  isMobile
                    ? "w-28 h-28"
                    : "w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"
                }`}
                draggable={false}
              />
            </motion.div>
            
            {/* Fun Mode Effects */}
            {zap && !prefersReducedMotion && !isFormal && (
              <motion.div
                className="absolute inset-0 rounded-full ring-2 ring-purple-300 z-10 pointer-events-none"
                initial={{ opacity: 0.4, scale: 0.95 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: isMobile ? 0.7 : 1 }}
              />
            )}
            {!prefersReducedMotion && !isMobile && !isFormal && (
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
        className={`mt-10 z-10 transition-all duration-300 ${
          isFormal
            ? "text-3xl sm:text-4xl md:text-5xl font-mono font-bold uppercase tracking-tight"
            : "text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 bg-clip-text text-transparent tracking-wide"
        }`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className={`mt-4 max-w-2xl z-10 transition duration-300 ${
          isFormal
            ? "text-xs sm:text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest"
            : "text-base sm:text-lg md:text-xl text-black/80 dark:text-white/90 hover:text-violet-500 dark:hover:text-violet-400"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {isFormal
          ? "> SOFTWARE_ENGINEER | LOW_LATENCY_SYSTEMS | QUANTITATIVE_DEV"
          : "• Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess & Coding Enthusiast"
        }
      </motion.p>
    </section>
  );
}