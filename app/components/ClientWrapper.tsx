"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This ensures the layout only renders after hydration
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid mismatch during SSR

  return (
    <div className="transition-all duration-500 ease-in-out">{children}</div>
  );
}
