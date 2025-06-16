"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import Particles from "@tsparticles/react";
// import { Engine } from "@tsparticles/engine"; // Not needed in JS, remove or uncomment if you need Engine for JSDoc or runtime
import { loadSlim } from "@tsparticles/slim"; // ⬅️ More performant than loadFull

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🌓 Detect dark mode reliably
  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  // ⚡ Efficient engine init using slim build
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: {
            value: isDarkMode ? "#0f0a1b" : "#ffffff",
          },
        },
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          color: {
            value: isDarkMode ? "#00ffff" : "#7f00ff",
          },
          shape: { type: "circle" },
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
            outModes: { default: "out" },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          links: {
            enable: true,
            distance: 140,
            color: isDarkMode ? "#00ffff" : "#8b5cf6",
            opacity: 0.4,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
