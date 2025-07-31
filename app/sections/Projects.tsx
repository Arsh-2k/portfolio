"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

// 🌟 Project Data
const projects = [
  {
    title: "🚀 Portfolio Website",
    description:
      "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    github: "https://github.com/Arsh-2k/portfolio",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "🏋️ RepVision",
    description:
      "A fitness web app with YouTube workout tutorials, clean UI, and interactive features.",
    github: "https://github.com/Arsh-2k/RepVision",
    tech: ["Appwrite", "React", "YouTube API"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="min-h-screen w-full px-4 sm:px-6 md:px-12 py-24
        bg-gradient-to-b from-violet-100 via-white to-blue-100
        dark:from-black dark:via-zinc-900 dark:to-zinc-950
        text-gray-900 dark:text-gray-100 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {/* 🌈 Animated Title */}
        <motion.div
          className="text-center px-4 sm:px-8"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold
              text-transparent bg-clip-text
              bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500
              animate-text-blur leading-tight break-words"
          >
            Code. Create. Repeat.
          </h2>
        </motion.div>

        {/* 📦 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <Tilt
              key={project.github}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable
              glareMaxOpacity={0.15}
              transitionSpeed={1200}
              scale={1.02}
              className="outline-none"
            >
              <motion.article
                className="relative p-6 sm:p-8 rounded-3xl
                  bg-white/80 dark:bg-zinc-900/60
                  border border-purple-200 dark:border-zinc-700
                  shadow-xl overflow-hidden backdrop-blur"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.3, type: "spring", stiffness: 120 }}
              >
                {/* ✨ Animated shimmer overlay */}
                <motion.div
                  className="absolute inset-0 rounded-3xl
                    bg-white/10 dark:bg-white/5 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 1.2 }}
                  aria-hidden="true"
                />

                {/* 🧱 Project Title */}
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-4
                    text-purple-800 dark:text-purple-300 relative z-10"
                >
                  {project.title}
                </h3>

                {/* 📝 Description */}
                <p
                  className="text-base text-gray-800 dark:text-gray-300 mb-6 relative z-10"
                >
                  {project.description}
                </p>

                {/* 🧩 Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-medium
                        bg-purple-100 text-purple-800
                        dark:bg-purple-800 dark:text-purple-100
                        rounded-full select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 🔗 GitHub Link */}
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2
                    text-purple-700 dark:text-purple-300
                    hover:underline font-semibold relative z-10 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaGithub className="text-xl" />
                  View on GitHub
                </motion.a>
              </motion.article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
