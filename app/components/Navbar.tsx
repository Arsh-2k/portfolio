'use client';

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
    toast.success(`Switched to ${!darkMode ? "Dark" : "Light"} Mode`, {
      icon: darkMode ? "🌞" : "🌙",
    });
  };

  const showResumeToast = () => {
    toast("Resume download coming soon 👀", {
      icon: "📄",
    });
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
    { href: "#idea-vault", label: "Idea Vault" },
  ];

  return (
    <nav
      className={clsx(
        "w-full fixed top-0 left-0 z-50 transition-all duration-500 backdrop-blur-xl",
        "bg-gradient-to-r from-purple-100/70 via-white/40 to-purple-100/70",
        "dark:from-[#1a0024]/80 dark:via-black/30 dark:to-[#1a0024]/80",
        scrolled && "shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text animate-text-glow"
        >
          Arshpreet Singh
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.2, textShadow: "0px 0px 8px rgba(168, 85, 247, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={link.href}
                className={clsx(
                  "transition-all duration-300 hover:text-purple-500 hover:drop-shadow-md",
                  activeLink === link.href && "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.button
            onClick={showResumeToast}
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full text-purple-700 dark:text-purple-300 border border-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            <Download size={16} /> Resume
          </motion.button>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Theme</span>
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
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-purple-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 pb-4 pt-2 space-y-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-b from-white/70 to-white/30 dark:from-black/50 dark:to-[#1a0024]/70 backdrop-blur-lg shadow-inner"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "block hover:text-purple-500 hover:pl-2 transition-all duration-300",
                  activeLink === link.href && "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                showResumeToast();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:text-purple-500 hover:pl-2 transition-all duration-300"
            >
              <Download size={16} /> Resume
            </button>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Theme</span>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setMenuOpen(false);
                }}
                className={clsx(
                  "p-2 rounded-full transition-all shadow-md",
                  darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-400 hover:bg-purple-500",
                  "hover:scale-110"
                )}
                aria-label="Toggle Dark Mode (Mobile)"
              >
                {darkMode ? <Moon className="text-white w-5 h-5" /> : <Sun className="text-yellow-300 w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
