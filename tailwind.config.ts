import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052e16",
        },
        surface: {
          light: "#FFFFFF",
          subtle: "#F8FAFC",
          dark: "#0F172A",
          "dark-subtle": "#1E293B",
        },
        main: "#17211B",
        muted: "#64748B",
        border: "#E2E8F0",
        // Finger guide colors
        finger: {
          pinky: {
            bg: "#FEE2E2",
            border: "#FCA5A5",
            text: "#991B1B",
            active: "#EF4444",
          },
          ring: {
            bg: "#FFEDD5",
            border: "#FDBA74",
            text: "#9A3412",
            active: "#F97316",
          },
          middle: {
            bg: "#FEF9C3",
            border: "#FDE047",
            text: "#854D0E",
            active: "#EAB308",
          },
          index: {
            bg: "#DCFCE7",
            border: "#86EFAC",
            text: "#166534",
            active: "#16A34A",
          },
          thumb: {
            bg: "#E0F2FE",
            border: "#7DD3FC",
            text: "#075985",
            active: "#0284C7",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Courier New'",
          "monospace",
        ],
      },
      animation: {
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "key-press": "keypress 0.15s ease-out",
      },
      keyframes: {
        keypress: {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(2px) scale(0.97)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
