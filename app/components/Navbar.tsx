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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  
  // Set default to "fun" to match Hero section
  const [mode, setMode] = useState<"fun" | "formal">("fun"); 
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Nav links memoized once
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

  // Mark mounted & Setup Global Event Listener
  useEffect(() => {
    setMounted(true);
    
    // 1. Read shared state on mount
    const savedMode = localStorage.getItem("portfolioMode");
    if (savedMode === "fun" || savedMode === "formal") setMode(savedMode);

    // 2. Listen for changes from the Hero section
    const handleModeSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) setMode(customEvent.detail);
    };
    window.addEventListener("portfolioModeChanged", handleModeSync);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("portfolioModeChanged", handleModeSync);
    };
  }, []);

  // Scroll listener: detect scroll position & close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to track active nav link on scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

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

  // Keyboard ESC closes mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Auto close mobile menu after 5 seconds of opening
  useEffect(() => {
    if (menuOpen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMenuOpen(false), 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [menuOpen]);

  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    const currentTheme = resolvedTheme || theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, {
      icon: newTheme === "dark" ? "🌙" : "🌞",
    });
  }, [mounted, setTheme, theme, resolvedTheme]);

  // Mode toggle handler
  const toggleMode = () => {
    const newMode = mode === "fun" ? "formal" : "fun";
    setMode(newMode);
    
    // Broadcast change to Hero section
    localStorage.setItem("portfolioMode", newMode);
    window.dispatchEvent(new CustomEvent("portfolioModeChanged", { detail: newMode }));
    
    toast(`Switched to ${newMode === "fun" ? "Fun 🎉" : "Formal 💼"} Mode`, {
      icon: newMode === "fun" ? "🥳" : "🧑‍💼",
    });
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl",
        "bg-gradient-to-r from-violet-500/80 via-purple-700/80 to-indigo-600/80",
        "dark:from-[#0A0A0A]/90 dark:via-[#171717]/80 dark:to-[#0A0A0A]/90", 
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
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-2 rounded-full bg-violet-600 dark:bg-zinc-800 shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition-transform hover:scale-110"
              >
                {theme === "dark" ? (
                  <Moon className="text-white w-5 h-5" />
                ) : (
                  <Sun className="text-yellow-500 w-5 h-5" />
                )}
              </button>
              <button
                onClick={toggleMode}
                aria-label={`Switch to ${mode === "fun" ? "formal" : "fun"} mode`}
                title={`Switch to ${mode === "fun" ? "formal" : "fun"} mode`}
                className="p-2 rounded-full bg-indigo-500 dark:bg-zinc-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform hover:scale-110"
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
          aria-label={menuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex items-center gap-2 p-2 rounded-full bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-600 dark:from-zinc-800 dark:to-zinc-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          whileTap={{ scale: 0.9, rotate: 10 }}
          whileHover={{ scale: 1.1 }}
          type="button"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-xs font-bold select-none">Menu</span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className={clsx(
              "md:hidden fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl border shadow-2xl",
              "bg-white text-gray-800 border-violet-300",
              "dark:bg-[#171717] dark:text-gray-100 dark:border-zinc-700"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "block py-1 font-semibold transition-colors",
                  activeLink === link.href
                    ? "text-violet-700 dark:text-violet-400 underline"
                    : "hover:text-violet-500 dark:hover:text-violet-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Mode Toggles */}
            <div className="flex justify-around pt-3 border-t border-gray-200 dark:border-zinc-800 mt-2">
              {mounted && (
                <>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMenuOpen(false);
                    }}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    className="p-2 rounded-full bg-violet-600 dark:bg-zinc-800 shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400"
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
                    aria-label={`Switch to ${mode === "fun" ? "formal" : "fun"} mode`}
                    className="p-2 rounded-full bg-indigo-500 dark:bg-zinc-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}