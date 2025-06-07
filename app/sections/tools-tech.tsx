"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const categories = [
  {
    title: "💻 Languages",
    items: [
      { name: "C", logo: "c" },
      { name: "C++", logo: "c%2B%2B" },
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "javascript" },
    ],
  },
  {
    title: "🌐 Frontend",
    items: [
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css3" },
      { name: "TailwindCSS", logo: "tailwind-css" },
      { name: "React", logo: "react", logoColor: "61DAFB" },
    ],
  },
  {
    title: "🧠 Backend",
    items: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Express.js", logo: "express" },
    ],
  },
  {
    title: "🗃️ Database",
    items: [{ name: "MongoDB", logo: "mongodb" }],
  },
  {
    title: "⚙️ Tools & Platforms",
    items: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "VS Code", logo: "visual-studio-code" },
      { name: "Vercel", logo: "vercel" },
      { name: "Appwrite", logo: "appwrite" },
      { name: "Figma", logo: "figma" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: "spring",
    },
  }),
};

export default function ToolsTech() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const gradientBg = isDark
    ? "from-[#1a102e] via-[#2a164b] to-[#1f0e3c]"
    : "from-[#f3e8ff] via-[#e9d5ff] to-[#ede9fe]";

  const titleGradient = isDark
    ? "from-purple-400 via-fuchsia-500 to-pink-500"
    : "from-purple-600 via-fuchsia-600 to-pink-500";

  const cardBg = isDark ? "bg-white/5" : "bg-white/70";
  const paragraphText = isDark ? "text-zinc-300" : "text-zinc-700";
  const headingText = isDark ? "text-purple-300" : "text-purple-700";

  return (
    <section
      id="tech"
      className={`relative w-full min-h-screen pt-20 pb-32 px-6 sm:px-10 md:px-16 
        bg-gradient-to-br ${gradientBg} text-white scroll-mt-20 overflow-hidden transition-colors`}
    >
      {/* ✨ Animated Glow Grid */} 
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] 
          animate-[spin_60s_linear_infinite] opacity-10 
          bg-[radial-gradient(circle,#ffffff11_1%,transparent_1.2%)] 
          bg-[length:22px_22px]"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} opacity-90 backdrop-blur-sm`} />
      </div>

      {/* 🎯 Main Content */} 
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1
          className={`text-center text-4xl sm:text-5xl font-extrabold tracking-tight 
            bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent mb-6 drop-shadow-md`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          🛠️ Tools & Tech
        </motion.h1>

        <motion.p
          className={`text-center max-w-xl mx-auto ${paragraphText} mb-14`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          These are the technologies I’m learning, mastering, and using to build things I believe in.
        </motion.p>

        {/* 🧩 Skill Categories */} 
        <div className="space-y-14">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              custom={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`border border-purple-500/30 p-6 rounded-xl ${cardBg} backdrop-blur 
                shadow-lg shadow-purple-900/10 hover:shadow-purple-500/30 transition-shadow`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${headingText}`}>
                {category.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.items.map(({ name, logo, logoColor }, i) => (
                  <motion.div
                    key={name}
                    className="group relative flex items-center justify-center h-12 rounded-md 
                      bg-zinc-900/70 backdrop-blur-sm transition-all duration-300 ease-out 
                      hover:scale-105 hover:rotate-[-1deg] shadow-md hover:shadow-purple-400/40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={`https://img.shields.io/badge/${encodeURIComponent(
                        name
                      )}-000000?style=for-the-badge&logo=${encodeURIComponent(
                        logo
                      )}&logoColor=${logoColor ?? "white"}`}
                      alt={name}
                      className="h-full object-contain brightness-110 group-hover:brightness-125"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
