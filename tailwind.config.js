/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3', // blue color from building
          hover: '#003d7a',
        },
        secondary: {
          DEFAULT: '#f5c000', // yellow color from building
          hover: '#d9ac00',
        },
        accent: {
          DEFAULT: '#e42313', // red color from building
          hover: '#c01f10',
        },
        glass: {
          DEFAULT: '#e8f4ff', // light blue glass tint
          dark: '#cce4ff',
        }
      }
    },
  },
  plugins: [],
};
 