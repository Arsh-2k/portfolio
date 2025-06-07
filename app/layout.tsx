import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import ClientWrapper from "./components/ClientWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SocialBar from "./components/SocialBar"; // ✅ Imported SocialBar

export const metadata: Metadata = {
  title: "Arshpreet Singh Portfolio",
  description:
    "Created by Arshpreet Singh — Explore my projects, ideas, and more!",
  metadataBase: new URL("https://your-portfolio-link.com"),
  openGraph: {
    title: "Arshpreet Singh Portfolio",
    description: "Discover Arshpreet's latest projects, code, and creativity!",
    url: "https://your-portfolio-link.com",
    siteName: "Arshpreet Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arshpreet Singh Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshpreet Singh Portfolio",
    description: "Web wizardry by Arsh — explore it!",
    creator: "@your_twitter_handle",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Theme color for mobile browser UI */}
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f0a1b"
          media="(prefers-color-scheme: dark)"
        />

        {/* Optional: preload fonts/images here for performance */}
        {/* <link rel="preload" as="image" href="/your-hero-image.webp" /> */}
      </head>

      <body className="bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-500 overflow-x-hidden">
        <ClientWrapper>{children}</ClientWrapper>
        <SocialBar /> {/* ✅ Globally rendered, fixed position */}
        <SpeedInsights />
      </body>
    </html>
  );
}
