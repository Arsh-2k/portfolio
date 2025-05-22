'use client';

import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const contactLinks = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/AspiringSDeV7',
    icon: <FaTwitter className="text-lg" />,
  },
  {
    label: 'Email Me',
    href: 'mailto:your.arshpreet2k6@gmail.com',
    icon: <FaEnvelope className="text-lg" />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Arsh-2k',
    icon: <FaGithub className="text-lg" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arshpreet-singh-309726238',
    icon: <FaLinkedin className="text-lg" />,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 
      bg-gradient-to-br from-white via-purple-100 to-blue-100 
      dark:from-black dark:via-zinc-900 dark:to-purple-900 
      transition-colors duration-500 scroll-mt-24"
    >
      {/* sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_30s_linear_infinite] opacity-10 bg-[radial-gradient(#ffffff33_2%,transparent_2.5%)] bg-[size:22px_22px]" />
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Contact <span className="text-blue-500 dark:text-purple-400">Me</span>
        </motion.h2>

        <motion.div
          className="h-1 w-24 bg-blue-500 dark:bg-purple-500 mb-6 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        <motion.p
          className="text-center max-w-2xl text-lg mb-10 px-4 text-gray-800 dark:text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Have a project in mind? I&apos;d love to hear from you! <br />
          Reach out to me, and let&apos;s turn your ideas into reality.
        </motion.p>

        <motion.div
          className="grid gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {contactLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-3 rounded-xl border border-white/20
              bg-white/70 text-black hover:bg-white hover:shadow-[0_0_25px_#6366f1aa] dark:bg-zinc-800/60 dark:text-white 
              dark:hover:bg-zinc-700/70 dark:hover:border-purple-400/60 hover:border-blue-400 
              transition-all duration-300 backdrop-blur-md"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
