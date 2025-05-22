/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ieee': ['Times New Roman', 'serif'],
        'sans': ['Arial', 'sans-serif'],
      },
      fontSize: {
        'ieee-title': ['24px', '28px'],
        'ieee-author': ['12px', '14px'],
        'ieee-body': ['10px', '12px'],
        'ieee-caption': ['8px', '10px'],
      },
      spacing: {
        'ieee-margin': '0.75in',
        'ieee-column-gap': '0.25in',
      },
      colors: {
        'ieee-blue': '#003366',
        'ieee-gray': '#666666',
      },
      maxWidth: {
        'ieee-page': '8.5in',
      },
      minHeight: {
        'ieee-page': '11in',
      }
    },
  },
  plugins: [],
} 