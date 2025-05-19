/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/**/*.css",
    "./src/**/*.scss",
    "./dist/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        menlo: ["Menlo", "Consolas", "Courier New", "monospace"],
      },
      keyframes: {
        beam: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.05)" },
        },
        fadeIn: {
          "0%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        beam: "beam var(--beam-duration) ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
      colors: {
        borderDefault: "var(--border-default-color)",
        textDefault: "var(--text-default-color)",
        textPurple: "var(--text-purple-color)",
        textLightPurple: "var(--text-light-purple-color)",
        textTitleColor: "var(--title-text-color)",
        textDangerColor: "var(--pr-status-failed-text-color)",
        textDimmedColor: "var(--text-dimmed-color)",
        textMaxDimmedColor: "var(--config-slider-rating-color)",
        textLightDimmedColor: "var(--navbar-text-color)",
        bgGrayLightHover: "var(--background-gray-light-hover)",
        bgCardColor: "var(--card-color)",
        bgDefaultColor: "var(--bg-default-color)",
        bgSelectedColor: "var(--selected-cta-bg-color)",
        bgPopoverColor: "var(--bg-popover-color)",
        bgBodyColor: "var(--body-bg-color)",
        codeHeader: "var(--code-header)",
        codeHeaderSelected: "var(--code-header-selected)",
        codeTabText: "var(--code-tab-color)",
        codeOverlayShadow: "var(--code-shadow-color)",
        scrollBarColor: "var(--config-slider-rating-color)",
        backgroundPrimary: "var(--background-primary)",
        backgroundPrimaryHover: "var(--background-primary-hover)",
        backgroundDisabled: "var(--background-disabled)",
      },
    },
  },
  plugins: [],
};
