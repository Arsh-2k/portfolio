"use client";

import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import SocialBar from "./components/SocialBar";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Prevents hydration mismatch for motion
  }, []);

  return (
    <>
      {/* ♿ Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 
                   bg-black text-white px-4 py-2 rounded-lg ring-2 ring-purple-500"
      >
        Skip to main content
      </a>

      {/* 🎨 Theme Aura Background */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br 
                   from-purple-50 via-transparent to-blue-50 
                   dark:from-[#0f0a1b] dark:via-zinc-900 dark:to-purple-950 
                   pointer-events-none"
      />

      {/* 🚀 Animated Page Wrapper */}
      {isClient ? (
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            key="main"
            className="flex flex-col min-h-screen w-full overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      ) : (
        <main
          id="main-content"
          className="flex flex-col min-h-screen w-full overflow-x-hidden"
        >
          {children}
        </main>
      )}

      {/* 🔮 Aesthetic Glow Orb */}
      <div
        className="fixed bottom-6 right-6 w-6 h-6 
                   bg-gradient-to-tr from-purple-500 to-fuchsia-500 
                   animate-pulse rounded-full blur-sm 
                   pointer-events-none z-20"
      />

      {/* 🔔 Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937", // dark zinc
            color: "#f9fafb",
            borderRadius: "0.5rem",
          },
          success: {
            iconTheme: {
              primary: "#a855f7", // purple
              secondary: "#f9fafb",
            },
          },
        }}
      />

      {/* 🧿 Sticky Social Media Sidebar */}
      <SocialBar />
    </>
  );
}
