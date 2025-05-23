'use client';

import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

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
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-20
      bg-gradient-to-br from-white via-gray-100 to-purple-100
      dark:from-black dark:via-zinc-900 dark:to-purple-950
      text-gray-900 dark:text-white transition-colors duration-500 scroll-mt-24"
    >
      <div className="max-w-6xl w-full">
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r 
            from-fuchsia-500 via-purple-500 to-blue-500 text-transparent 
            bg-clip-text leading-tight md:leading-[1.3] sm:leading-snug"
          >
            My Projects
          </h2>

          <motion.div
            className="h-[4px] mt-4 mx-auto rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 sm:grid-cols-1">
          {projects.map((project, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.2}
              transitionSpeed={1000}
              scale={1.03}
              className="rounded-2xl"
            >
              <motion.div
                className="group relative bg-white/80 dark:bg-black/30 backdrop-blur-md border 
                border-purple-300/30 dark:border-purple-800/30 rounded-2xl p-6 shadow-md 
                hover:shadow-purple-400/30 dark:hover:shadow-purple-500/30 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Shimmer layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/10 via-transparent to-blue-200/10 dark:from-purple-900/10 dark:to-purple-700/10 rounded-2xl group-hover:blur-sm transition duration-700 pointer-events-none z-0" />

                <h3 className="text-2xl font-semibold mb-2 text-purple-700 dark:text-purple-300 relative z-10 leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm mb-4 relative z-10 leading-relaxed">
                  {project.description}
                </p>

                <motion.div
                  className="flex flex-wrap gap-2 text-sm mb-4 relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-300 font-semibold relative z-10 hover:underline"
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaGithub /> View on GitHub
                </motion.a>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
