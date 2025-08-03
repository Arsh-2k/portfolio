"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // More performant build

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Listen for theme changes to update particles colors
  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  // Loads slim build for better performance
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Check if device is mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Set particle options based on device type
  const particleOptions = isMobile
    ? {
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: isDarkMode ? "#0f0a1b" : "#ffffff" },
        },
        particles: {
          number: {
            value: 25,
            density: { enable: true, area: 900 }
          },
          color: {
            value: isDarkMode ? "#00ffff" : "#7f00ff"
          },
          shape: { type: "circle" },
          opacity: {
            value: 0.32,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.09,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.2,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            outModes: { default: "out" },
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
          links: {
            enable: true,
            distance: 75,
            color: isDarkMode ? "#00ffff" : "#8b5cf6",
            opacity: 0.22,
            width: 0.8,
          },
        },
        detectRetina: true,
      }
    : {
        // Original/Full config for desktop/tablet
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: isDarkMode ? "#0f0a1b" : "#ffffff" },
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
      };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
    />
  );
}
