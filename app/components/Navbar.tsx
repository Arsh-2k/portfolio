"use client";

import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Laugh,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [mode, setMode] = useState("formal");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#tools-tech", label: "Tools & Tech" },
      { href: "#contact", label: "Contact" },
      { href: "#idea-vault", label: "Idea Vault" },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("uimode");
    if (savedMode === "fun" || savedMode === "formal") setMode(savedMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMenuOpen(false), 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [menuOpen]);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, {
      icon: newTheme === "dark" ? "🌙" : "🌞",
    });
  }, [theme, setTheme, mounted]);

  const toggleMode = () => {
    const newMode = mode === "fun" ? "formal" : "fun";
    setMode(newMode);
    localStorage.setItem("uimode", newMode);
    toast(`Switched to ${newMode === "fun" ? "Fun 🎉" : "Formal 💼"} Mode`, {
      icon: newMode === "fun" ? "🥳" : "🧑‍💼",
    });
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl",
        "bg-gradient-to-r from-violet-500/80 via-purple-700/80 to-indigo-600/80",
        "dark:from-[#1a0024]/80 dark:via-purple-900/50 dark:to-[#1a0024]/80",
        scrolled && "shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Branding */}
        <div
          className={clsx(
            "text-2xl sm:text-3xl font-extrabold animate-text-glow",
            theme === "light"
              ? "text-violet-800 drop-shadow-md"
              : "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg"
          )}
        >
          Arshpreet Singh
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "font-semibold text-sm transition-all",
                activeLink === link.href
                  ? "text-white underline underline-offset-4"
                  : "text-gray-200 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {mounted && (
            <>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-violet-600 dark:bg-purple-700 shadow-md"
              >
                {theme === "dark" ? (
                  <Moon className="text-white w-5 h-5" />
                ) : (
                  <Sun className="text-yellow-500 w-5 h-5" />
                )}
              </button>
              <button
                onClick={toggleMode}
                className="p-2 rounded-full bg-indigo-500 dark:bg-indigo-800"
              >
                {mode === "fun" ? (
                  <Laugh className="text-white w-5 h-5" />
                ) : (
                  <Briefcase className="text-white w-5 h-5" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle Mobile Menu"
          className="md:hidden flex items-center gap-2 p-2 rounded-full bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-600 text-white shadow-lg"
          whileTap={{ scale: 0.9, rotate: 10 }}
          whileHover={{ scale: 1.1 }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-xs font-bold">Menu</span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={clsx(
              "md:hidden fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl border shadow-2xl",
              "bg-white text-gray-800 border-violet-300",
              "dark:bg-[#1a0024]/90 dark:text-gray-100 dark:border-violet-400/30"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "block py-1 font-semibold",
                  activeLink === link.href
                    ? "text-violet-700 dark:text-violet-300 underline"
                    : "hover:text-violet-500 dark:hover:text-violet-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-around pt-3">
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="p-2 rounded-full bg-violet-600 dark:bg-purple-700"
              >
                {theme === "dark" ? (
                  <Moon className="text-white w-5 h-5" />
                ) : (
                  <Sun className="text-yellow-500 w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => {
                  toggleMode();
                  setMenuOpen(false);
                }}
                className="p-2 rounded-full bg-indigo-500 dark:bg-indigo-800"
              >
                {mode === "fun" ? (
                  <Laugh className="text-white w-5 h-5" />
                ) : (
                  <Briefcase className="text-white w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
