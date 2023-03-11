/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Untitled Sans', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      serif: ['Times New Roman', 'serif'],
    },
    extend: {
      colors: {
        accent: '#851fff',
      },
    },
  },
  plugins: [],
};
