export const theme = {
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
    },
    dark: {
      bg: '#0a0a0a',
      card: '#1a1a1a',
      border: '#2a2a2a'
    }
  },
  animations: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      loader: '2000ms',
      longTransition: '800ms'
    },
    easing: {
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  },
  spacing: {
    section: {
      mobile: '4rem',
      tablet: '6rem',
      desktop: '8rem'
    },
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    gutter: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem'
    }
  },
  typography: {
    fonts: {
      sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['Fredoka', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    pet: '0 4px 14px 0 rgba(251, 146, 60, 0.25)',
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    paw: '60% 40% 30% 70% / 60% 30% 70% 40%'
  }
}

export const siteConfig = {
  name: 'Ps Pet Care',
  description: 'Premium pet daycare and boarding services in Chennai. Professional care for your beloved pets.',
  url: 'https://pspetcare.in',
  phone: '+91 99622 03484',
  whatsapp: '919962203484',
  email: 'hello@pspetcare.in',
  address: {
    street: '123 Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zip: '600040',
    country: 'India'
  },
  hours: {
    weekday: '7:00 AM - 8:00 PM',
    saturday: '8:00 AM - 6:00 PM',
    sunday: '9:00 AM - 5:00 PM'
  },
  social: {
    facebook: 'https://facebook.com/pspetcare',
    instagram: 'https://instagram.com/pspetcare',
    twitter: 'https://twitter.com/pspetcare',
    youtube: 'https://youtube.com/pspetcare'
  }
}

export const animationConfig = {
  defaultDuration: theme.animations.duration.normal,
  defaultEasing: theme.animations.easing.smooth,
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  stagger: {
    default: 0.1,
    fast: 0.05,
    slow: 0.2
  }
}