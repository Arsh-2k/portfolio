'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import { useState } from 'react';

export default function MainSection() {
  const [zap, setZap] = useState(false);

  const triggerZap = () => {
    setZap(true);
    setTimeout(() => setZap(false), 400); // ⚡ Zap duration control
  };

  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col justify-center items-center 
      px-6 py-20 text-center text-black dark:text-white
      bg-gradient-to-br from-white via-gray-100 to-purple-100 
      dark:from-black dark:via-zinc-900 dark:to-purple-950 
      transition-all duration-500 overflow-hidden"
    >
      {/* 🧬 Particles */}
      <ParticlesBackground />

      {/* 👾 Avatar with Zap Animation */}
      <Tilt glareEnable glareMaxOpacity={0.2} scale={1.1} transitionSpeed={400}>
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
            className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-purple-500 
            shadow-xl transition duration-500 hover:scale-105 
            hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.7)] 
            dark:hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* ⚡ Zap ring effect */}
          <div
            className={`absolute inset-0 rounded-full pointer-events-none ${
              zap ? 'ring-4 ring-purple-400 dark:ring-pink-400 animate-ping' : ''
            }`}
          />
        </motion.div>
      </Tilt>

      {/* 🌟 Name with Glow */}
      <motion.h1
        className="mt-8 text-5xl md:text-6xl font-extrabold z-10 
        bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent 
        hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.7)] transition duration-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      {/* 🧠 Subtitle */}
      <motion.p
        className="mt-4 text-lg md:text-xl max-w-2xl z-10 
        text-black/80 dark:text-white/90 
        hover:text-purple-600 dark:hover:text-purple-300 transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Web Developer • Open Source Contributor • Chess & Coding Enthusiast
      </motion.p>
    </section>
  );
}
