'use client';

import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Portfolio Website',
    description:
      'A modern developer portfolio built with Next.js, Tailwind CSS, and framer-motion.',
    github: 'https://github.com/Arsh-2k/portfolio',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'RepVision',
    description:
      'A fitness web app with YouTube workout tutorials, clean UI, and interactive features.',
    github: 'https://github.com/Arsh-2k/RepVision',
    tech: ['Appwrite', 'React', 'YouTube API'],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-4 py-20 bg-gradient-to-br 
      from-white via-gray-100 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-purple-950 
      text-gray-900 dark:text-white transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-white/80 dark:bg-black/30 backdrop-blur-md border border-purple-300/30 
              dark:border-purple-800/30 rounded-2xl p-6 shadow-md hover:shadow-purple-400/30 
              dark:hover:shadow-purple-500/30 hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/10 via-transparent to-blue-200/10 dark:from-purple-900/10 dark:to-purple-700/10 rounded-2xl pointer-events-none group-hover:blur-sm transition duration-500" />

              <h3 className="text-2xl font-semibold mb-2 text-purple-700 dark:text-purple-300 z-10 relative">
                {project.title}
              </h3>

              <p className="text-sm mb-4 z-10 relative">{project.description}</p>

              <div className="flex flex-wrap gap-2 text-sm mb-4 z-10 relative">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-300 font-semibold hover:underline z-10 relative"
              >
                <FaGithub /> View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

