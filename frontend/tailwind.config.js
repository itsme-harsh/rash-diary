// tailwind.config.js
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#f3f4f6',
        darkBg: '#1f2937',
        primary: '#3b82f6',
        secondary: '#e11d48',
      },
    },
  },
  plugins: [],
};
