'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function ToolsTech() {
  const categories = [
    {
      title: '💻 Languages',
      items: [
        { name: 'C', logo: 'c' },
        { name: 'C++', logo: 'c%2B%2B' },
        { name: 'Python', logo: 'python' },
        { name: 'JavaScript', logo: 'javascript' },
      ],
    },
    {
      title: '🌐 Frontend',
      items: [
        { name: 'HTML5', logo: 'html5' },
        { name: 'CSS3', logo: 'css3' },
        { name: 'TailwindCSS', logo: 'tailwind-css' },
        { name: 'React', logo: 'react', logoColor: '61DAFB' },
      ],
    },
    {
      title: '🧠 Backend',
      items: [
        { name: 'Node.js', logo: 'nodedotjs' },
        { name: 'Express.js', logo: 'express' },
      ],
    },
    {
      title: '🗃️ Database',
      items: [{ name: 'MongoDB', logo: 'mongodb' }],
    },
    {
      title: '⚙️ Tools & Platforms',
      items: [
        { name: 'Git', logo: 'git' },
        { name: 'GitHub', logo: 'github' },
        { name: 'VS Code', logo: 'visual-studio-code' },
        { name: 'Vercel', logo: 'vercel' },
        { name: 'Appwrite', logo: 'appwrite' },
        { name: 'Figma', logo: 'figma' },
      ],
    },
  ];

  // Animation controls for infinite scroll
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'], // move from 0% to -50%
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    });
  }, [controls]);

  return (
    <section
      className="w-full min-h-screen py-24 px-6 sm:px-10 md:px-20
                 bg-gradient-to-br from-white via-gray-100 to-purple-100
                 dark:from-black dark:via-zinc-900 dark:to-purple-950
                 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12
                     bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500
                     bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🛠️ Tools & Tech
        </motion.h1>

        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-purple-700 dark:text-purple-300">
              {category.title}
            </h2>

            {/* Infinite scrolling container */}
            <div className="overflow-hidden relative">
              <motion.div
                className="flex gap-6 whitespace-nowrap"
                animate={controls}
              >
                {/* Duplicate items for smooth looping */}
                {[...category.items, ...category.items].map(({ name, logo, logoColor }, idx) => (
                  <img
                    key={`${name}-${idx}`}
                    src={`https://img.shields.io/badge/${encodeURIComponent(
                      name
                    )}-555?style=for-the-badge&logo=${logo}&logoColor=${
                      logoColor ?? 'white'
                    }`}
                    alt={name}
                    className="h-12 cursor-pointer transition-transform hover:scale-110"
                    draggable={false}
                    loading="lazy"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

