"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync theme dynamically
  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const particlesInit = useCallback(async (engine) => {
    // You can add custom plugins here like:
    // await loadSlim(engine); or loadFull(engine);
    await tsParticles.load(engine); // optional
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Ensures it's a background layer
        background: {
          color: {
            value: isDarkMode ? "#0f0a1b" : "#ffffff", // Consistent with your global styles
          },
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: isDarkMode ? "#00ffff" : "#7f00ff", // Glowy cyan vs vibrant indigo
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.4,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.3,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: false,
            straight: false,
            outMode: "out",
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          links: {
            enable: true,
            distance: 140,
            color: isDarkMode ? "#00ffff" : "#8b5cf6", // Cyan or violet
            opacity: 0.4,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
