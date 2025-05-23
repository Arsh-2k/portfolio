'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from '../components/ParticlesBackground';
import toast from 'react-hot-toast';

export default function Hero() {
  const handleResumeClick = () => {
    toast("Resume coming soon 👀", {
      icon: "📄",
      style: {
        borderRadius: '12px',
        background: '#2d0d3a',
        color: '#fff',
      },
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pb-12 sm:pb-20
                 bg-gradient-to-br from-white via-purple-100 to-blue-200 
                 dark:from-black dark:via-[#1a0024] dark:to-black
                 transition-all duration-500 overflow-hidden"
    >
      {/* 🔮 Particle Background */}
      <ParticlesBackground />

      {/* ⚡ Avatar with Tilt */}
      <Tilt glareEnable glareMaxOpacity={0.25} scale={1.05} transitionSpeed={250}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
          className="relative group mb-6"
        >
          <motion.img
            src="/avatar.jpg"
            alt="Arshpreet Singh's Avatar"
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 border-purple-500 
                       shadow-xl transition-all duration-300 hover:animate-zap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.span
            className="absolute -top-3 -right-3 text-yellow-300 text-3xl opacity-0 
                       group-hover:opacity-100 transition duration-300"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            ⚡
          </motion.span>
        </motion.div>
      </Tilt>

      {/* 🎨 Name */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight md:leading-[1.15]
                   bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-500 
                   bg-clip-text text-transparent animate-text-glow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Arshpreet Singh
      </motion.h1>

      {/* 🧾 Subtitle */}
      <motion.p
        className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-xl 
                   animate-bounce-slow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        Web Dev • Open Source • Tech with Style
      </motion.p>

      {/* 📄 Resume Button */}
      <motion.button
        onClick={handleResumeClick}
        className="mt-6 px-6 py-2 rounded-lg text-white font-semibold
                   bg-gradient-to-r from-purple-600 to-pink-500 
                   hover:from-pink-500 hover:to-purple-600
                   shadow-lg transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Download Resume
      </motion.button>

      {/* 🖱️ Scroll Indicator */}
      <motion.div
        className="mt-10 animate-bounce-slow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 dark:border-gray-400 rounded-full 
                        flex items-start justify-center p-1">
          <motion.div
            className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
