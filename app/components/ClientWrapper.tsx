"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"          // Adds `class="dark"` or `class="light"` to <html>
      defaultTheme="system"     // Respects user's system preference
      enableSystem={true}       // Enables system-based theme
      disableTransitionOnChange // Prevents flickering when switching theme
    >
      <div className="transition-all duration-500 ease-in-out">
        {children}
      </div>
    </ThemeProvider>
  );
}
