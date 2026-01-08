import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#fef7ee',
          100: '#fdeed7',
          200: '#f9d9ae',
          300: '#f5be7a',
          400: '#f09844',
          500: '#ec7a1f',
          600: '#dd6015',
          700: '#b74813',
          800: '#923a18',
          900: '#763216',
        },
        accent: {
          50: '#fdf3f3',
          100: '#fce4e4',
          200: '#fbcccc',
          300: '#f6a8a8',
          400: '#ef7575',
          500: '#e34848',
          600: '#d02a2a',
          700: '#ae2020',
          800: '#901e1e',
          900: '#781f1f',
        },
        warm: {
          50: '#fdfaf5',
          100: '#faf4e8',
          200: '#f4e6cb',
          300: '#ecd3a6',
          400: '#e2b97c',
          500: '#d9a05c',
          600: '#cb8747',
          700: '#aa6b3a',
          800: '#895634',
          900: '#70482e',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
