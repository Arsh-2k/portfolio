"use client";

import { ReactNode, useEffect } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className={clsx(
        "snap-start", // 🧭 Snap scrolling behavior
        `relative w-full min-h-screen px-6 py-16 flex flex-col justify-center items-center
         overflow-hidden transition-all duration-500 group`, // 🎯 Layout
        "bg-gradient-to-br from-[#f5f3ff] via-[#f0f0ff] to-[#f5f3ff] dark:from-[#0f0a1b] dark:via-[#1b1035] dark:to-[#0f0a1b]", // 🌗 Adaptive background
        className
      )}
    >
      {/* 🔮 Glow Border Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full animate-pulse border-2 border-indigo-500/20 rounded-[24px] blur-sm"></div>
        <div className="absolute w-full h-full border-2 border-indigo-400/40 rounded-[24px] animate-[spin_20s_linear_infinite] opacity-10"></div>
      </div>

      {/* ✨ Radial Aura Overlay */}
      <div className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),_transparent_70%)] animate-[pulse_10s_infinite] z-0"></div>

      {/* 💎 Actual Section Content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </motion.section>
  );
}
