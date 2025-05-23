'use client';

import { ReactNode } from 'react';

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
      className={`w-full min-h-screen px-6 py-16 flex flex-col justify-center items-center 
                  bg-white dark:bg-[#0f0a1b] transition-all duration-500 ${className}`}
    >
      {children}
    </section>
  );
}
