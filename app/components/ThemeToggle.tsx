"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="fixed top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md
        bg-white/70 dark:bg-zinc-900/80 text-black dark:text-white
        shadow-lg hover:scale-105 hover:rotate-12 transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-6 h-6 transition-transform duration-300" />
      ) : (
        <Moon className="w-6 h-6 transition-transform duration-300" />
      )}
    </button>
  );
}
