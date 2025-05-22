import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import SocialBar from "./components/SocialBar";

export const metadata: Metadata = {
  title: "Arshpreet Singh Portfolio",
  description: "Created by Arshpreet Singh — Explore my projects, ideas, and more!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f0a1b" />
      </head>
      <body
        className="relative min-h-screen bg-white text-black 
                   dark:bg-[#0f0a1b] dark:text-white 
                   transition-colors duration-500 font-sans"
      >
        {/* Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-black text-white px-4 py-2 rounded">
          Skip to main content
        </a>

        {/* Main Content Area */}
        <main
          id="main-content"
          className="flex flex-col w-full overflow-x-hidden"
        >
          {children}
        </main>

        {/* Toasts */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#f9fafb",
            },
            success: {
              iconTheme: {
                primary: "#a855f7",
                secondary: "#f9fafb",
              },
            },
          }}
        />

        {/* Sticky social bar */}
        <SocialBar />
      </body>
    </html>
  );
}
