'use client';

import { motion } from 'framer-motion';

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

  return (
    <section
      className="w-full min-h-screen pt-16 pb-24 px-6 sm:px-10 md:px-20
                 bg-gradient-to-br from-white via-gray-100 to-purple-100
                 dark:from-black dark:via-zinc-900 dark:to-purple-950
                 transition-colors duration-500 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto overflow-visible">
        {/* Title with animated gradient */}
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-extrabold mb-4
                     leading-[1.3] bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500
                     bg-clip-text text-transparent animate-gradient-x drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          📚 Learning & Working With These Technologies
        </motion.h1>

        {/* Purple glowing divider */}
        <motion.div
          className="w-2/3 sm:w-1/2 h-1 mx-auto mb-16 rounded-full
                     bg-purple-400/60 dark:bg-purple-600/60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Tech Categories */}
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6
                           text-purple-700 dark:text-purple-300 tracking-wide">
              {category.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.items.map(({ name, logo, logoColor }, i) => (
                <motion.img
                  key={`${name}-${i}`}
                  src={`https://img.shields.io/badge/${encodeURIComponent(
                    name
                  )}-555?style=for-the-badge&logo=${logo}&logoColor=${logoColor ?? 'white'}`}
                  alt={name}
                  className="h-12 w-full object-contain cursor-pointer
                             transition-transform duration-300 hover:scale-105
                             drop-shadow-md dark:drop-shadow-[0_0_6px_purple]"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
