"use client";

import { useState } from "react";
import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const contactLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/AspiringSDeV7",
    icon: <FaTwitter className="text-lg" />,
  },
  {
    label: "Email Me",
    href: "mailto:your.arshpreet2k6@gmail.com",
    icon: <FaEnvelope className="text-lg" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Arsh-2k",
    icon: <FaGithub className="text-lg" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arshpreet-singh-309726238",
    icon: <FaLinkedin className="text-lg" />,
  },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");
    setTimeout(() => {
      setStatus("✅ Submitted successfully!");
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24
                 bg-gradient-to-br from-[#ede9fe] to-[#f3e8ff]
                 dark:from-[#1e1b2e] dark:to-[#2a1d43]
                 transition-colors duration-500 scroll-mt-24"
    >
      {/* 🔮 Optional Aura Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute w-[300%] h-[300%] -left-[100%] -top-[100%]
                      opacity-10 bg-[radial-gradient(#ffffff22_2%,transparent_2.5%)]
                      bg-[size:20px_20px]
                      ${!reduce ? "animate-[spin_60s_linear_infinite]" : ""}`}
        />
      </div>

      <div className="max-w-2xl w-full z-10">
        {/* 🌈 Title */}
        <motion.h2
          className="text-center text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-10 drop-shadow-lg"
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let&#39;s Connect
        </motion.h2>

        {/* 📨 Form */}
        <motion.form
          onSubmit={handleSubmit}
          aria-label="Contact Form"
          className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 p-8 rounded-2xl shadow-xl flex flex-col gap-6"
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <input type="text" name="bot-field" className="hidden" />

          <label htmlFor="email" className="flex flex-col gap-1">
            <span className="text-zinc-800 dark:text-zinc-100 font-semibold">Email</span>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow hover:shadow-md"
            />
          </label>

          <label htmlFor="message" className="flex flex-col gap-1">
            <span className="text-zinc-800 dark:text-zinc-100 font-semibold">Message</span>
            <textarea
              id="message"
              rows={4}
              placeholder="Hi Arsh, I love your portfolio!"
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow hover:shadow-md"
            />
          </label>

          <motion.button
            type="submit"
            whileHover={!reduce ? { scale: 1.07, backgroundColor: "#8b5cf6", color: "#fff" } : {}}
            whileTap={!reduce ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-2 bg-black text-white px-6 py-2 rounded-md dark:bg-white dark:text-black shadow-md transition-all"
          >
            Submit
          </motion.button>

          {status && (
            <motion.p
              className="text-sm text-center mt-2 text-green-500 dark:text-green-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>

        {/* 🌐 Social Icons */}
        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                reduce
                  ? {}
                  : {
                      scale: 1.1,
                      backgroundColor: "#9333ea",
                      color: "#fff",
                      boxShadow: "0 0 12px #9333ea",
                    }
              }
              whileTap={reduce ? {} : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-zinc-700 transition-all shadow-md backdrop-blur-sm hover:underline hover:decoration-purple-500"
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* 🗨 Outro */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Want to casually chat? DM me on{" "}
          <a
            href="https://twitter.com/AspiringSDeV7"
            className="underline font-medium text-purple-700 dark:text-purple-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          or{" "}
          <a
            href="https://linkedin.com/in/arshpreet-singh-309726238"
            className="underline font-medium text-blue-600 dark:text-blue-300"
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
