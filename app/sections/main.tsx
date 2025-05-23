'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function MainSection() {
  const [zap, setZap] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const triggerZap = () => {
    setZap(true);
    setTimeout(() => setZap(false), 400);
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
      className="w-full min-h-screen flex flex-col justify-center items-center 
                 px-4 sm:px-6 md:px-10 py-24 sm:py-28 text-center text-black dark:text-white
                 bg-gradient-to-br from-white via-gray-100 to-purple-100 
                 dark:from-black dark:via-zinc-900 dark:to-purple-950 
                 transition-all duration-500 overflow-hidden"
    >
      <ParticlesBackground />

      {/* 👾 Avatar with Zap */}
      <AvatarWrapper>
        <motion.div
          className={`relative transition-all duration-300 ${
            zap ? 'animate-[zap_0.4s_ease-in-out]' : ''
          }`}
          onClick={triggerZap}
          onMouseEnter={triggerZap}
          onMouseLeave={() => setZap(false)}
        >
          <motion.img
            src="/avatar.jpg"
            alt="Arshpreet Singh Avatar"
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full border-4 border-purple-500 
                       shadow-xl hover:scale-105 
                       hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.7)] 
                       dark:hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)] 
                       transition duration-500"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {zap && (
            <div className="absolute inset-0 rounded-full ring-4 ring-purple-400 dark:ring-pink-400 animate-ping pointer-events-none" />
          )}
        </motion.div>
      </AvatarWrapper>

      {/* 🌟 Name Heading */}
      <motion.h1
        className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold z-10 
                   bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 
                   bg-clip-text text-transparent 
                   hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.7)] 
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
        Web Developer • Open Source Contributor • Chess & Coding Enthusiast
      </motion.p>
    </section>
  );
}
