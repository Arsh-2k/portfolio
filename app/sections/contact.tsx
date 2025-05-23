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
      {/* 🌌 Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_30s_linear_infinite] opacity-10 bg-[radial-gradient(#ffffff33_2%,transparent_2.5%)] bg-[size:22px_22px]" />
      </div>

      <div className="max-w-xl w-full z-10">
        {/* ✨ Heading + Line Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <motion.div
            className="w-32 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        {/* 📨 Contact Form */}
        <motion.form
          className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-xl p-8 shadow-2xl flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
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
              placeholder="example-email@gmail.com"
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow hover:shadow-md"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-black dark:text-white font-semibold">Message</span>
            <textarea
              rows={4}
              placeholder="Hi! I really like your work and want to discuss some things...."
              required
              className="rounded-md px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow hover:shadow-md"
            />
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Ask me anything you would like. I always respond :D
          </p>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.07, backgroundColor: "#3B82F6", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 bg-black text-white px-6 py-2 rounded-md dark:bg-white dark:text-black dark:hover:bg-purple-500 transition-colors shadow-lg"
          >
            Submit
          </motion.button>
        </motion.form>

        {/* 🌐 Social Buttons */}
        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                rotate: -2,
                backgroundColor: '#a855f7',
                color: '#fff',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-gray-300 dark:border-zinc-600 transition-all shadow-md"
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Or just want to have a casual chat? DM me on{' '}
          <a
            className="text-black dark:text-white font-semibold underline"
            href="https://twitter.com/AspiringSDeV7"
            target="_blank"
          >
            Twitter
          </a>{' '}
          or{' '}
          <a
            className="text-black dark:text-white font-semibold underline"
            href="https://linkedin.com/in/arshpreet-singh-309726238"
            target="_blank"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  );
}
