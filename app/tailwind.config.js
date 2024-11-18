// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#1d4ed8"
      }
    }
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: ["light", "dark", "cupcake"], // add desired themes here
    darkTheme: "dark" // optional: specify default dark theme
  }
};
