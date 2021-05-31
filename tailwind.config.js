module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        knight: {
          DEFAULT: "#1a2634",
          dark: "#0d1219"
        },
        mineta: {
          DEFAULT: "#7b78ff",
          dark: "#1827ce",
        },
        old: {
          DEFAULT: "#eef0f1",
          dark: "#D2D6DB"
        }
      },
      boxShadow: {
        switch: "0 0 4px 3px #7b78ff"
      },
      transitionProperty: {
        "absolution": "left, right, top, bottom"
      },
      fontSize: {
        "markup-h1": "1.97rem",
        "markup-h2": "1.70rem",
        "markup-h3": "1.40rem",
        "markup-h4": "1.15rem",
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
