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
  const [isMounted, setIsMounted] = useState(false); // 👈 Fix hydration mismatch

  useEffect(() => {
    setIsMounted(true); // ✅ Mount-safe animations only after client hydration
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
    toast("Resume download coming soon 👀", { icon: "📄" });
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#tools-tech", label: "Tools & Tech" },
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
        <div>
          {isMounted ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text animate-text-glow"
            >
              Arshpreet Singh
            </motion.div>
          ) : (
            <div className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
              Arshpreet Singh
            </div>
          )}
        </div>

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
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 rounded-full bg-white/50 dark:bg-black/30 shadow-md border border-purple-500 hover:shadow-purple-500/30 transition-all"
          whileTap={{ scale: 0.8, rotate: 15 }}
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 8px rgba(168, 85, 247, 0.6)",
          }}
        >
          {menuOpen ? <X size={24} className="text-purple-600" /> : <Menu size={24} className="text-purple-500" />}
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden mx-4 mt-2 p-4 space-y-3 rounded-2xl border border-purple-400/30 
              bg-gradient-to-br from-white/80 via-white/60 to-purple-100/60 dark:from-black/50 dark:via-[#1a0024]/40 dark:to-[#1a0024]/60
              shadow-2xl backdrop-blur-md"
          >
            {navLinks.map((link) => (
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                key={link.href}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "block text-sm font-semibold hover:text-purple-600 transition-all",
                    activeLink === link.href && "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                showResumeToast();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 text-sm font-semibold hover:text-purple-600 transition-all"
            >
              <Download size={16} /> Resume
            </motion.button>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Theme</span>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 5 }}
                onClick={() => {
                  toggleDarkMode();
                  setMenuOpen(false);
                }}
                className={clsx(
                  "p-2 rounded-full shadow-md border border-purple-400",
                  darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-400 hover:bg-purple-500"
                )}
                aria-label="Toggle Dark Mode (Mobile)"
              >
                {darkMode ? <Moon className="text-white w-5 h-5" /> : <Sun className="text-yellow-300 w-5 h-5" />}
              </motion.button>
            </div>

            {/* Optional Kilua Line Pulse */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse rounded-full mt-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
