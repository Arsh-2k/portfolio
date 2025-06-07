"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#tools-tech", label: "Tools & Tech" },
  { href: "#contact", label: "Contact" },
  { href: "#idea-vault", label: "Idea Vault" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link tracking
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
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // ESC to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, {
      icon: newTheme === "dark" ? "🌙" : "🌞",
    });
  };

  const showResumeToast = () => {
    toast("Resume download coming soon 👀", { icon: "📄" });
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl",
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
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700 dark:text-gray-300 relative">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <Link
                href={link.href}
                className={clsx(
                  "transition-all duration-300 hover:text-purple-500",
                  activeLink === link.href &&
                    "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                )}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          <motion.button
            onClick={showResumeToast}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full text-purple-700 dark:text-purple-300 border border-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            <Download size={16} /> Resume
          </motion.button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-purple-400 dark:bg-purple-600 hover:scale-110 transition-all shadow-md"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Moon className="text-white w-5 h-5" />
            ) : (
              <Sun className="text-yellow-300 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Mobile Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden p-2 rounded-full bg-white/50 dark:bg-black/30 border border-purple-500 shadow-md"
          whileTap={{ scale: 0.9, rotate: 10 }}
          whileHover={{ scale: 1.1 }}
        >
          {menuOpen ? (
            <X size={24} className="text-purple-600" />
          ) : (
            <Menu size={24} className="text-purple-500" />
          )}
        </motion.button>
      </div>

      {/* Mobile Overlay Background */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Mobile Drawer */}
            <motion.div
              id="mobile-menu"
              role="menu"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 left-4 right-4 z-50 p-4 space-y-4 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-white/80 via-white/60 to-purple-100/60 dark:from-black/50 dark:via-[#1a0024]/40 dark:to-[#1a0024]/60 shadow-2xl backdrop-blur-md"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "block text-sm font-semibold hover:text-purple-600",
                    activeLink === link.href &&
                      "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  showResumeToast();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 text-sm font-semibold hover:text-purple-600"
              >
                <Download size={16} /> Resume
              </motion.button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Theme
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className="p-2 rounded-full shadow-md border border-purple-400 bg-purple-400 dark:bg-purple-600"
                >
                  {theme === "dark" ? (
                    <Moon className="text-white w-5 h-5" />
                  ) : (
                    <Sun className="text-yellow-300 w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
