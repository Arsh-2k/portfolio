"use client";

import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const contactLinks = [
  { label: "Twitter", href: "https://twitter.com/AspiringSDeV7", icon: <FaTwitter className="text-lg" /> },
  { label: "Email Me", href: "mailto:your.arshpreet2k6@gmail.com", icon: <FaEnvelope className="text-lg" /> },
  { label: "GitHub", href: "https://github.com/Arsh-2k", icon: <FaGithub className="text-lg" /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arshpreet-singh-309726238", icon: <FaLinkedin className="text-lg" /> }
];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24
                 bg-gradient-to-br from-blue-50 via-purple-100 to-white
                 dark:from-black dark:via-zinc-900 dark:to-purple-900
                 transition-colors duration-500 scroll-mt-24"
    >
      {/* 🌌 Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute w-[300%] h-[300%] -left-[100%] -top-[100%]
                      opacity-10 bg-[radial-gradient(#ffffff33_2%,transparent_2.5%)]
                      bg-[size:25px_25px]
                      ${!reduce ? "animate-[spin_60s_linear_infinite]" : ""}`}
        />
      </div>

      <div className="max-w-2xl w-full z-10">
        {/* ✨ Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10
                     bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={reduce ? {} : { duration: 0.7 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        {/* 📨 Form */}
        <motion.form
          className="bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md
                     p-8 rounded-2xl shadow-xl transition-all flex flex-col gap-6"
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={reduce ? {} : { duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted! 🚀 Hook this up to Appwrite or Formspree.");
          }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-black dark:text-white font-semibold">Email</span>
            <input
              type="email"
              placeholder="example@email.com"
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow hover:shadow-md"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-black dark:text-white font-semibold">Message</span>
            <textarea
              rows={4}
              placeholder="Hi! I love your work and wanted to say..."
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow hover:shadow-md"
            />
          </label>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Ask me anything you’d like — I always reply 😄
          </p>

          <motion.button
            type="submit"
            whileHover={reduce ? {} : { scale: 1.07, backgroundColor: "#8b5cf6", color: "#fff" }}
            whileTap={reduce ? {} : { scale: 0.95 }}
            transition={reduce ? {} : { type: "spring", stiffness: 300 }}
            className="mt-2 bg-black text-white px-6 py-2 rounded-md dark:bg-white dark:text-black shadow-md transition-all"
            aria-label="Send message"
          >
            Submit
          </motion.button>
        </motion.form>

        {/* 🌐 Social Links */}
        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={reduce ? {} : { duration: 0.8 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? {} : { scale: 1.1, rotate: -2, backgroundColor: "#9333ea", color: "#fff" }}
              whileTap={reduce ? {} : { scale: 0.95 }}
              transition={reduce ? {} : { type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 text-black dark:text-white
                         border border-gray-300 dark:border-zinc-700 transition-all shadow-md backdrop-blur-sm"
              aria-label={link.label}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* 💬 Outro */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Just want to chat casually? DM me on{" "}
          <a
            href="https://twitter.com/AspiringSDeV7"
            className="underline font-medium text-black dark:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          or{" "}
          <a
            href="https://linkedin.com/in/arshpreet-singh-309726238"
            className="underline font-medium text-black dark:text-white"
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
}
