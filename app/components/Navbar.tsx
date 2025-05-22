"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="w-full fixed z-50 top-0 left-0 shadow-md transition-all duration-500 bg-gradient-to-r from-purple-100/70 via-white/50 to-purple-100/70 dark:from-[#1a0024]/80 dark:via-black/30 dark:to-[#1a0024]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Arshpreet 🚀
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Link href="#about" className="hover:text-purple-500 transition-colors">About</Link>
            <Link href="#projects" className="hover:text-purple-500 transition-colors">Projects</Link>
            <Link href="#contact" className="hover:text-purple-500 transition-colors">Contact</Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={clsx(
              "p-2 rounded-full transition-all shadow-md",
              darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-400 hover:bg-purple-500",
              "hover:scale-110"
            )}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Moon className="text-white w-5 h-5" /> : <Sun className="text-yellow-300 w-5 h-5" />}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-purple-500"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-b from-white/70 to-white/30 dark:from-black/50 dark:to-[#1a0024]/70 backdrop-blur-lg shadow-inner">
          <Link href="#about" className="block hover:text-purple-500">About</Link>
          <Link href="#projects" className="block hover:text-purple-500">Projects</Link>
          <Link href="#contact" className="block hover:text-purple-500">Contact</Link>
        </div>
      )}
    </nav>
  );
}

