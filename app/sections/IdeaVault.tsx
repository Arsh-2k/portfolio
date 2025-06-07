"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const ideas = [
  {
    title: "AI Workout Tracker",
    description:
      "A computer vision app that counts reps and tracks form using AI.",
    tags: ["AI", "Fitness", "React"],
  },
  {
    title: "Crypto Portfolio Tracker",
    description:
      "Track multiple wallets and get price alerts in a beautiful dashboard.",
    tags: ["Web3", "Finance", "Next.js"],
  },
  {
    title: "Code Snippet Organizer",
    description:
      "Store and search your code snippets with tagging and syntax highlighting.",
    tags: ["DevTool", "Tailwind", "Firebase"],
  },
  {
    title: "Mood Journal",
    description:
      "A mental wellness app with daily prompts, streaks, and stats.",
    tags: ["Health", "PWA", "TypeScript"],
  },
];

export default function IdeaVault() {
  return (
    <section
      id="idea-vault"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 relative scroll-mt-24 
      bg-gradient-to-br from-blue-50 via-purple-100 to-white 
      dark:from-black dark:via-zinc-900 dark:to-purple-900 transition-colors duration-500"
    >
      {/* 🌟 Shimmer Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_25s_linear_infinite] 
        opacity-10 bg-[radial-gradient(#ffffff33_2%,transparent_2.5%)] bg-[size:25px_25px]"
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* 💡 Section Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl font-black text-center mb-8 
          bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Lightbulb className="inline-block mr-2 text-yellow-400 animate-pulse" />
          Idea Vault
        </motion.h2>

        {/* 📝 Description */}
        <motion.p
          className="text-center max-w-2xl mx-auto text-lg mb-12 text-gray-800 dark:text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A collection of epic project ideas to spark your creativity. Pick one,
          remix it, and build something legendary!
        </motion.p>

        {/* 🧠 Idea Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {ideas.map((idea, index) => (
            <motion.div
              key={index}
              className="relative bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 
              backdrop-blur-md p-6 rounded-2xl shadow-xl 
              transition-transform duration-300 hover:scale-[1.02] 
              hover:shadow-[0_0_40px_5px_rgba(255,255,255,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3">
                {idea.title}
              </h3>
              <p className="text-gray-800 dark:text-white/80 mb-4">
                {idea.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 
                    text-white text-xs px-3 py-1 rounded-full shadow-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
