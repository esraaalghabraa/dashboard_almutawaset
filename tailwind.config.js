/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}','../components/**/*.{js,jsx,ts,tsx}', ],
  theme: {
    fontFamily: {
      display: ['Popins', 'sans-serif'],
      logo: ['Bitter', 'sans-serif'],
      Tajawal :['Tajawal', 'sans-serif']
    },
    extend: {
      keyframes:{
        expand: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' }, // Adjust max-height as needed
        },
        collapse: {
          '0%': { maxHeight: '500px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
      },
      animation: {
        expand: 'expand 0.5s ease-out forwards',
        collapse: 'collapse 0.5s ease-out forwards',
      },
      fontSize: {
        22: '22px',
        16: '16px',
        14: '14px',
      },
      colors:{
        'white':'#FFFFFF',
        'black':'000000',
        //primary
        'primary-50': '#F9F0F5',
        'primary-100': '#EFD9E7',
        'primary-200':'#DFB4CF',
        'primary-300':'#CE8EB7',
        'primary-400':'#BE699F',
        'primary-500':'#AE4387',
        'primary-600':'#8B366C',
        'primary-700':'#682851',
        'primary-800':'#461B36',
        'primary-900':'#230D1B',
        //gray
        'gray-100': '#f1f0f3',
        'gray-200':'#CCCCCC',
        'gray-300':'#B3B3B3',
        'gray-400':'#999999',
        'gray-500':'#808080',
        'gray-600':'#666666',
        'gray-700':'#4D4D4D',
        'gray-800':'#333333',
        'gray-900':'#1A1A1A',       
      },
    },
  },
  plugins: [],
}

