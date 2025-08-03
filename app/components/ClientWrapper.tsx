"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

// Simple SSR-safe mobile check
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

interface ClientWrapperProps {
  children: ReactNode;
}

/**
 * ClientWrapper - SSR-safe, mobile-optimized, transition-aware for accessibility.
 */
export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // Mobile: remove transition-class and add tight padding if desired
  // Desktop/Tablet: keep transition, big background
  // Font smoothing always on for both

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
      // ssr  // Uncomment if your next-themes supports it
    >
      <div
        className={
          `min-h-screen 
          ${isMobile ? "px-0 py-0" : ""}
          ${!reducedMotion && !isMobile ? "transition-colors duration-300 ease-in-out" : ""}
          `
        }
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
