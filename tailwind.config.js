const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#0a192f",
        menuColor: "#121b2d",
        mobileMenuColor: "#121b2d",
        menuText: "#fff",
        oldalsoMenu: "#fff",
        background: "#0a192f",
        menjmar: "#fff",
        koszones: "#bae6fd",
        head1: "#38bdf8",
        head2: "#e0f2fe",
        text: "",
        neon: "#03e9f4",
        zold: "#03f40f",
        kiscim : "#f4a003",
        aiMsg1: "#00bef8",
        aiMsg2: "#0055fa",
        kekglow: "#3abff8"
      },
      boxShadow: {
        glow: '0 0 10px #3abff8, 0 0 15px #00bef8',
      }
    },
  },
  plugins: [],
});   
