/** @type {import('tailwindcss').Config} */
export default {
  // Diz ao Tailwind onde procurar pelas classes (como bg-blue-500) para compilar
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}