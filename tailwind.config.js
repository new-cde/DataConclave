/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22d3ee",      // cyan
      primaryDark: "#0ea5e9",  // blue
      deep: "#020617",         // deep navy
      surface: "#0A1424"  
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(to right, #00C2FF, #2563EB)',
        'primary-gradient-soft':
          'linear-gradient(to right, #00C2FF, #3B82F6, #2563EB)',
      },
    }
  }
}