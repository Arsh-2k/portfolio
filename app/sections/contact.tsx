'use client';

import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const contactLinks = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/@AspiringSDeV7',
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
      className="min-h-screen px-4 py-20 flex flex-col items-center justify-center 
      bg-gradient-to-br from-white via-purple-100 to-blue-100 dark:from-black dark:via-zinc-900 dark:to-purple-900 
      transition-colors duration-500"
    >
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
        className="flex flex-col gap-4 w-full max-w-md"
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
            className="flex items-center gap-4 px-5 py-3 rounded-lg border border-transparent
            bg-white/70 text-black hover:bg-white hover:shadow-[0_0_20px_#8b5cf6aa] dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700
            dark:hover:border-purple-400/60 hover:border-blue-400 transition-all duration-300"
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
