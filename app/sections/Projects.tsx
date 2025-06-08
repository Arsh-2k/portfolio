"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

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
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-36
        bg-gradient-to-br from-violet-200 via-purple-100 to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-black
        text-gray-900 dark:text-white scroll-mt-24"
    >
      <div className="w-full max-w-[1800px] space-y-24">

        {/* Title with tilt and shine */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.18} scale={1.02}>
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 p-12 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 22 }}
          >
            <h2
              id="projects-heading"
              className="text-7xl md:text-9xl font-extrabold text-white text-center relative z-10"
            >
              My Projects
            </h2>
            <motion.div
              className="absolute inset-0 pointer-events-none bg-white/25 rounded-[2rem]"
              initial={{ x: "-100%", skewX: -20, opacity: 0 }}
              whileHover={{ x: "200%", skewX: -20, opacity: 1 }}
              transition={{ duration: 1.3 }}
            />
          </motion.div>
        </Tilt>

        {/* Projects Grid */}
        <div className="grid gap-20 grid-cols-1 md:grid-cols-2">
          {projects.map((project, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable
              glareMaxOpacity={0.15}
              transitionSpeed={1000}
              scale={1.04}
            >
              <motion.div
                className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-zinc-900/40 
                  backdrop-blur-xl border border-purple-400/20 dark:border-purple-900/20 
                  p-12 shadow-[0_10px_60px_rgba(0,0,0,0.3)] group"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  delay: idx * 0.3,
                }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-white/15 dark:bg-black/15 rounded-[2rem]"
                  initial={{ x: "-100%", skewX: -15, opacity: 0 }}
                  whileHover={{ x: "200%", skewX: -15, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                />

                <h3 className="text-4xl font-bold mb-6 text-purple-700 dark:text-purple-300 z-10 relative">
                  {project.title}
                </h3>

                <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 mb-8 z-10 relative">
                  {project.description}
                </p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-10 z-10 relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="bg-gradient-to-br from-purple-200 to-blue-200 text-purple-900 
                        dark:from-purple-700 dark:to-blue-700 dark:text-purple-100 
                        px-5 py-1.5 rounded-full text-base font-semibold"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-purple-700 dark:text-purple-300 
                    font-bold text-lg z-10 relative hover:text-purple-900 dark:hover:text-purple-100"
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <FaGithub />
                  </motion.span>
                  View on GitHub
                </motion.a>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
