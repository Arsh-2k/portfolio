"use client";

import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, Variants } from "framer-motion";

// SSR-safe mobile check
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
  const isMobile = useIsMobile();

  // Animation: slightly less y-offset on mobile for speed and space
  const variants: Variants = isMobile
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
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
      // Mobile: minimal px/padding, bg, no aura, no glass
      className={clsx(
        "snap-start relative w-full min-h-screen flex flex-col justify-center items-center",
        isMobile
          ? [
              "px-2 py-6",                // tight
              "bg-white dark:bg-black",   // flat
              "transition-none",          // fastest
              "overflow-visible",
            ]
          : [
              "px-6 py-16",              // big
              "overflow-hidden transition-all duration-500 group",
              "bg-gradient-to-br from-[#f5f3ff] via-[#f0f0ff] to-[#f5f3ff]",
              "dark:from-[#0f0a1b] dark:via-[#1b1035] dark:to-[#0f0a1b]",
            ],
        className
      )}
    >
      {/* Desktop/tablet: glass border and radial backgrounds */}
      {!isMobile && (
        <>
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
        </>
      )}

      {/* Actual Section Content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </motion.section>
  );
}
