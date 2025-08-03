"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

/**
 * ClientWrapper - Improved for SSR-safe theming, performance, and mobile accessibility
 * - Removes blank flash by relying on ThemeProvider's built-in SSR support.
 * - Handles reduced motion for accessibility.
 * - Uses a cleaner, mobile-first color transition.
 */

export default function ClientWrapper({ children }: ClientWrapperProps) {
  // Detect reduced motion for accessibility
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
      // Uncomment below if your next-themes has the ssr prop
      // ssr
    >
      <div
        className={`min-h-screen ${
          !reducedMotion ? "transition-colors duration-300 ease-in-out" : ""
        }`}
        // Optional: for mobile font smoothing & color rendering
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
