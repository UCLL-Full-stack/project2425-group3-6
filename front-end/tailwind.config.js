/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ], theme: {
    extend: {
      fontFamily: {
        'comic-light': ['"Comic Neue"', 'serif'], // For light font
        'comic-regular': ['"Comic Neue"', 'serif'], // For regular font
        'comic-bold': ['"Comic Neue"', 'serif'], // For bold font
      },
      fontWeight: {
        'light': 300,
        'regular': 400,
        'bold': 700,
      },
      fontStyle: {
        'italic': 'italic',
      },
    },
  },
  plugins: [],
}


