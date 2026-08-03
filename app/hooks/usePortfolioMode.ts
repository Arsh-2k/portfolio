// app/hooks/usePortfolioMode.ts
"use client";

import { useState, useEffect } from "react";

export default function usePortfolioMode() {
  const [mode, setMode] = useState<"fun" | "formal">("fun");

  useEffect(() => {
    // 1. Get initial state
    const savedMode = localStorage.getItem("portfolioMode") as "fun" | "formal";
    if (savedMode) setMode(savedMode);

    // 2. Listen for changes broadcasted by the Navbar or Hero
    const handleModeSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) setMode(customEvent.detail);
    };

    window.addEventListener("portfolioModeChanged", handleModeSync);
    return () => window.removeEventListener("portfolioModeChanged", handleModeSync);
  }, []);

  return mode;
}