"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

// -------- Mobile-responsive hook --------
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// 💭 Static list of project ideas
const ideas = [
  {
    title: "AI Workout Tracker",
    description: "A computer vision app that counts reps and tracks form using AI.",
    tags: ["AI", "Fitness", "React"],
  },
  {
    title: "Crypto Portfolio Tracker",
    description: "Track multiple wallets and get price alerts in a beautiful dashboard.",
    tags: ["Web3", "Finance", "Next.js"],
  },
  {
    title: "Code Snippet Organizer",
    description: "Store and search your code snippets with tagging and syntax highlighting.",
    tags: ["DevTool", "Tailwind", "Firebase"],
  },
  {
    title: "Mood Journal",
    description: "A mental wellness app with daily prompts, streaks, and stats.",
    tags: ["Health", "PWA", "TypeScript"],
  },
];

// 🌈 Tag Pill Component
const TagPill = ({ tag }: { tag: string }) => (
  <span
    className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500
      text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow select-none"
    aria-label={`Tag: ${tag}`}
  >
    #{tag}
  </span>
);

// 🚀 Idea Vault Component
export default function IdeaVault() {
  const isMobile = useIsMobile();

  const ideaCards = useMemo(
    () =>
      ideas.map((idea, idx) =>
        isMobile ? (
          // ------ MOBILE CARD -------
          <article
            key={idea.title}
            className="relative bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700
              p-4 rounded-xl shadow mb-2
              transition-none duration-0
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            tabIndex={0}
            role="button"
            aria-pressed="false"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                alert(`You selected: ${idea.title}`);
              }
            }}
            onClick={() => alert(`You selected: ${idea.title}`)}
          >
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">
              {idea.title}
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-3">
              {idea.description}
            </p>
            <div className="flex flex-wrap gap-1" aria-label={`Tags for ${idea.title}`}>
              {idea.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </article>
        ) : (
          // ------ DESKTOP/TABLET (ORIGINAL ANIMATED CARD) -------
          <motion.article
            key={idea.title}
            className="relative bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10
              backdrop-blur-md p-6 rounded-2xl shadow-xl
              transition-transform duration-300 hover:scale-[1.02]
              hover:shadow-[0_0_40px_5px_rgba(255,255,255,0.1)]
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
              dark:focus:ring-offset-zinc-900 cursor-pointer"
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            role="button"
            aria-pressed="false"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                alert(`You selected: ${idea.title}`);
              }
            }}
            onClick={() => alert(`You selected: ${idea.title}`)}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3">
              {idea.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 mb-4">{idea.description}</p>
            <div className="flex flex-wrap gap-2" aria-label={`Tags for ${idea.title}`}>
              {idea.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </motion.article>
        )
      ),
    [isMobile]
  );

  return (
    <section
      id="idea-vault"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 relative scroll-mt-24
        bg-gradient-to-br from-blue-50 via-purple-100 to-white
        dark:from-black dark:via-zinc-900 dark:to-purple-900
        transition-colors duration-500"
      aria-label="Idea Vault - A collection of project ideas"
    >
      {/* ✨ Grid shimmer background - hidden on mobile for speed */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%]
              animate-[spin_25s_linear_infinite] opacity-10
              bg-[radial-gradient(#ffffff33_2%,transparent_2.5%)] bg-[size:25px_25px]"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="max-w-6xl w-full relative z-10">
        {/* 💡 Header */}
        <motion.h2
          className="text-4xl sm:text-5xl font-black text-center mb-8
            bg-gradient-to-r from-pink-500 to-yellow-400
            bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Lightbulb className="inline-block mr-2 text-yellow-400 animate-pulse" />
          Idea Vault
        </motion.h2>

        {/* 📝 Subtitle */}
        <motion.p
          className="text-center max-w-2xl mx-auto text-lg mb-12 text-neutral-800 dark:text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A collection of epic project ideas to spark your creativity. Pick one,
          remix it, and build something legendary!
        </motion.p>

        {/* 💡 Idea Grid */}
        <div className="grid gap-7 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" role="list">
          {ideaCards}
        </div>
      </div>
    </section>
  );
}
