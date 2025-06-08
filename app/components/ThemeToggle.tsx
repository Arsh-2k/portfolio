"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Get system preference + saved preference on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

    // Apply class to root
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(initialTheme);

    setTheme(initialTheme as "light" | "dark");
  }, []);

  // Toggle function
  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
  };

  // Optional SSR fallback (you can replace this with a loading shimmer if needed)
  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md
        bg-white/70 dark:bg-zinc-900/80 text-black dark:text-white
        shadow-lg hover:scale-105 hover:rotate-12 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 transition-transform duration-300" />
      ) : (
        <Moon className="w-6 h-6 transition-transform duration-300" />
      )}
    </button>
  );
}
