"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// 🧱 Tech categories
const categories = [
  {
    title: "💻 Languages",
    items: ["C", "Cplusplus", "Python", "Javascript"],
  },
  {
    title: "🌐 Frontend",
    items: ["Html5", "Css3", "Tailwindcss", "React"],
  },
  {
    title: "🧠 Backend",
    items: ["Nodedotjs", "Express"],
  },
  {
    title: "🗃️ Database",
    items: ["Mongodb"],
  },
  {
    title: "⚙️ Tools & Platforms",
    items: ["Git", "Github", "Vercel", "VSCode", "Appwrite", "Figma"],
  },
];

// 🌀 Dynamic icon importer
const loadIcon = (name: string) =>
  dynamic(() =>
    import("react-icons/si").then((mod) => {
      const Icon = mod[`Si${name}` as keyof typeof mod] as
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | undefined;
      const IconWrapper: React.FC<React.SVGProps<SVGSVGElement>> = (props) =>
        Icon ? <Icon {...props} /> : <></>;
      IconWrapper.displayName = `Si${name}Wrapper`;
      return IconWrapper;
    }),
    { ssr: false }
  );

// 🎖️ Individual badge with icon + animation
const TechBadge = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = useMemo(() => loadIcon(name), [name]);

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col items-center justify-center p-3 rounded-xl 
                 bg-zinc-900/70 hover:scale-105 hover:rotate-[-1deg] 
                 shadow-md hover:shadow-purple-400/40 transition-all"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {inView ? (
        <Icon className="text-3xl sm:text-4xl text-white group-hover:text-purple-400 transition-colors" />
      ) : (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full animate-pulse" />
      )}
      <p className="text-xs mt-2 text-white break-words whitespace-normal text-center">
        {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
      </p>
    </motion.div>
  );
};

// 🧠 Main section
export default function ToolsTech() {
  const { theme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);

  // 🎨 Dynamic theme styles
  const themeStyles = useMemo(
    () => ({
      gradientBg: isDark
        ? "from-[#1a102e] via-[#2a164b] to-[#1f0e3c]"
        : "from-[#f3e8ff] via-[#e9d5ff] to-[#ede9fe]",
      titleGradient: isDark
        ? "from-purple-400 via-fuchsia-500 to-pink-500"
        : "from-purple-600 via-fuchsia-600 to-pink-500",
      cardBg: isDark ? "bg-white/5" : "bg-white/70",
      paragraphText: isDark ? "text-zinc-300" : "text-zinc-700",
      headingText: isDark ? "text-purple-300" : "text-purple-700",
    }),
    [isDark]
  );

  return (
    <section
      id="tech"
      className={`relative w-full min-h-screen pt-16 pb-24 px-4 sm:px-6 md:px-16 
                  bg-gradient-to-br ${themeStyles.gradientBg} text-white 
                  scroll-mt-20 overflow-hidden transition-colors`}
    >
      {/* ✨ Background grid pattern + blur */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,#ffffff11_1%,transparent_1.2%)] bg-[length:22px_22px] opacity-10" />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${themeStyles.gradientBg} opacity-90 backdrop-blur-sm z-0`}
      />

      {/* 🌐 Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 🧠 Title */}
        <motion.h1
          className={`text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight 
                      leading-tight bg-gradient-to-r ${themeStyles.titleGradient} 
                      bg-clip-text text-transparent mb-6 drop-shadow-md`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          🛠️ Tools & Tech
        </motion.h1>

        {/* 📜 Description */}
        <motion.p
          className={`text-center max-w-xl mx-auto ${themeStyles.paragraphText} mb-12 text-sm sm:text-base`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          These are the technologies I’m learning, mastering, and using to build things I believe in.
        </motion.p>

        {/* 📦 Categories */}
        <div className="space-y-14">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
              viewport={{ once: true, amount: 0.3 }}
              className={`border border-purple-500/30 p-6 rounded-xl ${themeStyles.cardBg} 
                          backdrop-blur shadow-lg shadow-purple-900/10 
                          hover:shadow-purple-500/30 transition-shadow`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${themeStyles.headingText}`}>
                {category.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.items.map((item, i) => (
                  <TechBadge key={item} name={item} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
