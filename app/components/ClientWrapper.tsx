"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // ⏳ Avoid hydration mismatch: only render after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"          // Uses `class="dark"` or `class="light"` on <html>
      defaultTheme="system"     // Use system preference by default
      enableSystem={true}       // Detect system-level dark mode
      disableTransitionOnChange // Prevents theme flicker during switch
    >
      {/* 🌈 Smooth transition container */}
      <div className="transition-all duration-500 ease-in-out">
        {children}
      </div>
    </ThemeProvider>
  );
}
