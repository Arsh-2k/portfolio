'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

const quotes = [
  '“The magic you’re looking for is in the work you’re avoiding.”',
  '“In chess, as in life, it’s not always about having the best move — it’s about making the best out of the move you have.” — Viswanathan Anand',
];

export default function About() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center
      bg-gradient-to-br from-white via-purple-100 to-blue-100 
      dark:from-gray-900 dark:via-black dark:to-purple-900 
      transition-colors duration-500"
    >
      {/* 🔁 Animated Quote with Typewriter */}
      <div className="relative mb-12 max-w-4xl px-6 py-4 rounded-lg bg-white/60 dark:bg-black/30 shadow-2xl text-purple-800 dark:text-purple-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-medium italic"
          >
            <Typewriter
              options={{
                strings: [quotes[currentQuote]],
                autoStart: true,
                loop: false,
                delay: 30,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🧬 Section Title */}
      <motion.h2
        className="group text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent
        border-4 border-transparent rounded-xl hover:border-purple-400/40 dark:hover:border-purple-600/40
        hover:shadow-[0_0_15px_#c084fc66] transition-all duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* ✨ Details List */}
      <motion.ul
        className="text-lg md:text-xl max-w-3xl text-left text-gray-800 dark:text-white/90 space-y-4
        p-8 rounded-xl bg-white/30 dark:bg-black/30 shadow-lg border border-purple-300/30 dark:border-purple-500/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {[
          {
            icon: '🎓',
            text: "I'm a CSE undergrad passionate about tech, logic, and building useful things.",
          },
          {
            icon: '💻',
            text: 'Currently exploring: Programming, Data Structures & Algorithms, and Web Development.',
          },
          {
            icon: '🧠',
            text: 'I enjoy solving real-world problems through code — and making things that don’t just run, but matter.',
          },
          {
            icon: '♟️',
            text: 'Chess, geopolitics, and algorithmic thinking keep me sharp.',
          },
          {
            icon: '✨',
            text: 'Goal: Contribute to Open Source and build projects that speak louder than words.',
          },
        ].map((item, i) => (
          <motion.li
            key={i}
            whileHover={{ scale: 1.05, x: 4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex gap-3 items-start"
          >
            {item.icon} <span>{item.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
