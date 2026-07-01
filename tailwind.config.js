/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#050816',
        'cyan': '#00F5FF',
        'purple': '#7B61FF',
        'magenta': '#FF2D95',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-50px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(0, 245, 255, 1)' 
          },
          '50%': { 
            boxShadow: '0 0 60px rgba(0, 245, 255, 0.5)' 
          },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        'xl': '20px',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
      },
    },
  },
  plugins: [],
}
