"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";

const AboutSection = () => {
  const quotes = useMemo(
    () => [
      "“The magic you’re looking for is in the work you’re avoiding.”",
      "“In chess, it’s not always about the best move — it’s about making the best of your move.”",
    ],
    []
  );

  const details = useMemo(
    () => [
      {
        icon: "🎓",
        text: "CSE undergrad passionate about logic, clean code, and creative builds.",
      },
      {
        icon: "💻",
        text: "Currently diving deep into Programming, DSA, and Web Dev.",
      },
      {
        icon: "🛠️",
        text: "Focused on turning ideas into real, impactful digital experiences.",
      },
      {
        icon: "♟️",
        text: "Chess helps me stay sharp and strategic in both life and code.",
      },
      {
        icon: "🚀",
        text: "Aspiring open source contributor and future product builder.",
      },
    ],
    []
  );

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 14000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full min-h-screen flex flex-col items-center justify-center
        px-4 sm:px-6 py-20 text-center
        bg-gradient-to-br from-white via-purple-100 to-blue-100
        dark:from-gray-900 dark:via-black dark:to-purple-900
        theme-transition overflow-hidden"
    >
      {/* 🌀 Background Aura Ring */}
      <motion.div
        className="absolute z-0 w-96 h-96 rounded-full blur-3xl
          bg-gradient-to-br from-purple-400/20 to-blue-400/20
          animate-pulse theme-transition will-change-transform"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* 🔁 Rotating Quote Box */}
      <div
        className="relative z-10 w-full max-w-2xl mb-12 px-4 py-5 sm:px-6 sm:py-6 
          bg-white/70 dark:bg-zinc-900/50 rounded-lg 
          text-purple-800 dark:text-purple-300 
          shadow-2xl border border-purple-300/20 dark:border-purple-500/20
          backdrop-blur-md"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            layout="position"
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

      {/* ✨ Section Heading */}
      <motion.h2
        id="about-heading"
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10
          bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent
          rounded-xl border-4 border-transparent 
          hover:border-purple-400/40 dark:hover:border-purple-600/40
          hover:shadow-[0_0_15px_#c084fc66] theme-transition"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* 📜 Personal Highlights */}
      <motion.ul
        className="relative z-10 w-full max-w-3xl space-y-5 px-4 sm:px-6 py-6
          text-left text-base sm:text-lg md:text-xl
          text-gray-800 dark:text-white/90 
          bg-white/30 dark:bg-black/30 backdrop-blur-md
          border border-purple-300/30 dark:border-purple-500/30 
          rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {details.map(({ icon, text }, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 hover:scale-[1.02] hover:bg-purple-100/20 dark:hover:bg-purple-900/10 
              p-2 rounded-lg transition-all duration-300 will-change-transform"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <span className="text-xl sm:text-2xl">{icon}</span>
            <span className="leading-relaxed">{text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default AboutSection;
