import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import { SpeedInsights } from "@vercel/speed-insights/next"; // ✅ Added here

// ✅ Server-side only — valid place for metadata
export const metadata: Metadata = {
  title: "Arshpreet Singh Portfolio",
  description: "Created by Arshpreet Singh — Explore my projects, ideas, and more!",
  openGraph: {
    title: "Arshpreet Singh Portfolio",
    description: "Discover Arshpreet's latest projects, code, and creativity!",
    url: "https://your-portfolio-link.com",
    siteName: "Arshpreet Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshpreet Singh Portfolio",
    description: "Web wizardry by Arsh — explore it!",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f0a1b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights /> {/* ✅ Added here */}
      </body>
    </html>
  );
}
