/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  plugins: [require("daisyui")],
  theme: {},

  daisyui: {
    themes: [
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#d7172f",
          "primary-content": "#ffffff",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "#d7172f",
          "primary-content": "#ffffff",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
      },
    ],
  },
};
