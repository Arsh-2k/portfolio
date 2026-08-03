"use client";

import {
  useState,
  useEffect,
  useMemo,
  type ComponentType,
  type SVGProps,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Tilt from "react-parallax-tilt";
import useIsMobile from "../hooks/useIsMobile";
import usePortfolioMode from "../hooks/usePortfolioMode";

// Icon loader
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

function loadIcon(name: string) {
  const iconName = `Si${normalizeIconName(name)}`;
  return dynamic(() =>
    import("react-icons/si").then((mod) => {
      const Icon = (mod as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[iconName];
      return Icon ?? (() => null);
    }),
    { ssr: false }
  ) as ComponentType<SVGProps<SVGSVGElement>>;
}

// DATA - Updated to reflect low-latency & software engineering focus
const categories = [
  { funTitle: "💻 Core & Systems", formalTitle: "CORE & SYSTEMS", items: ["Cplusplus", "C", "Java", "Python"] },
  { funTitle: "🌐 Frontend", formalTitle: "FRONTEND", items: ["Html5", "Css3", "Tailwindcss", "React"] },
  { funTitle: "🧠 Backend", formalTitle: "BACKEND & DB", items: ["Nodedotjs", "Express", "Mongodb"] },
  { funTitle: "⚙️ Tools & Hardware", formalTitle: "TOOLS & ENV", items: ["Git", "Github", "Vscode", "Figma", "Appwrite"] },
];

type ThemeStyles = {
  gradientBg: string;
  titleGradient: string;
  paragraphText: string;
};

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

// --- FORMAL MODE BADGE ---
function TechBadgeFormal({ name, mounted }: { name: string; mounted: boolean }) {
  const Icon = useMemo(() => loadIcon(name), [name]);
  return (
    <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors select-none">
      {mounted ? (
        <Icon className="text-xl text-black dark:text-white" />
      ) : (
        <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
      )}
      <span className="font-mono text-sm font-bold uppercase tracking-tight text-gray-900 dark:text-gray-200 truncate">
        {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
      </span>
    </div>
  );
}

// --- FUN MODE BADGE (Mobile) ---
function TechBadgeMobile({ name, mounted }: { name: string; mounted: boolean }) {
  const Icon = useMemo(() => loadIcon(name), [name]);
  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={name}
      className="flex flex-col items-center justify-center rounded-lg p-2 bg-zinc-900/75 border border-purple-200 dark:border-zinc-800 shadow select-none min-w-[52px] min-h-[62px] mx-1 mb-2"
      style={{ width: 56 }}
    >
      {mounted ? (
        <Icon className="text-2xl text-purple-400 mb-1" />
      ) : (
        <div className="w-8 h-8 rounded bg-purple-100 dark:bg-purple-900/40 mb-1 animate-pulse" />
      )}
      <span className="text-[11px] leading-4 font-semibold text-white/90 text-center truncate max-w-[68px]">
        {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
      </span>
    </div>
  );
}

// --- FUN MODE BADGE (Desktop) ---
function TechBadge({ name, delay = 0, mounted }: { name: string; delay?: number; mounted: boolean }) {
  const reduceMotion = useReducedMotion();
  const Icon = useMemo(() => loadIcon(name), [name]);
  const IconComponent = Icon;
  
  if (!mounted)
    return (
      <div className="group relative rounded-xl p-4 bg-zinc-900/60 shadow-lg select-none min-h-[96px] animate-pulse" style={{ minWidth: 96, minHeight: 96 }}>
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
      <Tilt glareEnable glareMaxOpacity={0.25} glareColor="#a78bfa" glarePosition="all" scale={1.05} transitionSpeed={400} tiltMaxAngleX={10} tiltMaxAngleY={10} className="flex flex-col items-center justify-center">
        <IconComponent className="text-4xl sm:text-5xl text-purple-400 group-hover:text-purple-200 transition-colors drop-shadow-lg" />
        <Sparkle className="absolute top-1 right-1 w-5 h-5 text-purple-300 animate-pulse opacity-75" />
        <p className="text-xs mt-3 text-white text-center tracking-wide font-semibold truncate max-w-full">
          {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </p>
      </Tilt>
    </motion.div>
  );
}

// --- FUN MODE CATEGORY (Desktop) ---
function TechCategory({ title, items, index, mounted }: {
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
  const isMobile = useIsMobile();
  const mode = usePortfolioMode();
  const isFormal = mode === "formal";

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

  const allTech = categories.flatMap(cat => cat.items);

  // --- FORMAL MODE RENDER ---
  if (isFormal) {
    return (
      <section
        id="tech"
        className="min-h-screen w-full px-4 sm:px-6 md:px-12 py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-gray-200 transition-colors duration-500 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          
          <div className="md:w-1/3 flex flex-col justify-center items-start text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase border-b-4 border-black dark:border-white pb-4 mb-4">
              Tech Stack
            </h1>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-400 leading-relaxed">
              &gt; STATUS: SYSTEMS_INITIALIZED<br/>
              &gt; Engineered for high-performance and low-latency environments. Toolkit encompasses full-stack web infrastructure and core systems languages.
            </p>
          </div>

          <div className="md:w-2/3 flex flex-col space-y-8">
            {categories.map((cat) => (
              <div key={cat.formalTitle} className="border-l-2 border-gray-300 dark:border-zinc-800 pl-4 sm:pl-6">
                <h2 className="text-lg font-mono font-bold text-gray-800 dark:text-gray-300 mb-4 tracking-widest">
                  {/* Fixed comment node syntax */}
                  {`// ${cat.formalTitle}`}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cat.items.map((tech) => (
                    <TechBadgeFormal key={tech} name={tech} mounted={mounted} />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // --- FUN MODE RENDER (Mobile) ---
  if (isMobile && !isFormal) {
    return (
      <section
        id="tech"
        className="min-h-screen w-full flex flex-col px-2 pt-10 pb-2 justify-center items-center bg-gradient-to-br from-white via-violet-50 to-purple-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-purple-950"
      >
        <div className="w-[94vw] max-w-xs flex flex-col shadow-2xl rounded-2xl border border-purple-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 p-4 items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-2">
            🛠️ Tools & Tech
          </h1>
          <div className="flex flex-wrap justify-center mb-1">
            {categories.map(cat => (
              <span key={cat.funTitle} className="bg-purple-100 dark:bg-purple-800 text-xs font-medium text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded-full mx-0.5 mb-2">
                {cat.funTitle.replace(/^[^a-zA-Z]+/, '')}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap w-full justify-center items-center ">
            {allTech.map(tech => (
              <TechBadgeMobile key={tech} name={tech} mounted={mounted} />
            ))}
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2 text-center px-2">
          <span className="font-medium">Stack summary:</span> All categories, all the best tools—ready for real-world builds!
        </p>
      </section>
    );
  }

  // --- FUN MODE RENDER (Desktop) ---
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
              key={cat.funTitle}
              title={cat.funTitle}
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