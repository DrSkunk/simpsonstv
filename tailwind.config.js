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
        glitch: {
          '0%': {
            transform: 'translate(20px, 0) skew(0deg) scaleX(1)',
            filter: 'grayscale(.5)',
          },
          '1%': {
            transform: 'translate(-20px, 0) skew(5deg)',
          },
          '2%': {
            transform: 'translate(20px, 0) skew(0deg)',
          },
          '30%': {
            transform: 'translate(-20px, 0) skew(0deg) scaleX(1.05)',
            filter: 'grayscale(1)',
          },
          '32%': {
            transform: 'translate(0, 0) skew(-5deg)',
          },
          '33%': {
            transform: 'translate(10px, 0) skew(0) scaleX(1.1)',
            filter: 'grayscale(.3)',
          },
          '90%': {
            transform: 'translate(0, 0) skew(0) scaleX(1.01)',
            filter: 'grayscale(0)',
          },
        },
        'tv-off-line': {
          '0%': {
            opacity: '0',
          },
          '1%': {
            opacity: '1',
            transform: 'scaleY(1);',
          },
          '50%': {
            transform: 'scale(1,.02);',
          },
          '99%': {
            transform: 'scale(.01,.02);',
          },
          '100%': {
            transform: 'scale(0);',
          },
        },
        'tv-off-dot': {
          '0%': {
            transform: 'scale(0);',
          },

          '60%': {
            transform: 'scale(1);',
          },
          '75%': {
            transform: 'scale(2);',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0);',
            opacity: '0',
          },
        },
      },
      animation: {
        glitch: 'glitch 6s ease-in-out infinite',
        'tv-off-line': 'tv-off-line .6s ease-in-out forwards',
        'tv-on-line': 'tv-off-line .6s ease-in-out reverse',
        'tv-off-dot': 'tv-off-dot .6s ease-in-out forwards',
        'tv-on-dot': 'tv-off-dot .6s ease-in-out reverse',
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
