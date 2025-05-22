// app/components/SectionWrapper.tsx

'use client';

export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="w-full min-h-screen px-6 py-16 flex flex-col justify-center items-center
                 bg-white dark:bg-[#0f0a1b] transition-all duration-500"
    >
      {children}
    </section>
  );
}
