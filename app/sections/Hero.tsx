/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  memo,
  ReactNode,
  KeyboardEvent,
} from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import SocialBar from "../components/SocialBar";
import { useMediaQuery } from "react-responsive";

// --- Haptic Feedback (unchanged) ---
function triggerHaptic(): void {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(18);
  }
}

// --- Avatar Wrapper ---
interface AvatarWrapperProps {
  children: ReactNode;
}
const AvatarWrapper = memo(function AvatarWrapper({ children }: AvatarWrapperProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? (
    <div className="perspective-1000">{children}</div>
  ) : (
    <Tilt
      glareEnable
      glareMaxOpacity={0.2}
      scale={1.1}
      transitionSpeed={400}
      className="perspective-1000"
    >
      {children}
    </Tilt>
  );
});
AvatarWrapper.displayName = "AvatarWrapper";

// --- Main HeroSection ---
export default function HeroSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [bgSwap, setBgSwap] = useState(false);
  const [avatarMode, setAvatarMode] = useState<"fun" | "formal">("fun");
  const [mounted, setMounted] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const tossTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showParticles, setShowParticles] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Only set state after mount & check reduced motion
  useEffect(() => {
    setMounted(true);
    try {
      const stored = window?.localStorage?.getItem?.("avatarMode");
      if (stored === "formal" || stored === "fun") setAvatarMode(stored as "fun" | "formal");
    } catch {}
    if (typeof window !== "undefined" && window?.matchMedia) {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Only show particles if not mobile and not reduced motion
    setShowParticles(!isMobile && !prefersReducedMotion);
  }, [isMobile, prefersReducedMotion, mounted]);

  useEffect(() => {
    return () => {
      if (tossTimeoutRef.current) clearTimeout(tossTimeoutRef.current);
    };
  }, []);

  const triggerToss = () => {
    if (spin || !canSpin) return;
    setZap(true);
    setSpin(true);
    setBgSwap(true);
    setCanSpin(false);
    triggerHaptic();
    tossTimeoutRef.current = setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
      setCanSpin(true);
    }, prefersReducedMotion ? 600 : 1500 + Math.random() * 500);
  };

  const toggleAvatarMode = () => {
    const newMode: "fun" | "formal" = avatarMode === "fun" ? "formal" : "fun";
    setAvatarMode(newMode);
    try {
      window?.localStorage?.setItem?.("avatarMode", newMode);
    } catch {}
  };

  const currentImage =
    avatarMode === "fun"
      ? spin
        ? "/back-avatar.jpg"
        : "/avatar.jpg"
      : spin
      ? "/back-avatar-formal.jpg"
      : "/avatar-formal.jpg";

  const modeIcon = avatarMode === "fun" ? "👔" : "😄";
  const modeLabel = avatarMode === "fun"
    ? "Switch to Formal Mode"
    : "Switch to Fun Mode";

  const gradientClass = bgSwap
    ? "bg-gradient-to-br from-yellow-100 via-white to-blue-100 dark:from-yellow-900 dark:via-black dark:to-indigo-900"
    : "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950";

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex flex-col justify-center items-center
        px-4 sm:px-6 md:px-10 py-24 sm:py-28 text-center text-black dark:text-white
        transition-all duration-500 overflow-hidden ${gradientClass}`}
      style={{
        paddingBottom: isMobile
          ? "env(safe-area-inset-bottom, 24px)"
          : undefined,
      }}
    >
      {/* Particle Background: desktop only, disables on mobile/reduced motion  */}
      {mounted && showParticles && (() => {
        // Lazy-load only if needed to avoid impact on mobile bundles 
        const LazyParticles = React.lazy(() => import("../components/ParticlesBackground"));
        return (
          <React.Suspense fallback={null}>
            <LazyParticles />
          </React.Suspense>
        );
      })()}

      <div
        className="absolute left-6 z-20"
        style={{
          bottom: isMobile
            ? "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))"
            : "1.5rem",
        }}
      >
        <SocialBar />
      </div>

      {/* Avatar Mode Toggle */}
      <button
        onClick={toggleAvatarMode}
        type="button"
        className="absolute top-6 right-6 flex items-center gap-2 text-xs sm:text-sm px-3 py-1 rounded-full z-20
          bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20
          border border-gray-400 dark:border-gray-600 text-black dark:text-white
          transition duration-300 shadow backdrop-blur"
        aria-pressed={avatarMode === "formal"}
        aria-label={modeLabel}
        role="switch"
        aria-checked={avatarMode === "formal"}
        tabIndex={0}
      >
        <span aria-hidden="true" className="text-lg">{modeIcon}</span>
        {modeLabel}
      </button>

      {/* Coin Toss Avatar */}
      {mounted && (
        <AvatarWrapper>
          <motion.button
            type="button"
            className="relative cursor-pointer border-6 border-gradient-gold-silver shadow-xl rounded-full outline-none
            focus-visible:ring-4 focus-visible:ring-purple-400 min-w-[120px] min-h-[120px] w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"
            onClick={triggerToss}
            onMouseEnter={() => !isMobile && setZap(true)}
            onMouseLeave={() => !spin && setZap(false)}
            aria-label="Tap or press Enter to animate avatar"
            aria-describedby="avatar-action-desc"
            disabled={!canSpin}
            role="button"
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
              if ((e.key === "Enter" || e.key === " ") && canSpin) {
                e.preventDefault();
                triggerToss();
              }
            }}
            style={{
              perspective: 1000,
              WebkitTapHighlightColor: "transparent",
              pointerEvents: canSpin ? "auto" : "none",
            }}
          >
            <span id="avatar-action-desc" className="sr-only">
              Tap or press Enter/Space to animate avatar. Animation has sound and haptic feedback on supported devices.
            </span>
            <motion.div
              className="w-full h-full rounded-full overflow-hidden"
              animate={
                spin && !prefersReducedMotion
                  ? {
                      rotateY: [0, 360 + Math.floor(Math.random() * 60), 720 + Math.floor(Math.random() * 180)],
                      y: [-20, -180, 0],
                    }
                  : {}
              }
              transition={{
                duration: prefersReducedMotion ? 0.6 : 1.5,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={currentImage}
                alt="Avatar of Arshpreet Singh"
                fill
                sizes="(max-width:450px) 120px, (max-width:768px) 160px, (max-width:1024px) 208px, 256px"
                quality={isMobile ? 50 : 90}
                priority
                draggable={false}
                title="Avatar of Arshpreet Singh"
              />
            </motion.div>
            {zap && (
              <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 dark:ring-pink-400 pointer-events-none animate-ping" />
            )}
            {spin && !prefersReducedMotion && (
              <motion.div
                className="absolute -inset-[3px] rounded-full border-2 border-purple-300 dark:border-pink-400 opacity-40 pointer-events-none"
                animate={{
                  scale: [1, 1.14, 1],
                  opacity: [0.22, 0.45, 0.22],
                }}
                transition={{ repeat: 2, duration: 1, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        </AvatarWrapper>
      )}

      <motion.h1
        className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold z-10
          bg-[linear-gradient(90deg,#FFD700,#C0C0C0,#FFD700)]
          bg-[length:200%_auto] bg-clip-text text-transparent
          animate-gradient-shine
          hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]
          transition duration-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ willChange: "transform, opacity" }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      <motion.p
        className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl z-10
          text-black/80 dark:text-white/90
          hover:text-purple-600 dark:hover:text-purple-300
          transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ willChange: "opacity" }}
      >
        • Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess &amp; Coding Enthusiast
      </motion.p>
    </section>
  );
}
