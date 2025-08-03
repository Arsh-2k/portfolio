"use client";

import { useState, useEffect, useMemo, type ComponentType, type SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Tilt from "react-parallax-tilt";

// --- UTIL: Normalize names to react-icons/si exports ---
function normalizeIconName(name: string): string {
  if (/^c\+\+$/i.test(name)) return "Cplusplus";
  if (/^node(\.|d)?js$/i.test(name)) return "Nodedotjs";
  if (/^vscode$/i.test(name)) return "Vscode";
  if (/^github$/i.test(name)) return "Github";
  if (/^css3$/i.test(name)) return "Css3";
  if (/^html5$/i.test(name)) return "Html5";
  const clean = name.replace(/\./g, "").replace(/[^a-zA-Z0-9]/g, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

// --- UTIL: Dynamic import for react-icons/si ---
function loadIcon(name: string) {
  const iconName = `Si${normalizeIconName(name)}`;
  return dynamic(() =>
    import("react-icons/si").then((mod) => {
      const Icon = (mod as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[iconName];
      return Icon ?? (() => null);
    }), { ssr: false }
  ) as ComponentType<SVGProps<SVGSVGElement>>;
}

// --- DATA: Tech categories ---
const categories = [
  { title: "💻 Languages", items: ["C", "Cplusplus", "Python", "Javascript"] },
  { title: "🌐 Frontend", items: ["Html5", "Css3", "Tailwindcss", "React"] },
  { title: "🧠 Backend", items: ["Nodedotjs", "Express"] },
  { title: "🗃️ Database", items: ["Mongodb"] },
  { title: "⚙️ Tools & Platforms", items: ["Git", "Github", "Vercel", "Vscode", "Appwrite", "Figma"] },
];

// --- COMPONENT: Sparkle effect ---
const Sparkle = (props: SVGProps<SVGSVGElement>) => (
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

type ThemeStyles = {
  gradientBg: string;
  titleGradient: string;
  paragraphText: string;
};

// --- COMPONENT: Tech Badge ---
function TechBadge({
  name,
  delay = 0,
  mounted,
}: {
  name: string;
  delay?: number;
  mounted: boolean;
}) {
  const reduceMotion = useReducedMotion();
  // Hook must run always
  const Icon = useMemo(() => loadIcon(name), [name]);
  const IconComponent = Icon;

  if (!mounted) return (
    <div
      tabIndex={0}
      role="img"
      aria-label={name}
      className="group relative rounded-xl p-4 bg-zinc-900/60 shadow-lg select-none min-h-[96px] animate-pulse"
      style={{ minWidth: 96, minHeight: 96 }}
    >
      <div className="h-10 w-10 rounded bg-purple-100 dark:bg-purple-900/30 mx-auto mb-3" />
      <div className="h-6 w-16 mx-auto rounded bg-zinc-700/60" />
    </div>
  );

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
        <IconComponent className="text-4xl sm:text-5xl text-purple-400 group-hover:text-purple-200 transition-colors drop-shadow-lg" />
        <Sparkle className="absolute top-1 right-1 w-5 h-5 text-purple-300 animate-pulse opacity-75" />
        <p className="text-xs mt-3 text-white text-center tracking-wide font-semibold truncate max-w-full">
          {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </p>
      </Tilt>
    </motion.div>
  );
}

// --- COMPONENT: Tech Category ---
function TechCategory({
  title,
  items,
  index,
  mounted,
}: {
  title: string;
  items: string[];
  index: number;
  mounted: boolean;
  themeStyles: ThemeStyles;
}) {
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
          <TechBadge key={tech} name={tech} delay={i * 0.06} mounted={mounted} />
        ))}
      </div>
    </motion.section>
  );
}

// --- MAIN COMPONENT ---
export default function ToolsTech() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";
  const themeStyles = useMemo<ThemeStyles>(
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

  if (!mounted) {
    // SSR skeleton
    return (
      <section
        id="tech"
        className="relative w-full min-h-screen pt-16 pb-24 px-6 sm:px-10 md:px-16
                  bg-gradient-to-br from-[#f3e8ff] via-[#e9d5ff] to-[#ede9fe]
                  text-white scroll-mt-20 overflow-hidden transition-colors"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#a78bfa22_1%,transparent_2%)] bg-[size:25px_25px] animate-[spin_120s_linear_infinite] opacity-10" />
        <div className="relative mx-auto max-w-7xl grid gap-12 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-purple-800 opacity-50">
              🛠️ Tools &amp; Tech
            </h1>
            <p className="max-w-lg sm:text-lg mt-4 text-zinc-700 select-none opacity-50">
              Loading...
            </p>
          </div>
          <div className="flex flex-col space-y-16">
            {categories.map((cat) => (
              <section
                key={cat.title}
                className="relative rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-purple-700/40 shadow-xl shadow-purple-800/30"
              >
                <div className="mb-6 h-7 w-44 bg-purple-200/50 rounded animate-pulse" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {cat.items.map((tech) => (
                    <div
                      key={tech}
                      className="group relative rounded-xl p-4 bg-zinc-900/60 shadow-lg select-none animate-pulse min-h-[96px]"
                      style={{ minWidth: 96, minHeight: 96 }}
                    >
                      <div className="h-10 w-10 rounded bg-purple-100 dark:bg-purple-900/30 mx-auto mb-3" />
                      <div className="h-6 w-16 mx-auto rounded bg-zinc-700/60" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tech"
      className={`relative w-full min-h-screen pt-16 pb-24 px-6 sm:px-10 md:px-16
                bg-gradient-to-br ${themeStyles.gradientBg} text-white
                scroll-mt-20 overflow-hidden transition-colors`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,#a78bfa22_1%,transparent_2%)] bg-[size:25px_25px] animate-[spin_120s_linear_infinite] opacity-10" />
      <div className="relative mx-auto max-w-7xl grid gap-12 grid-cols-1 md:grid-cols-2">
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
        <div className="flex flex-col space-y-16">
          {categories.map((cat, i) => (
            <TechCategory
              key={cat.title}
              title={cat.title}
              items={cat.items}
              index={i}
              mounted={mounted}
              themeStyles={themeStyles}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
