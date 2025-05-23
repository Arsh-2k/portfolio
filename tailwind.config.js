/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌗 Enables manual dark mode via class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Optional if using `pages/`
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounceSlow 3s infinite',
        'text-glow': 'glow 2s ease-in-out infinite alternate',
        'zap': 'zap 0.4s ease-in-out',
        'spinCoin': 'spinCoin 1s ease-in-out forwards',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%': {
            textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
          },
          '100%': {
            textShadow: '0 0 20px rgba(236, 72, 153, 0.8)',
          },
        },
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
        spinCoin: {
          '0%': {
            transform: 'rotateY(0deg) scale(1)',
            filter: 'brightness(1)',
          },
          '50%': {
            transform: 'rotateY(180deg) scale(1.15)',
            filter: 'drop-shadow(0 0 15px gold) saturate(1.8)',
          },
          '100%': {
            transform: 'rotateY(360deg) scale(1)',
            filter: 'drop-shadow(0 0 15px silver)',
          },
        },
      },
      colors: {
        primary: '#3B82F6', // Tailwind blue-500
        dark: '#0f0f0f',    // Rich black
      },
    },
  },
  plugins: [],
};
