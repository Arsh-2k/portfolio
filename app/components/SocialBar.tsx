"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCode,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { GiCricketBat } from "react-icons/gi";

const icons = [
  { icon: <FaHome />, link: "#home", label: "Home" },
  { icon: <FaCode />, link: "#projects", label: "Projects" },
  {
    icon: <FaEnvelope />,
    link: "mailto:arshpreetsinghcse@gmail.com",
    label: "Email",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/arshpreet-singh-309726238",
    label: "LinkedIn",
  },
  {
    icon: <SiLeetcode />,
    link: "https://leetcode.com/u/Arsh-2k",
    label: "LeetCode",
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/Arsh-2k",
    label: "GitHub",
  },
];

const SocialBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [tossResult, setTossResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && windowWidth! < 640) {
      const timer = setTimeout(() => setIsOpen(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, windowWidth]);

  // 👇 New useEffect to auto-hide toss result
  useEffect(() => {
    if (tossResult) {
      const resultTimeout = setTimeout(() => {
        setTossResult(null);
      }, 3000);
      return () => clearTimeout(resultTimeout);
    }
  }, [tossResult]);

  const handleToss = () => {
    setIsFlipping(true);
    setTossResult(null);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails";
      setTossResult(result);
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[9999]">
      {/* Mobile Toggle */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className="sm:hidden w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white text-xl shadow-2xl ring-2 ring-white/10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Social Links"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Social Bar */}
      <AnimatePresence>
        {isClient && (isOpen || windowWidth! >= 640) && (
          <motion.div
            key="social-bar"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="flex flex-row items-center gap-3 sm:gap-5 p-3 sm:px-7 sm:py-4 backdrop-blur-lg bg-gradient-to-br from-[#190029]/80 via-[#1e003f]/80 to-[#2c004c]/80 border border-white/10 shadow-2xl rounded-xl sm:rounded-full animate-breath-glow relative mt-2 sm:mt-0"
          >
            {icons.map(({ icon, link, label }, index) => {
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && !isHovered;

              return (
                <motion.a
                  key={index}
                  href={link}
                  target={link.startsWith("#") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileTap={{ scale: 0.92 }}
                  className="relative group/icon flex flex-col items-center text-white"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: -6 }}
                    animate={
                      isHovered
                        ? { opacity: 1, scale: 1, y: -12 }
                        : { opacity: 0, scale: 0.5, y: -6 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 12,
                    }}
                    className="absolute -top-8 sm:-top-10 text-[10px] sm:text-xs bg-white text-black dark:bg-zinc-900 dark:text-white px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap"
                  >
                    {label}
                  </motion.span>

                  <motion.div
                    animate={{
                      scale: isHovered ? 1.4 : isOtherHovered ? 0.85 : 1,
                      rotate: isHovered ? 10 : 0,
                      y: isHovered ? -3 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#7f00ff] via-[#e100ff] to-[#8e2de2] text-xl neon-glow border border-white/10 shadow-xl hover:shadow-purple-500/50 transition-shadow duration-300"
                  >
                    {icon}
                  </motion.div>
                </motion.a>
              );
            })}

            {/* Toss Coin Button */}
            <motion.button
              onClick={handleToss}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredIndex(icons.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group/icon flex flex-col items-center text-white"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5, y: -6 }}
                animate={
                  hoveredIndex === icons.length
                    ? { opacity: 1, scale: 1, y: -12 }
                    : { opacity: 0, scale: 0.5, y: -6 }
                }
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 12,
                }}
                className="absolute -top-8 sm:-top-10 text-[10px] sm:text-xs bg-white text-black dark:bg-zinc-900 dark:text-white px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap"
              >
                Toss a coin!
              </motion.span>

              <motion.div
                animate={{
                  scale:
                    hoveredIndex === icons.length
                      ? 1.4
                      : hoveredIndex !== null
                      ? 0.85
                      : 1,
                  rotate: hoveredIndex === icons.length ? 10 : 0,
                  y: hoveredIndex === icons.length ? -3 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-700 via-green-600 to-lime-500 text-xl neon-glow border border-white/10 shadow-xl hover:shadow-green-500/50 transition-shadow duration-300"
              >
                <GiCricketBat />
              </motion.div>
            </motion.button>

            {/* Toss Coin Animation */}
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  key="coin"
                  initial={{ rotateY: 0, scale: 0.5, opacity: 0 }}
                  animate={{ rotateY: 720, scale: 1.2, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute bottom-full mb-4 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-yellow-300 text-black dark:text-black"
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  🪙
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toss Result */}
            <AnimatePresence>
              {tossResult && !isFlipping && (
                <motion.div
                  key="tossResult"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: -30 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-full mb-4 px-4 py-2 bg-white text-black dark:bg-zinc-900 dark:text-white rounded-full shadow-md font-semibold text-sm sm:text-base"
                >
                  {tossResult} 🪙
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialBar;
