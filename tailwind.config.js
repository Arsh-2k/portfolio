/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌗 Enables manual dark mode via class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // 🕺 Slow bounce effect for scroll or icons
        'bounce-slow': 'bounce-slow 3s infinite',
        // 🌟 Glowing text effect
        'text-glow': 'glow 2s ease-in-out infinite alternate',
        // ⚡ Zap effect for lightning flash
        'zap': 'zap 0.4s ease-in-out',
      },
      keyframes: {
        // 🧼 Custom bounce for more subtle motion
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        // ✨ Text glow that breathes
        glow: {
          '0%': { textShadow: "0 0 10px rgba(168, 85, 247, 0.5)" },
          '100%': { textShadow: "0 0 20px rgba(236, 72, 153, 0.8)" },
        },
        // ⚡ Lightning zap brightness burst
        zap: {
          '0%, 100%': {
            filter: 'brightness(1)',
            transform: 'scale(1)',
          },
          '50%': {
            filter: 'brightness(2.2)',
            transform: 'scale(1.05)',
          },
        },
      },
      colors: {
        // 🎨 Custom primary & dark color palette
        primary: '#3B82F6', // Tailwind blue-500
        dark: '#0f0f0f',    // Rich black for deep UI
      },
    },
  },
  plugins: [],
};

