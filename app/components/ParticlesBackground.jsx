"use client";

import { useEffect, useState, useCallback } from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // You can manually add plugins here if needed like this:
    // await loadCircleShape(engine);
    // await loadColorUpdater(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        background: {
          color: isDarkMode ? "#000000" : "#ffffff",
        },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: isDarkMode ? "#00ffff" : "#0000ff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
          },
          move: {
            enable: true,
            speed: 1.5,
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
          links: {
            enable: true,
            distance: 150,
            color: isDarkMode ? "#00ffff" : "#0000ff",
            opacity: 0.4,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
