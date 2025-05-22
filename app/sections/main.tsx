"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ParticlesBackground from "../components/ParticlesBackground";

export default function MainSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center bg-white text-black dark:bg-black dark:text-white transition-all duration-300 px-6 pt-24 overflow-hidden"
    >
      <ParticlesBackground />

      <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05} transitionSpeed={250}>
        <motion.img
          src="/avatar.jpg"
          alt="Arshpreet Singh Avatar"
          className="w-36 h-36 rounded-full shadow-2xl border-4 border-purple-500 mb-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </Tilt>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi, I&apos;m <span className="text-purple-500">Arshpreet Singh</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-2xl text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Web Developer • Open Source Contributor • Chess & Coding Enthusiast
      </motion.p>
    </section>
  );
}
