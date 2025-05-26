'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import { useMediaQuery } from 'react-responsive';

export default function HeroSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [bgSwap, setBgSwap] = useState(false); // Optional toggle

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const triggerToss = () => {
    if (spin) return;

    setZap(true);
    setSpin(true);
    setBgSwap(true);

    setTimeout(() => {
      setZap(false);
      setSpin(false);
      setBgSwap(false);
    }, 1500);
  };

  const AvatarWrapper = ({ children }: { children: React.ReactNode }) =>
    isMobile ? <div>{children}</div> : (
      <Tilt glareEnable glareMaxOpacity={0.2} scale={1.1} transitionSpeed={400}>
        {children}
      </Tilt>
    );

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex flex-col justify-center items-center
      px-4 sm:px-6 md:px-10 py-24 sm:py-28 text-center text-black dark:text-white
      transition-all duration-500 overflow-hidden
      ${
        bgSwap
          ? 'bg-gradient-to-br from-yellow-100 via-white to-blue-100 dark:from-yellow-900 dark:via-black dark:to-indigo-900'
          : 'bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950'
      }`}
    >
      {isClient && <ParticlesBackground />}

      {/* 🎯 Coin Toss Avatar */}
      {isClient && (
        <AvatarWrapper>
          <motion.div
            className={`relative cursor-pointer transition-all duration-300 rounded-full border-[6px]
            ${spin ? '' : 'animate-spin-slow'}
            border-gradient-gold-silver shadow-xl`}
            onClick={triggerToss}
            onMouseEnter={() => setZap(true)}
            onMouseLeave={() => setZap(false)}
          >
            <motion.img
              src={spin ? '/back-avatar.jpg' : '/avatar.jpg'}
              alt="Arshpreet Singh Avatar"
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full pointer-events-none select-none"
              animate={spin ? { y: [-20, -200, 0], rotateY: [0, 360, 720] } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            {zap && (
              <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 dark:ring-pink-400 animate-ping pointer-events-none" />
            )}
          </motion.div>
        </AvatarWrapper>
      )}

      {/* ✨ Name Heading */}
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
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      {/* 🧠 Subtitle */}
      <motion.p
        className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl z-10
        text-black/80 dark:text-white/90
        hover:text-purple-600 dark:hover:text-purple-300
        transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        • Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess & Coding Enthusiast
      </motion.p>
    </section>
  );
}
