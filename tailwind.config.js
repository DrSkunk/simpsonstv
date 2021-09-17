module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        oldgreen: '#2ef608',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(5px) scale(1.07)' },
          '50%': { transform: 'translateY(0px) scale(1.05)' },
        },
        glitch: {
          '0%': {
            transform: 'translate(20px, 0) skew(0deg)',
          },
          '1%': {
            transform: 'translate(-20px, 0) skew(5deg)',
          },
          '2%': {
            transform: 'translate(20px, 0) skew(0deg)',
          },
          '30%': {
            transform: 'translate(-20px, 0) skew(0deg)',
          },
          '32%': {
            transform: 'translate(0, 0) skew(-2deg)',
          },
          '33%': {
            transform: 'translate(0, 0) skew(0)',
          },
        },
      },
      animation: {
        glitch: 'glitch 5s linear infinite',
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
      fontFamily: {
        vcr: 'VCR OSD Mono',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
