// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast"; // 🧃 Import the toaster

import SocialBar from "./components/SocialBar";

export const metadata: Metadata = {
  title: "Arshpreet Singh Portfolio",
  description: "Created by Arshpreet Singh — Explore my projects, ideas, and more!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="relative bg-white text-black dark:bg-[#0f0a1b] dark:text-white transition-colors duration-500">
        {/* 🌍 Main page content */}
        {children}

        {/* 🧃 Toast messages */}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

        {/* 🎯 Sticky floating social bar */}
        <SocialBar />
      </body>
    </html>
  );
}



