/** @type {import('tailwindcss').Config} */
module.exports = {
    // Tell Tailwind where to look for class names
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},    // you can add custom theming here later
    },
    plugins: [],     // add Tailwind plugins here if you need them
  }
  