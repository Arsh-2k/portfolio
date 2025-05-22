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
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-black/20 backdrop-blur-md px-6 py-4 rounded-full shadow-lg z-50 border border-white/10 dark:border-white/20">
      {icons.map(({ icon, link, label }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center text-white dark:text-white transition-all duration-300"
        >
          {/* Label */}
          <span className="absolute -top-8 text-sm bg-white text-black dark:bg-zinc-900 dark:text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow">
            {label}
          </span>

          {/* Icon with scaling effect */}
          <div className="p-4 bg-blue-600 dark:bg-blue-500 rounded-full text-xl shadow-md transition-transform transform group-hover:scale-150 hover:bg-blue-700 dark:hover:bg-blue-600">
            {icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialBar;


