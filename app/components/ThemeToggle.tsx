'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Zap } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const icon = theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg backdrop-blur-md 
      bg-white/70 dark:bg-zinc-900/80 text-black dark:text-white 
      hover:scale-105 hover:rotate-12 transition-all duration-300"
    >
      {icon}
    </button>
  );
}
