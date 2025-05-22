'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const ideas = [
  {
    title: 'AI Workout Tracker',
    description: 'A computer vision app that counts reps and tracks form using AI.',
    tags: ['AI', 'Fitness', 'React'],
  },
  {
    title: 'Crypto Portfolio Tracker',
    description: 'Track multiple wallets and get price alerts in a beautiful dashboard.',
    tags: ['Web3', 'Finance', 'Next.js'],
  },
  {
    title: 'Code Snippet Organizer',
    description: 'Store and search your code snippets with tagging and syntax highlighting.',
    tags: ['DevTool', 'Tailwind', 'Firebase'],
  },
  {
    title: 'Mood Journal',
    description: 'A mental wellness app with daily prompts, streaks, and stats.',
    tags: ['Health', 'PWA', 'TypeScript'],
  },
];

export default function IdeaVault() {
  return (
    <section
      id="idea-vault"
      className="scroll-mt-24 min-h-screen px-4 py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-white dark:from-black dark:via-zinc-900 dark:to-purple-900 transition-colors duration-500"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Lightbulb className="inline-block mr-2 text-yellow-400 animate-pulse" />
        Idea Vault
      </motion.h2>

      <motion.p
        className="text-center max-w-2xl mx-auto text-lg mb-10 text-gray-800 dark:text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        A collection of epic project ideas to spark your creativity. Pick one, remix it, and build something legendary!
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {ideas.map((idea, index) => (
          <motion.div
            key={index}
            className="bg-white/70 dark:bg-zinc-800 rounded-xl p-6 shadow-md backdrop-blur-md border border-purple-300/20 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">
              {idea.title}
            </h3>
            <p className="text-gray-700 dark:text-white/80 mb-3">
              {idea.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium rounded bg-purple-200 dark:bg-purple-700/30 text-purple-800 dark:text-purple-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

