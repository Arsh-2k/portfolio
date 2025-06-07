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
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 
        bg-gradient-to-br from-white via-gray-100 to-purple-100 
        dark:from-black dark:via-zinc-900 dark:to-purple-950 
        text-gray-900 dark:text-white scroll-mt-24"
    >
      <div className="max-w-6xl w-full space-y-16">
        {/* Heading Tile */}
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          glareEnable
          glareMaxOpacity={0.15}
          transitionSpeed={1000}
          scale={1.02}
          className="rounded-3xl"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 
                        p-8 shadow-2xl transition-shadow duration-500"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <h2 className="text-6xl md:text-8xl font-extrabold text-white text-center z-10 relative">
              My Projects
            </h2>
            {/* shine swipe */}
            <motion.div
              className="absolute inset-0 pointer-events-none bg-white/20 rounded-3xl"
              initial={{ x: '-100%', skewX: -15, opacity: 0 }}
              whileHover={{ x: '200%', skewX: -15, opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>
        </Tilt>

        {/* Project Cards */}
        <div className="grid gap-16 sm:grid-cols-1 md:grid-cols-2">
          {projects.map((project, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable
              glareMaxOpacity={0.2}
              transitionSpeed={1200}
              scale={1.04}
              className="rounded-3xl"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-black/30 
                  backdrop-blur-lg border border-purple-300/25 dark:border-purple-800/25 
                  p-10 shadow-2xl transition-shadow duration-500 group"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 24,
                  delay: idx * 0.3,
                }}
              >
                {/* shine swipe */}
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-white/20 dark:bg-black/20 rounded-3xl"
                  initial={{ x: '-100%', skewX: -15, opacity: 0 }}
                  whileHover={{ x: '200%', skewX: -15, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                />

                <h3 className="text-3xl font-extrabold mb-4 text-purple-700 dark:text-purple-300 relative z-10">
                  {project.title}
                </h3>

                <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 z-10 relative">
                  {project.description}
                </p>

                <motion.div
                  className="flex flex-wrap gap-3 mb-8 z-10 relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }}
                >
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="bg-gradient-to-r from-purple-300 to-blue-300 text-purple-900 
                                 dark:bg-gradient-to-r dark:from-purple-700 dark:to-blue-700 dark:text-purple-200 
                                 px-4 py-1 rounded-full text-sm font-semibold"
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
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-300 
                             font-bold z-10 relative hover:text-purple-800 dark:hover:text-purple-100"
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
