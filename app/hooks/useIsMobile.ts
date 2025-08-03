import { useState, useEffect } from "react";

/**
 * Hook to determine if screen width is less than or equal to a breakpoint (default: 768px).
 * Uses window.matchMedia for robust and accessible responsive detection.
 *
 * @param breakpoint - The pixel width to consider mobile (default is 768px).
 * @returns boolean indicating if the screen is mobile.
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  // Helper to get initial state (for SSR safety)
  const getIsMobile = () =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches
      : false;

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Listener for media query changes (screen resize, rotation, etc)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Set initial
    setIsMobile(mql.matches);

    // Compatible event binding
    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [breakpoint]);

  return isMobile;
}
  