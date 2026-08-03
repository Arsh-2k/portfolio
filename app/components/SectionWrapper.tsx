"use client";

import { ReactNode } from "react";
import usePortfolioMode from "../hooks/usePortfolioMode";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, children }: SectionWrapperProps) {
  const mode = usePortfolioMode();
  const isFormal = mode === "formal";

  return (
    <div 
      id={`${id}-wrapper`} 
      className={`w-full snap-start transition-colors duration-500 ${
        isFormal ? "border-b-2 border-gray-200 dark:border-zinc-900" : ""
      }`}
    >
      {children}
    </div>
  );
}