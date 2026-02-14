import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        reader: {
          bg: "hsl(var(--reader-bg))",
          read: "hsl(var(--highlight-read))",
          focus: "hsl(var(--highlight-focus))",
          miss: "hsl(var(--highlight-miss))",
        },
        status: {
          read: "hsl(var(--status-read))",
          partial: "hsl(var(--status-partial))",
          notread: "hsl(var(--status-not-read))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
      maxWidth: {
        reader: "42rem",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        reader: ["clamp(22px, 5.2vw, 30px)", { lineHeight: "var(--line-height-reader)", letterSpacing: "-0.012em" }],
      },
      lineHeight: {
        reader: "var(--line-height-reader)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--easing-standard)",
        emphasis: "var(--easing-emphasis)",
        exit: "var(--easing-exit)",
      },
      keyframes: {
        "mic-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.88" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
      },
      animation: {
        "mic-pulse": "mic-pulse var(--duration-pulse) ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
