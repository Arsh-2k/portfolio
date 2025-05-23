'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

const quotes = [
  '“The magic you’re looking for is in the work you’re avoiding.”',
  '“In chess, it’s not always about the best move — it’s about making the best of your move.”',
];

export default function About() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const details = [
    {
      icon: '🎓',
      text: "CSE undergrad passionate about logic, clean code, and creative builds.",
    },
    {
      icon: '💻',
      text: 'Currently diving deep into Programming, DSA, and Web Dev.',
    },
    {
      icon: '🛠️',
      text: 'Focused on turning ideas into real, impactful digital experiences.',
    },
    {
      icon: '♟️',
      text: 'Chess helps me stay sharp and strategic in both life and code.',
    },
    {
      icon: '🚀',
      text: 'Aspiring open source contributor and future product builder.',
    },
  ];

  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 text-center
      bg-gradient-to-br from-white via-purple-100 to-blue-100 
      dark:from-gray-900 dark:via-black dark:to-purple-900 
      transition-colors duration-500"
    >
      {/* 🔁 Quote Section */}
      <div className="relative mb-12 w-full max-w-2xl px-4 py-5 sm:px-6 sm:py-6 rounded-lg 
                      bg-white/70 dark:bg-zinc-900/40 shadow-2xl text-purple-800 dark:text-purple-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl font-medium italic"
          >
            <Typewriter
              options={{
                strings: [quotes[currentQuote]],
                autoStart: true,
                loop: false,
                delay: 35,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✨ Section Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 
                   bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent
                   border-4 border-transparent rounded-xl 
                   hover:border-purple-400/40 dark:hover:border-purple-600/40
                   hover:shadow-[0_0_15px_#c084fc66] transition-all duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* 📜 Detail List */}
      <motion.ul
        className="text-base sm:text-lg md:text-xl max-w-3xl text-left text-gray-800 dark:text-white/90 space-y-5
                   px-4 sm:px-6 py-6 rounded-xl bg-white/30 dark:bg-black/30 shadow-lg 
                   border border-purple-300/30 dark:border-purple-500/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {details.map((item, i) => (
          <motion.li
            key={i}
            whileHover={{ scale: 1.05, x: 6 }}
            transition={{ type: 'spring', stiffness: 250 }}
            className="flex gap-3 items-start"
          >
            <span className="text-xl sm:text-2xl">{item.icon}</span>
            <span>{item.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
