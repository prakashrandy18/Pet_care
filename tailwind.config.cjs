/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe3fe',
          300: '#94d1fc',
          400: '#61b6f9',
          500: '#3b82f6',
          600: '#2570eb',
          700: '#1d5fd8',
          800: '#1e4fae',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#451a03'
        },
        pet: {
          brown: '#8B4513',
          golden: '#FFD700',
          cream: '#FFFDD0',
          gray: '#808080'
        }
      },
      fontFamily: {
        'sans': ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Fredoka', 'system-ui', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pet-run': 'pet-run 2s steps(8) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'paw-print': 'pawPrint 1.5s ease-out forwards'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pet-run': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-800px 0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pawPrint: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(-45deg)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem'
      },
      borderRadius: {
        'paw': '60% 40% 30% 70% / 60% 30% 70% 40%'
      },
      backgroundImage: {
        'paw-pattern': "url('/images/paw-pattern.svg')",
        'bone-pattern': "url('/images/bone-pattern.svg')"
      },
      boxShadow: {
        'pet': '0 4px 14px 0 rgba(251, 146, 60, 0.25)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}