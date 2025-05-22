'use client';

import { useState } from 'react';
import { FaHome, FaLinkedin, FaGithub, FaEnvelope, FaCode, FaBars, FaTimes } from 'react-icons/fa';
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

  return (
    <div className="fixed bottom-4 left-4 sm:left-1/2 sm:-translate-x-1/2 z-50">
      {/* Toggle button for mobile */}
      <button
        className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Social Links"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Horizontal bar on desktop, vertical menu on mobile */}
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } sm:flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:px-6 sm:py-3 bg-black/30 backdrop-blur-md border border-white/10 shadow-lg rounded-3xl sm:rounded-full mt-4 sm:mt-0 transition-all duration-500
        before:content-[''] before:absolute before:inset-0 before:rounded-3xl sm:before:rounded-full before:bg-gradient-to-br before:from-purple-500/20 before:to-blue-500/20 before:blur-2xl before:-z-10`}
      >
        {icons.map(({ icon, link, label }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group/icon flex flex-col items-center text-white transition-all duration-300"
          >
            <span className="absolute -top-8 sm:-top-10 text-[10px] sm:text-xs bg-white text-black dark:bg-zinc-900 dark:text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow z-10">
              {label}
            </span>
            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-blue-600 to-indigo-600 text-lg sm:text-2xl shadow-md transition-all duration-300 group-hover:scale-90 group-hover/icon:scale-110 hover:shadow-[0_0_12px_2px_rgba(99,102,241,0.5)]">
              {icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;






