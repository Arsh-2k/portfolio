'use client';

import { motion } from 'framer-motion';
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
      className="min-h-screen flex flex-col justify-center items-center px-4 py-20 transition-colors duration-500
      bg-gradient-to-br from-white via-purple-100 to-blue-100 dark:from-gray-900 dark:via-black dark:to-purple-900"
    >
      {/* QUOTE SLIDER with TYPEWRITER */}
      <motion.div
        key={currentQuote}
        className="text-center text-xl md:text-2xl font-medium italic mb-12 max-w-4xl px-6 py-4
        text-purple-800 dark:text-purple-300 rounded-lg bg-white/60 dark:bg-black/30 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
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

      {/* Title */}
      <motion.h2
        className="group text-4xl md:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent
        border-4 border-transparent rounded-xl transition-all duration-300 hover:border-purple-400/40 dark:hover:border-purple-600/40 hover:shadow-[0_0_15px_#c084fc66]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* IMAGE - Removed due to broken path */}

      {/* Bullet points styled */}
      <motion.ul
        className="text-lg md:text-xl max-w-3xl text-left text-gray-800 dark:text-white/90 space-y-4
        p-8 rounded-xl bg-white/30 dark:bg-black/30 shadow-lg border border-purple-300/30 dark:border-purple-500/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <motion.li whileHover={{ scale: 1.05 }} className="flex gap-3 items-start">
          🎓 <span>I&apos;m a CSE undergrad passionate about tech, logic, and building useful things.</span>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }} className="flex gap-3 items-start">
          💻 <span>Currently exploring: Programming, Data Structures & Algorithms, and Web Development.</span>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }} className="flex gap-3 items-start">
          🧠 <span>I enjoy solving real-world problems through code — and making things that don’t just run, but matter.</span>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }} className="flex gap-3 items-start">
          ♟️ <span>Chess, geopolitics, and algorithmic thinking keep me sharp.</span>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }} className="flex gap-3 items-start">
          ✨ <span>Goal: Contribute to Open Source and build projects that speak louder than words.</span>
        </motion.li>
      </motion.ul>
    </section>
  );
}