module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        knight: {
          DEFAULT: "#1a2634"
        },
        mineta: {
          DEFAULT: "#7b78ff",
          dark: "#4643f6",
        },
        old: {
          DEFAULT: "#eef0f1"
        }
      },
      boxShadow: {
        switch: "0 0 4px 3px #7b78ff"
      },
      transitionProperty: {
        "absolution": "left, right, top, bottom"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
