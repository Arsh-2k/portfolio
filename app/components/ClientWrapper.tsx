"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by rendering only after client mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* Optional: Wrap with smooth transition wrapper */}
      <div className="transition-colors duration-500 ease-in-out min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}
