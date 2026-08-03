/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode via .dark class

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // Cobalt Blue
          hover: "#2563EB",
          glow: "rgba(59, 130, 246, 0.5)",
        },
        dark: {
          DEFAULT: "#0A0A0A", // True Black for OLED optimization
          surface: "#171717", // Elevated dark surface
          border: "#262626",  // Subtle divider
        },
        accent: {
          gold: "#FFD700",    // Your existing coin-toss gold
          silver: "#C0C0C0",  
          cyan: "#00E5FF",    // High-tech accent for hover states
        }
      },

      animation: {
        "bounce-slow": "bounceSlow 3s infinite",
        "text-glow": "glow 2s ease-in-out infinite alternate",
        zap: "zap 0.4s ease-in-out",
        spinCoin: "spinCoin 1s ease-in-out forwards",
        "spin-slow": "spin 6s linear infinite",
        "gradient-shine": "gradient-shine 3s ease-in-out infinite",
      },

      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        glow: {
          "0%": {
            textShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
          },
          "100%": {
            textShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
          },
        },
        zap: {
          "0%, 100%": {
            filter: "brightness(1)",
            transform: "scale(1)",
          },
          "50%": {
            filter: "brightness(2.2)",
            transform: "scale(1.05)",
          },
        },
        spinCoin: {
          "0%": {
            transform: "rotateY(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "50%": {
            transform: "rotateY(180deg) scale(1.15)",
            filter: "drop-shadow(0 0 15px gold) saturate(1.8)",
          },
          "100%": {
            transform: "rotateY(360deg) scale(1)",
            filter: "drop-shadow(0 0 15px silver)",
          },
        },
        "gradient-shine": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },

  plugins: [
    // Custom plugin to add border-image utility for gold to silver gradient
    function ({ addUtilities }) {
      addUtilities({
        ".border-image-gold-silver": {
          borderImage: "linear-gradient(to right, #FFD700, #C0C0C0) 1",
          borderStyle: "solid",
        },
      });
    },
  ],
};