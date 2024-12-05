/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        primary: "#1a1a1a",
        secondary: "#2d2d2d",
        accent: "#6366f1",
      },
    },
  },
  plugins: [],
};
