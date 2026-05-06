import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F0F0F",
          charcoal: "#1F2937",
          background: "#FFFFFF",
          alt: "#F8F8F8",
          text: "#0F0F0F",
          muted: "#6B7280",
          border: "#E5E7EB",
          /** Muted gold — accents only */
          accent: "#C6A24A",
          forest: {
            DEFAULT: "#17382F",
            dark: "#102820",
          },
          /**
           * Section backgrounds (home: hero tint → trust → about → CTA forest → contact white).
           */
          surface: {
            hero: "#F7F7F7",
            /** Neutral wash behind hero — darker for contrast vs white sections */
            "hero-tint": "#E5E7E9",
            trust: "#FFFFFF",
            about: "#F7F7F7",
          },
        },
      },
      boxShadow: {
        panel: "0 18px 40px rgba(15, 23, 42, 0.08)",
        card: "0 10px 24px rgba(15, 23, 42, 0.06)",
        /** Hero portrait — minimal depth, no glow */
        heroImage: "0 2px 12px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
        serif: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
