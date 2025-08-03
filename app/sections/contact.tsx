"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

// SSR-safe media query hook
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// Sparkle SVG icon (smaller for mobile)
const Sparkle: React.FC<{ mobile?: boolean; className?: string }> = ({ mobile = false, ...props }) => (
  <svg
    width={mobile ? 16 : 24}
    height={mobile ? 16 : 24}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g filter="url(#soft)">
      <path
        d="M10 2v16M2 10h16"
        stroke="#fffbe8"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </g>
    <defs>
      <filter id="soft" x="0" y="0" width="20" height="20">
        <feGaussianBlur stdDeviation={0.7} result="blur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope={0.3} />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);

type ContactLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
};

const contactLinks: ContactLink[] = [
  {
    label: "Twitter",
    href: "https://twitter.com/AspiringSDeV7",
    icon: <FaTwitter className="text-lg" aria-hidden="true" />,
    gradient: "from-indigo-500 via-purple-600 to-pink-500",
  },
  {
    label: "Email Me",
    href: "mailto:your.arshpreet2k6@gmail.com",
    icon: <FaEnvelope className="text-lg" aria-hidden="true" />,
    gradient: "from-pink-500 via-purple-500 to-indigo-600",
  },
  {
    label: "GitHub",
    href: "https://github.com/Arsh-2k",
    icon: <FaGithub className="text-lg" aria-hidden="true" />,
    gradient: "from-purple-700 via-indigo-800 to-purple-900",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arshpreet-singh-309726238",
    icon: <FaLinkedin className="text-lg" aria-hidden="true" />,
    gradient: "from-indigo-400 via-indigo-600 to-indigo-700",
  },
];

const Contact: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [status, setStatus] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("✅ Sent! I'll get back to you soon.");
    }, 1200);
  };

  return (
    <section
      id="contact"
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 sm:py-24
        bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-50 
        dark:from-[#1e1939] dark:via-[#181827] dark:to-[#382168]
        scroll-mt-24 transition-colors duration-700 overflow-clip`}
    >
      {/* Sparkles */}
      <Sparkle
        mobile={isMobile}
        className={isMobile
          ? "absolute top-6 left-5 opacity-30"
          : "absolute top-10 left-16 opacity-30"}
      />
      <Sparkle
        mobile={isMobile}
        className={isMobile
          ? "absolute bottom-6 right-4 opacity-15"
          : "absolute bottom-8 right-12 opacity-20"}
      />

      <div className="max-w-2xl w-full z-10">
        <motion.h2
          className="text-center text-4xl sm:text-5xl font-extrabold 
            bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 
            bg-clip-text text-transparent mb-10 drop-shadow-lg"
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Let&apos;s Connect
        </motion.h2>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          aria-label="Contact form"
          className={`
            flex flex-col gap-5 sm:gap-6 rounded-2xl
            ${isMobile 
              ? "bg-white/95 dark:bg-zinc-900/95 border border-indigo-200 dark:border-indigo-600 shadow p-6"
              : "bg-white/80 dark:bg-zinc-900/70 border border-indigo-300 dark:border-indigo-700 shadow-xl backdrop-blur-md p-8"
            }
          `}
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          noValidate
        >
          <input
            type="text"
            name="bot-field"
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          <label htmlFor="email" className="flex flex-col gap-1">
            <span className="text-zinc-800 dark:text-zinc-100 font-semibold">
              Email
            </span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              aria-required="true"
              className={`
                rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white 
                border border-indigo-400 dark:border-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow
                ${isMobile ? "" : "hover:shadow-md"}
              `}
            />
          </label>

          <label htmlFor="message" className="flex flex-col gap-1">
            <span className="text-zinc-800 dark:text-zinc-100 font-semibold">Message</span>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Hi Arsh, your portfolio is awesome!"
              required
              aria-required="true"
              className={`
                rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white 
                border border-indigo-400 dark:border-indigo-700
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow
                ${isMobile ? "" : "hover:shadow-md"}
              `}
            />
          </label>

          <motion.button
            type="submit"
            whileHover={!reduceMotion && !isMobile ? { scale: 1.05, boxShadow: "0 0 28px #7c3aedcc" } : {}}
            whileTap={!reduceMotion && !isMobile ? { scale: 0.96 } : {}}
            transition={{ type: "spring", stiffness: 350 }}
            className={`
              mt-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 
              text-white px-6 py-2 rounded-md shadow-md font-semibold transition-all
            `}
            aria-live="polite"
          >
            Submit
          </motion.button>

          {status && (
            <motion.p
              role="alert"
              className="text-sm text-center mt-2 text-indigo-600 dark:text-pink-400 font-medium"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>

        {/* Social Links */}
        <motion.div
          className="mt-8 sm:mt-10 flex justify-center gap-3 sm:gap-4 flex-wrap"
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                !reduceMotion && !isMobile
                  ? { scale: 1.07, boxShadow: "0 0 14px #7c3aedcc" }
                  : {}
              }
              whileTap={!reduceMotion && !isMobile ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 rounded-full
                  bg-gradient-to-br ${link.gradient}
                  text-white border border-indigo-200 dark:border-indigo-700 shadow-md
                  transition-all
                  hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                  text-xs sm:text-sm font-semibold`}
              aria-label={link.label}
            >
              {link.icon}
              <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-6 sm:mt-7 text-center text-indigo-700 dark:text-pink-300 text-xs sm:text-sm font-medium">
          Casual chat? DM me on{" "}
          <a
            href="https://twitter.com/AspiringSDeV7"
            className="underline font-semibold text-indigo-600 dark:text-pink-300 hover:text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          or{" "}
          <a
            href="https://linkedin.com/in/arshpreet-singh-309726238"
            className="underline font-semibold text-indigo-700 dark:text-pink-200 hover:text-pink-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Contact;
