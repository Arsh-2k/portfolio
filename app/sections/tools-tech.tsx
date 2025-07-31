"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Tilt from "react-parallax-tilt";

/** Helper to normalize tech names to react-icons/si icon names */
function normalizeIconName(name: string): string {
  if (/^c\+\+$/i.test(name)) return "Cplusplus";
  if (/^node(\.|d)?js$/i.test(name)) return "Nodedotjs";
  if (/^vscode$/i.test(name)) return "Vscode";
  if (/^github$/i.test(name)) return "Github";
  if (/^css3$/i.test(name)) return "Css3";
  if (/^html5$/i.test(name)) return "Html5";
  // General: remove dots and capitalize first letter
  const clean = name.replace(/\./g, "").replace(/[^a-zA-Z0-9]/g, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/** Dynamic icon import by correct Si* name */
function loadIcon(name: string) {
  const iconName = `Si${normalizeIconName(name)}`;
  return dynamic<React.SVGProps<SVGSVGElement>>(
    () =>
      import("react-icons/si").then((mod) => {
        const Icon = (mod as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[iconName];
        return Icon || (() => null);
      }),
    { ssr: false }
  );
}

const categories = [
  { title: "💻 Languages", items: ["C", "Cplusplus", "Python", "Javascript"] },
  { title: "🌐 Frontend", items: ["Html5", "Css3", "Tailwindcss", "React"] },
  { title: "🧠 Backend", items: ["Nodedotjs", "Express"] },
  { title: "🗃️ Database", items: ["Mongodb"] },
  { title: "⚙️ Tools & Platforms", items: ["Git", "Github", "Vercel", "Vscode", "Appwrite", "Figma"] },
];

const Sparkle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={28} height={28} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <g filter="url(#blurredGlow)">
      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </g>
    <defs>
      <filter id="blurredGlow" x="0" y="0" width="20" height="20" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#a78bfa" floodOpacity="0.6" />
      </filter>
    </defs>
  </svg>
);

function TechBadge({ name, delay = 0 }: { name: string; delay?: number }) {
  const Icon = useMemo(() => loadIcon(name), [name]);
  const reduceMotion = useReducedMotion();
  // Inline key: ensures unique icon for each badge, avoids any import collision.

  return (
    <motion.div
      tabIndex={0}
      role="img"
      aria-label={name}
      className="group relative rounded-xl p-4 bg-zinc-900/60 shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-500 select-none will-change-transform transform-gpu"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={!reduceMotion ? { scale: 1.1, rotate: 1, boxShadow: "0 0 20px 4px #a78bfa" } : {}}
      whileFocus={!reduceMotion ? { scale: 1.1, rotate: 1, boxShadow: "0 0 24px 6px #c084fc" } : {}}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.25}
        glareColor="#a78bfa"
        glarePosition="all"
        scale={1.05}
        transitionSpeed={400}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        className="flex flex-col items-center justify-center"
      >
        <Icon className="text-4xl sm:text-5xl text-purple-400 group-hover:text-purple-200 transition-colors drop-shadow-lg" />
        <Sparkle className="absolute top-1 right-1 w-5 h-5 text-purple-300 animate-pulse opacity-75" />
        <p className="text-xs mt-3 text-white text-center tracking-wide font-semibold truncate max-w-full">
          {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </p>
      </Tilt>
    </motion.div>
  );
}

function TechCategory({ title, items, index }: { title: string; items: string[]; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      tabIndex={0}
      aria-label={title}
      className="relative rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-purple-700/40 shadow-xl shadow-purple-800/30 focus:outline-none focus:ring-4 focus:ring-purple-500"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.2, duration: 0.75, type: "spring", stiffness: 130 }}
      whileFocus={!reduceMotion ? { scale: 1.02, boxShadow: "0 0 24px 4px #a78bfa" } : {}}
    >
      {/* Floating sparkles */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none animate-[-rotate_120s_linear_infinite]">
        {[...Array(5)].map((_, i) => (
          <Sparkle
            key={i}
            className="absolute text-purple-900 opacity-30"
            style={{
              top: `${20 * i + 5}%`,
              left: `${(i * 35) % 100}%`,
              width: `${10 + i * 8}px`,
              height: `${10 + i * 8}px`,
              filter: `blur(${1 + i * 1.2}px)`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>
      <h2 className="mb-6 text-2xl font-extrabold text-purple-300 flex items-center gap-3 select-none tracking-wide">
        <motion.span
          className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.15, duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.span>
        <Sparkle className="w-7 h-7 text-purple-400 animate-ping-slow" />
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {items.map((tech, i) => (
          <TechBadge key={tech} name={tech} delay={i * 0.06} />
        ))}
      </div>
    </motion.section>
  );
}

export default function ToolsTech() {
  const { theme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);
  const themeStyles = useMemo(
    () => ({
      gradientBg: isDark
        ? "from-[#1a102e] via-[#2a164b] to-[#1f0e3c]"
        : "from-[#f3e8ff] via-[#e9d5ff] to-[#ede9fe]",
      titleGradient: isDark
        ? "from-purple-400 via-fuchsia-500 to-pink-500"
        : "from-purple-600 via-fuchsia-600 to-pink-500",
      paragraphText: isDark ? "text-zinc-300" : "text-zinc-700",
    }),
    [isDark]
  );

  return (
    <section
      id="tech"
      className={`relative w-full min-h-screen pt-16 pb-24 px-6 sm:px-10 md:px-16
                 bg-gradient-to-br ${themeStyles.gradientBg} text-white
                 scroll-mt-20 overflow-hidden transition-colors`}
    >
      {/* Soft animated grid pattern as background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#a78bfa22_1%,transparent_2%)] bg-[size:25px_25px] animate-[spin_120s_linear_infinite] opacity-10" />

      <div className="relative mx-auto max-w-7xl grid gap-12 grid-cols-1 md:grid-cols-2">
        {/* Intro panel */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight
                       bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent drop-shadow-lg`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            🛠️ Tools & Tech
          </motion.h1>
          <motion.p
            className={`max-w-lg sm:text-lg mt-4 ${themeStyles.paragraphText} select-none`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            These technologies fuel my passion for creating dynamic, innovative, and impactful software. Keeping this toolkit sharp is my daily mission.
          </motion.p>
        </div>
        {/* Category cards */}
        <div className="flex flex-col space-y-16">
          {categories.map((cat, i) => (
            <TechCategory key={cat.title} title={cat.title} items={cat.items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
