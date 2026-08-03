"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useMemo } from "react";
import useIsMobile from "../hooks/useIsMobile";
import usePortfolioMode from "../hooks/usePortfolioMode";

// 💭 Pre-populated concepts aligned with high-performance systems and analytics
const ideas = [
  {
    title: "Low-Latency Order Matcher",
    description: "A nanosecond-optimized limit order book engine designed for high-frequency trading simulations.",
    tags: ["C++", "HFT", "Low-Latency"],
  },
  {
    title: "The Logic-Gate Vault v2.0",
    description: "Next-gen iterations of the dynamic data encryption engine, exploring FPGA-accelerated AES-256 and XOR logic.",
    tags: ["Java", "Verilog", "Cryptography"],
  },
  {
    title: "Live AQI Telemetry Hub",
    description: "Real-time environmental monitoring dashboard aggregating regional air quality trends and anomalies.",
    tags: ["Data Analytics", "TypeScript", "Sustainability"],
  },
  {
    title: "Hardware-Accelerated Strategy Tester",
    description: "A backtesting framework utilizing hardware description languages to simulate latency-critical algorithms.",
    tags: ["FPGA", "Quantitative", "Systems"],
  },
];

// 🌈 Tag Pill Component
const TagPill = ({ tag, isFormal }: { tag: string; isFormal: boolean }) => {
  if (isFormal) {
    return (
      <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-400 select-none mr-2">
        [{tag.toUpperCase()}]
      </span>
    );
  }
  return (
    <span
      className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500
        text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow select-none"
      aria-label={`Tag: ${tag}`}
    >
      #{tag}
    </span>
  );
};

// 🚀 Idea Vault Component
export default function IdeaVault() {
  const isMobile = useIsMobile();
  const mode = usePortfolioMode();
  const isFormal = mode === "formal";

  const ideaCards = useMemo(
    () =>
      ideas.map((idea, idx) => {
        // ------ FORMAL MODE -------
        if (isFormal) {
          return (
            <article
              key={idea.title}
              className="p-6 border-2 border-gray-300 dark:border-zinc-800 bg-transparent hover:border-black dark:hover:border-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  alert(`Directive Selected: ${idea.title}`);
                }
              }}
              onClick={() => alert(`Directive Selected: ${idea.title}`)}
            >
              <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-black dark:text-white mb-2 uppercase">
                {idea.title}
              </h3>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-400 mb-5 leading-relaxed">
                {idea.description}
              </p>
              <div className="flex flex-wrap" aria-label={`Tags for ${idea.title}`}>
                {idea.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} isFormal={true} />
                ))}
              </div>
            </article>
          );
        }

        // ------ FUN MODE (MOBILE) -------
        if (isMobile) {
          return (
            <article
              key={idea.title}
              className="relative bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700
                p-4 rounded-xl shadow mb-2 transition-none duration-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              tabIndex={0}
              role="button"
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
                  <TagPill key={tag} tag={tag} isFormal={false} />
                ))}
              </div>
            </article>
          );
        }

        // ------ FUN MODE (DESKTOP) -------
        return (
          <motion.article
            key={idea.title}
            className="relative bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10
              backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]
              hover:shadow-[0_0_40px_5px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
              dark:focus:ring-offset-zinc-900 cursor-pointer"
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            role="button"
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
                <TagPill key={tag} tag={tag} isFormal={false} />
              ))}
            </div>
          </motion.article>
        );
      }),
    [isMobile, isFormal]
  );

  return (
    <section
      id="idea-vault"
      className={`w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 relative scroll-mt-24 transition-colors duration-500
        ${isFormal
          ? "bg-[#F3F4F6] dark:bg-black text-black dark:text-gray-200"
          : "bg-gradient-to-br from-blue-50 via-purple-100 to-white dark:from-black dark:via-zinc-900 dark:to-purple-900"
        }
      `}
      aria-label="Idea Vault - Future concepts and technical directives"
    >
      {/* ✨ Grid shimmer background - hidden on mobile/formal for speed */}
      {!isMobile && !isFormal && (
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
          className={`text-center mb-8 transition-all ${
            isFormal
              ? "text-3xl sm:text-4xl font-mono font-bold tracking-tight uppercase border-b-2 border-black dark:border-white inline-block"
              : "text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {!isFormal && <Lightbulb className="inline-block mr-2 text-yellow-400 animate-pulse" />}
          {isFormal ? "> PENDING_DIRECTIVES" : "Idea Vault"}
        </motion.h2>

        {/* 📝 Subtitle */}
        <motion.p
          className={`text-center max-w-2xl mx-auto mb-12 ${
            isFormal 
              ? "text-sm font-mono text-gray-700 dark:text-gray-400 uppercase"
              : "text-lg text-neutral-800 dark:text-white/90"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {isFormal
            ? "A repository of architectural concepts, algorithmic improvements, and low-latency system designs targeted for future implementation."
            : "A collection of epic project ideas to spark creativity. Pick one, remix it, and build something legendary!"}
        </motion.p>

        {/* 💡 Idea Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isFormal ? "gap-6 sm:gap-8" : "gap-7 sm:gap-10"}`} role="list">
          {ideaCards}
        </div>
      </div>
    </section>
  );
}