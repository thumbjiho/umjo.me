/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fg: "var(--fg)",
        "fg-dim": "var(--fg-dim)",
        bg: "var(--bg)",
        rule: "var(--rule)",
      },
      fontFamily: {
        serif: ['"Newsreader"', "Georgia", "serif"],
        sans: ['"DM Sans"', "-apple-system", "sans-serif"],
      },
      maxWidth: {
        site: "620px",
      },
    },
  },
  plugins: [],
};
