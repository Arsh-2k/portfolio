// app/sections/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import useIsMobile from "../hooks/useIsMobile";
import usePortfolioMode from "../hooks/usePortfolioMode";

const projects = [
  {
    title: "🚀 Portfolio Website",
    description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    github: "https://github.com/Arsh-2k/portfolio",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "🏋️ RepVision",
    description: "A fitness web app with YouTube workout tutorials, clean UI, and interactive features.",
    github: "https://github.com/Arsh-2k/RepVision",
    tech: ["Appwrite", "React", "YouTube API"],
  },
];

export default function Projects() {
  const isMobile = useIsMobile();
  const mode = usePortfolioMode(); // Grabs "fun" or "formal" instantly

  const isFormal = mode === "formal";

  return (
    <section
      id="projects"
      className={`min-h-screen w-full px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 transition-colors duration-500
        ${
          isFormal
            ? "bg-white dark:bg-[#0A0A0A] text-black dark:text-gray-200" // Strict minimalist theme
            : "bg-gradient-to-b from-violet-100 via-white to-blue-100 dark:from-black dark:via-zinc-900 dark:to-zinc-950 text-gray-900 dark:text-gray-100"
        }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        
        {/* Title Section */}
        <div className="text-center px-4 sm:px-8">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight transition-all
              ${
                isFormal
                  ? "text-black dark:text-white tracking-tight" // Clean, sharp text
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500" // Glowing text
              }`}
          >
            {isFormal ? "Technical Projects" : "Code. Create. Repeat."}
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
          {projects.map((project) => {
            
            // --- FORMAL MODE (High-performance, no-fluff, pure data structure) ---
            if (isFormal) {
              return (
                <div
                  key={project.github}
                  className="p-6 sm:p-8 rounded-none border-2 border-gray-300 dark:border-zinc-800 bg-transparent hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">
                    {project.title.replace(/[\u1000-\uFFFF]+/g, '') /* Strips emojis for formal mode */}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-400 mb-6 font-mono text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs font-mono font-semibold bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-300">
                        [{tech}]
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-mono text-sm font-bold"
                  >
                    <FaGithub className="text-lg" />
                    SOURCE_CODE
                  </a>
                </div>
              );
            }

            // --- FUN MODE (Mobile) ---
            if (isMobile && !isFormal) {
              return (
                <motion.article
                  key={project.github}
                  className="relative p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-purple-100 dark:border-zinc-800 shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-800 dark:text-gray-300 mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-purple-700 dark:text-purple-300 underline font-semibold">
                    <FaGithub className="text-lg" /> View on GitHub
                  </a>
                </motion.article>
              );
            }

            // --- FUN MODE (Desktop with Tilt) ---
            return (
              <Tilt key={project.github} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.15} scale={1.02}>
                <motion.article
                  className="relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-purple-200 dark:border-zinc-700 shadow-xl backdrop-blur"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-800 dark:text-purple-300">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-800 dark:text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-700 dark:text-purple-300 hover:underline font-semibold">
                    <FaGithub className="text-xl" /> View on GitHub
                  </a>
                </motion.article>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}