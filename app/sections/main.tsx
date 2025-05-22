'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import { useState } from 'react';

export default function MainSection() {
  const [zap, setZap] = useState(false);

  const triggerZap = () => {
    setZap(true);
    setTimeout(() => setZap(false), 500); // short flash
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br from-white via-gray-100 to-purple-100 
      dark:from-black dark:via-zinc-900 dark:to-purple-950 
      text-black dark:text-white transition-all duration-500 px-6 pt-24 overflow-hidden group"
    >
      <ParticlesBackground />

      <Tilt glareEnable glareMaxOpacity={0.2} scale={1.1} transitionSpeed={400}>
        <motion.div
          className={`relative transition-all duration-300 ${
            zap ? 'animate-[zap_0.4s_ease-in-out]' : ''
          }`}
          onClick={triggerZap}
          onMouseEnter={() => setZap(true)}
          onMouseLeave={() => setZap(false)}
        >
          <motion.img
            src="/avatar.jpg"
            alt="Arshpreet Singh Avatar"
            className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-purple-500 
            shadow-xl transition-all duration-500 hover:scale-105 
            hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.7)] 
            dark:hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {/* Lightning bolt flicker ring */}
          <div
            className={`absolute inset-0 rounded-full ${
              zap ? 'ring-4 ring-purple-400 dark:ring-pink-400 animate-ping' : ''
            }`}
          />
        </motion.div>
      </Tilt>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 text-center z-10 
        bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent 
        hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.7)] transition duration-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m Arshpreet Singh
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-2xl text-center z-10 text-black/80 dark:text-white/90 
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

