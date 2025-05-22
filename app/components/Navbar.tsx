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
    <nav className="w-full fixed z-50 top-0 left-0 backdrop-blur-xl bg-white/30 dark:bg-black/30 shadow-md transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
          Arshpreet 🚀
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-semibold">
            <Link href="#about" className="hover:text-purple-500 transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-purple-500 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-purple-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={clsx(
              "p-2 rounded-full transition-all",
              darkMode ? "bg-purple-600" : "bg-purple-400",
              "hover:scale-110"
            )}
          >
            {darkMode ? <Moon className="text-white w-5 h-5" /> : <Sun className="text-yellow-300 w-5 h-5" />}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-purple-500"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
          <Link href="#about" className="block text-sm font-semibold hover:text-purple-500">
            About
          </Link>
          <Link href="#projects" className="block text-sm font-semibold hover:text-purple-500">
            Projects
          </Link>
          <Link href="#contact" className="block text-sm font-semibold hover:text-purple-500">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
