/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}", // احتياط لو استُخدمت
  ],
  theme: {
    extend: {
      colors: {
        neomind: {
          bg: "#020617",
          "bg-soft": "#020817",
          fg: "#f9fafb",
          accent: "#16a34a", // Saudi green
          gold: "#d4af37",   // Royal gold
        },
      },
    },
  },
  plugins: [],
};
