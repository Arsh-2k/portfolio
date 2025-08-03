"use client";

import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Responsive hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Social config (edit as you like)
const socials = [
  {
    name: "Twitter",
    href: "https://twitter.com/AspiringSDeV7",
    icon: <FaTwitter aria-hidden="true" size={22} />,
    gradient: "from-indigo-500 via-purple-600 to-pink-500",
  },
  {
    name: "Email",
    href: "mailto:your.arshpreet2k6@gmail.com",
    icon: <FaEnvelope aria-hidden="true" size={22} />,
    gradient: "from-pink-500 via-purple-600 to-indigo-600",
  },
  {
    name: "GitHub",
    href: "https://github.com/Arsh-2k",
    icon: <FaGithub aria-hidden="true" size={22} />,
    gradient: "from-gray-800 via-purple-700 to-gray-900",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/arshpreet-singh-309726238",
    icon: <FaLinkedin aria-hidden="true" size={22} />,
    gradient: "from-sky-700 via-indigo-600 to-indigo-800",
  },
];

// Main SocialBar
export default function SocialBar() {
  const isMobile = useIsMobile();

  // Layout:
  // - Left/vertical on desktop/tablet (sm+ screens)
  // - Bottom/fixed horizontal on mobile (if desired)
  return (
    <nav
      aria-label="Social links"
      className={
        isMobile
          ? "fixed bottom-0 left-0 w-full z-50 flex justify-center gap-3 py-2 bg-white/90 dark:bg-zinc-900/95 border-t border-zinc-200 dark:border-zinc-800 backdrop-blur"
          : "sticky top-[35vh] left-0 z-40 flex flex-col gap-3 ml-1 px-0 py-2"
      }
      style={isMobile ? { boxShadow: "0 -1px 8px rgba(60,60,100,0.04)" } : {}}
    >
      {socials.map((s) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          tabIndex={0}
          whileHover={{
            scale: 1.13,
            boxShadow: "0 3px 18px rgba(168,85,247,0.18)",
            rotate: isMobile ? 0 : 2,
          }}
          whileTap={{
            scale: 0.95,
            rotate: 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`
            focus:outline-none focus:ring-2 focus:ring-purple-400 
            font-medium shadow hover:shadow-lg ring-inset
            transition-all duration-200
            flex items-center justify-center
            ${
              isMobile
                ? "rounded-xl"
                : "rounded-full"
            }
            px-3 py-2 bg-gradient-to-br ${s.gradient}
            text-white
            border border-zinc-200 dark:border-zinc-700
            group text-base
          `}
          style={{ minWidth: isMobile ? 42 : 44, minHeight: 44 }}
        >
          {s.icon}
          {!isMobile && (
            <span className="ml-2 text-sm font-bold tracking-tight">
              {s.name}
            </span>
          )}
        </motion.a>
      ))}
    </nav>
  );
}
