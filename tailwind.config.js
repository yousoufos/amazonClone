module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        '1/3': '33.33333%',
        '2/3': '66.66666%'
      }
    }
  },
  variants: {
    extend: { opacity: ['disabled'], borderStyle: ['hover', 'focus'] }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
