'use client';

import { FaHome, FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';
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
  return (
    <div className="group fixed bottom-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-3 sm:py-4 w-fit flex items-center gap-3 sm:gap-4 rounded-full z-50 border border-white/10 bg-black/30 backdrop-blur-md shadow-lg transition-all duration-500
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-purple-500/20 before:to-blue-500/20 before:blur-2xl before:-z-10">
      {icons.map(({ icon, link, label }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group/icon flex flex-col items-center transition-all duration-300"
        >
          {/* Tooltip */}
          <span className="absolute -top-10 text-[10px] sm:text-xs bg-white text-black dark:bg-zinc-900 dark:text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow z-10">
            {label}
          </span>

          {/* Icon Bubble */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-blue-600 to-indigo-600 text-2xl sm:text-3xl text-white shadow-lg 
            transition-all duration-300 ease-out group-hover:scale-90 group-hover/icon:scale-125 hover:shadow-[0_0_20px_4px_rgba(99,102,241,0.6)]">
            {icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialBar;





