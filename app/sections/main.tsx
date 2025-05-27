'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import SocialBar from '../components/SocialBar';
import { useMediaQuery } from 'react-responsive';

const AvatarWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? (
    <div>{children}</div>
  ) : (
    <Tilt glareEnable glareMaxOpacity={0.2} scale={1.1} transitionSpeed={400}>
      {children}
    </Tilt>
  );
};

export default function MainSection() {
  const [zap, setZap] = useState(false);
  const [spin, setSpin] = useState(false);
  const [bgSwap, setBgSwap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
    }, 1500);
  };

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex flex-col justify-center items-center
        px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 pb-32 text-center
        text-black dark:text-white transition-all duration-500
        ${
          bgSwap
            ? 'bg-gradient-to-br from-yellow-100 via-white to-blue-100 dark:from-yellow-900 dark:via-black dark:to-indigo-900'
            : 'bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950'
        }`}
    >
      {isClient && <ParticlesBackground />}

      {/* 💫 Social Bar */}
      <div className="absolute bottom-6 left-6 z-20">
        <SocialBar />
      </div>

      {/* 🪙 Avatar Coin Toss */}
      {isClient && (
        <AvatarWrapper>
          <motion.div
            className={`relative cursor-pointer transition-all duration-300
              rounded-full border-[6px] shadow-xl
              ${spin ? '' : 'animate-spin-slow'}
              border-gradient-gold-silver`}
            onClick={triggerToss}
            onMouseEnter={() => setZap(true)}
            onMouseLeave={() => setZap(false)}
          >
            <motion.img
              src="/avatar.jpg"
              alt="Arshpreet Singh Avatar"
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64
                rounded-full pointer-events-none select-none"
              animate={
                spin
                  ? {
                      y: [-20, -200, 0],
                      rotateY: [0, 360, 720],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}
            />
            {zap && (
              <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 dark:ring-pink-400 animate-ping pointer-events-none" />
            )}
          </motion.div>
        </AvatarWrapper>
      )}

      {/* 🎯 Heading */}
      <motion.h1
        className="mt-8 text-3xl sm:text-4xl md:text-5xl font-extrabold z-10
          bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500
          bg-clip-text text-transparent
          hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]
          transition duration-300
          leading-snug tracking-wide whitespace-normal break-words pb-2 overflow-visible"
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
        • Programming - Level 1 • Web Developer - Level 1 • Open Source Contributor - Level 1 • Chess &amp; Coding Enthusiast
      </motion.p>
    </section>
  );
}
