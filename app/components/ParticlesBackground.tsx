"use client";

import { useEffect, useState } from "react";
import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "transparent" },
        particles: {
          number: { value: 60 },
          color: { value: isDarkMode ? "#ffffff" : "#000000" },
          shape: { type: "circle" },
          opacity: {
            value: 0.25,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "out" },
            random: true,
            straight: false,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
