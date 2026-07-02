/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F2EFE9",
        ink: "#0F0F0F",
        accent: "#C0272A",
      },
      fontFamily: {
        display: ["Archivo Black", "Arial Black", "sans-serif"],
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 15, 15, 0.18)",
      },
    },
  },
  plugins: [],
};
