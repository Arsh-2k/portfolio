'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCode,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const icons = [
  { icon: <FaHome />, link: '#home', label: 'Home' },
  { icon: <FaCode />, link: '#projects', label: 'Projects' },
  { icon: <FaEnvelope />, link: 'mailto:arshpreet2k6@gmail.com', label: 'Email' },
  { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/arshpreet-singh-309726238', label: 'LinkedIn' },
  { icon: <SiLeetcode />, link: 'https://leetcode.com/u/Arsh-2k', label: 'LeetCode' },
  { icon: <FaGithub />, link: 'https://github.com/Arsh-2k', label: 'GitHub' },
];

const SocialBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true); // ensure animations only run client-side
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 left-4 sm:left-1/2 sm:-translate-x-1/2 z-50">
      {/* Mobile Toggle */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2b1055] to-[#2f0743] text-white text-xl shadow-xl ring-2 ring-white/10 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Social Links"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Social Bar */}
      <AnimatePresence>
        {isClient && (isOpen || window.innerWidth >= 640) && (
          <motion.div
            ref={containerRef}
            key="social-icons"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 14,
            }}
            className={`${
              isOpen ? 'flex' : 'hidden'
            } sm:flex flex-row items-center gap-2 sm:gap-4 p-3 sm:px-6 sm:py-3 bg-gradient-to-br from-[#11081f]/90 via-[#1e0d3b]/90 to-[#2c124c]/90 border border-white/10 shadow-xl rounded-xl sm:rounded-full mt-4 sm:mt-0 backdrop-blur-md animate-breath`}
          >
            {icons.map(({ icon, link, label }, index) => {
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && !isHovered;

              return (
                <motion.a
                  key={index}
                  href={link}
                  target={link.startsWith('#') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative group/icon flex flex-col items-center text-white"
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: -5 }}
                    animate={
                      isHovered
                        ? { opacity: 1, scale: 1, y: -8 }
                        : { opacity: 0, scale: 0.5, y: -5 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="absolute -top-8 sm:-top-10 text-[10px] sm:text-xs bg-white text-black dark:bg-zinc-800 dark:text-white px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap"
                  >
                    {label}
                  </motion.span>

                  {/* Icon with fluid scale & hover */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.35 : isOtherHovered ? 0.85 : 1,
                      rotate: isHovered ? 8 : 0,
                      y: isHovered ? -4 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 14,
                      bounce: 0.7,
                    }}
                    className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#602f83] via-[#9c27b0] to-[#6f42c1] text-lg sm:text-xl shadow-md transition-all duration-200"
                  >
                    {icon}
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialBar;
