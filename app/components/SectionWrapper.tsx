'use client';

import { ReactNode } from 'react';
import clsx from 'clsx'; // You can install this for cleaner className handling

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx(
        `relative w-full min-h-screen px-6 py-16 flex flex-col justify-center items-center 
         overflow-hidden transition-all duration-500 group`,
        'bg-gradient-to-br from-[#0f0a1b] via-[#1b1035] to-[#0f0a1b]',
        'dark:from-[#0f0a1b] dark:via-[#1b1035] dark:to-[#0f0a1b]',
        className
      )}
    >
      {/* ⚡⚡ Animated Glow Border */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full animate-pulse border-2 border-indigo-500/20 rounded-[24px] blur-sm"></div>
        <div className="absolute w-full h-full border-2 border-indigo-400/40 rounded-[24px] animate-[spin_20s_linear_infinite] opacity-10"></div>
      </div>

      {/* ⚡ Glow Overlay */}
      <div className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),_transparent_70%)] animate-[pulse_10s_infinite] z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </section>
  );
}
