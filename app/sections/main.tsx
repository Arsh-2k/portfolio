"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ParticlesBackground from "../components/ParticlesBackground";
import SocialBar from "../components/SocialBar";
import useIsMobile from "../hooks/useIsMobile";

// Tilt wrapper — desktop gets parallax tilt, mobile gets static container
const AvatarWrapper = memo(({ children }: { children: React.ReactNode }) => {
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

// Toss animation for avatar
const avatarVariants = {
  spin: {
    rotateY: [0, 360],
    y: [0, -100, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  idle: {},
};

export default function MainSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [bgSwap, setBgSwap] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const tossTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);

    return () => {
      if (tossTimeoutRef.current) {
        clearTimeout(tossTimeoutRef.current);
      }
    };
  }, []);

  const triggerToss = () => {
    if (spin) return;
    setZap(true);
    setSpin(true);
    setBgSwap(true);

    tossTimeoutRef.current = setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
    }, 1500);
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center
        px-6 md:px-10 pt-24 pb-32 text-center transition-all duration-500
        text-black dark:text-white
        ${
          bgSwap
            ? "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-200 dark:from-indigo-900 dark:via-zinc-950 dark:to-purple-900"
            : "bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950"
        }`}
    >
      {/* Particle background */}
      {isClient && <ParticlesBackground />}

      {/* Social icons (fixed position) */}
      <div className="absolute bottom-6 left-6 z-20">
        <SocialBar />
      </div>

      {/* Avatar (tossable) */}
      {isClient && (
        <AvatarWrapper>
          <motion.div
            className="relative cursor-pointer rounded-full border-[4px] border-violet-400 shadow-2xl w-fit"
            style={{ transformStyle: "preserve-3d" }}
            onClick={triggerToss}
            onMouseEnter={() => setZap(true)}
            onMouseLeave={() => !spin && setZap(false)}
          >
            <motion.img
              src="/avatar.jpg"
              alt="Avatar"
              loading="lazy"
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full pointer-events-none select-none"
              variants={avatarVariants}
              animate={spin ? "spin" : "idle"}
            />

            {/* Zap ring animation */}
            {zap && (
              <motion.div
                className="absolute inset-0 rounded-full ring-[3px] ring-purple-400 z-10 pointer-events-none"
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 0, scale: 1.6 }}
                transition={{ duration: 1 }}
              />
            )}

            {/* Aura effect (infinite pulse) */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-2xl opacity-25 z-0 pointer-events-none"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </AvatarWrapper>
      )}

      {/* Title */}
      <motion.h1
        className="mt-10 text-3xl sm:text-4xl md:text-5xl font-extrabold z-10
          bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500
          bg-clip-text text-transparent tracking-wide transition duration-300"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl z-10
          text-black/80 dark:text-white/90 hover:text-violet-500 dark:hover:text-violet-400
          transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        • Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess &amp; Coding Enthusiast
      </motion.p>
    </section>
  );
}
