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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Use lodash throttle to limit the rate of updates
    const handleResize = throttle(updateMobileState, 200);

    // Initial check
    updateMobileState();

    // Listen to resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel any pending throttled calls
    };
  }, [breakpoint]);

  return isMobile;
}
