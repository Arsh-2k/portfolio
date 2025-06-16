"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";
import SocialBar from "../components/SocialBar";
import { useMediaQuery } from "react-responsive";

// 🧠 Memoized Tilt Avatar Container
const AvatarWrapper = memo(({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? (
    <div>{children}</div>
  ) : (
    <Tilt glareEnable glareMaxOpacity={0.2} scale={1.1} transitionSpeed={400}>
      {children}
    </Tilt>
  );
});
AvatarWrapper.displayName = "AvatarWrapper";

export default function HeroSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [bgSwap, setBgSwap] = useState(false);
  const [avatarMode, setAvatarMode] = useState<"fun" | "formal">("fun");
  const [mounted, setMounted] = useState(false);

  // ✅ Persistent avatar mode & prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("avatarMode");
    if (stored === "formal" || stored === "fun") {
      setAvatarMode(stored as "fun" | "formal");
    }
  }, []);

  const triggerToss = () => {
    if (spin) return;
    setZap(true);
    setSpin(true);
    setBgSwap(true);
    setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
    }, 1500 + Math.random() * 500);
  };

  const toggleAvatarMode = () => {
    const newMode = avatarMode === "fun" ? "formal" : "fun";
    setAvatarMode(newMode);
    localStorage.setItem("avatarMode", newMode);
  };

  const currentImage =
    avatarMode === "fun"
      ? spin
        ? "/back-avatar.jpg"
        : "/avatar.jpg"
      : spin
      ? "/back-avatar-formal.jpg"
      : "/avatar-formal.jpg";

  const gradientClass = bgSwap
    ? "bg-gradient-to-br from-yellow-100 via-white to-blue-100 dark:from-yellow-900 dark:via-black dark:to-indigo-900"
    : "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950";

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex flex-col justify-center items-center
      px-4 sm:px-6 md:px-10 py-24 sm:py-28 text-center text-black dark:text-white
      transition-all duration-500 overflow-hidden ${gradientClass}`}
    >
      {/* ✨ Particle Background */}
      {mounted && <ParticlesBackground />}

      {/* 💫 Social Bar */}
      <div className="absolute bottom-6 left-6 z-20">
        <SocialBar />
      </div>

      {/* 🎛 Avatar Mode Toggle */}
      <button
        onClick={toggleAvatarMode}
        className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full z-20
        bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20
        border border-gray-400 dark:border-gray-600 text-black dark:text-white
        transition duration-300"
      >
        {avatarMode === "fun" ? "Switch to Formal Mode" : "Switch to Fun Mode"}
      </button>

      {/* 🌀 Coin Toss Avatar */}
      {mounted && (
        <AvatarWrapper>
          <div
            className="relative cursor-pointer border-[6px] border-gradient-gold-silver shadow-xl rounded-full"
            onClick={triggerToss}
            onMouseEnter={() => setZap(true)}
            onMouseLeave={() => setZap(false)}
            style={{ perspective: 1000 }}
            aria-label="Click to toss avatar"
          >
            <motion.div
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden"
              animate={
                spin
                  ? {
                      rotateY: [0, 360, 720 + Math.floor(Math.random() * 360)],
                      y: [-20, -200, 0],
                    }
                  : {}
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={currentImage}
                alt="Arshpreet Singh Avatar"
                layout="fill"
                objectFit="cover"
                priority
                draggable={false}
              />
            </motion.div>
            {zap && (
              <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 dark:ring-pink-400 animate-ping pointer-events-none" />
            )}
          </div>
        </AvatarWrapper>
      )}

      {/* 🧑‍🚀 Name Heading */}
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

      {/* 🎯 Subtitle */}
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
        • Programming - Level 1 • Web Developer - Level 1 • Open Source
        Contributor - Level 1 • Chess & Coding Enthusiast
      </motion.p>
    </section>
  );
}
