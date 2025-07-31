"use client";

import { ReactNode, useEffect } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, Variants } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,       // Reveal when 20% of section is visible
    triggerOnce: false,   // Keep responding to in/out view
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={clsx(
        "snap-start relative w-full min-h-screen px-6 py-16 flex flex-col justify-center items-center",
        "overflow-hidden transition-all duration-500 group",
        // Background: Soft light/dark gradient
        "bg-gradient-to-br from-[#f5f3ff] via-[#f0f0ff] to-[#f5f3ff]",
        "dark:from-[#0f0a1b] dark:via-[#1b1035] dark:to-[#0f0a1b]",
        className
      )}
    >
      {/* Animated Glow Border */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full animate-pulse border-2 border-indigo-500/20 rounded-[24px] blur-sm" />
        <div className="absolute w-full h-full border-2 border-indigo-400/40 rounded-[24px] animate-spin opacity-10" />
      </div>

      {/* Radial Pulse Background Aura */}
      <div
        className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] z-0
          bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_70%)]
          animate-pulse"
        style={{ animationDuration: "10s", animationIterationCount: "infinite" }}
      />

      {/* Actual Section Content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </motion.section>
  );
}
