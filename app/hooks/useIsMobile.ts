import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

/**
 * Hook to determine if screen width is less than or equal to a breakpoint (default: 768px).
 * Uses throttling to prevent performance issues on rapid resize.
 *
 * @param breakpoint - The pixel width to consider mobile (default is 768px).
 * @returns boolean indicating if the screen is mobile.
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize state with a safe default in case window is undefined (SSR)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateMobileState = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Throttle to limit calls to once every 200ms
    const handleResize = throttle(updateMobileState, 200);

    // Initial check
    updateMobileState();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel any trailing throttled calls
    };
  }, [breakpoint]);

  return isMobile;
}
