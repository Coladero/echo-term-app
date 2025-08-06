// tailwind.config.ts

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          background: "#000000",
          foreground: "#00FF00",
          muted: "#0f0f0f",
          border: "#00cc00",
        },
      },
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
}
export default config
