/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // «Остров»: тёмный лесной фон + зелёно-янтарные акценты
        isle: {
          950: '#070b08',
          900: '#0b110d',
          800: '#111a14',
          700: '#182419',
          600: '#213124',
          500: '#2d4231',
        },
        moss: {
          300: '#b4d9a0',
          400: '#8fc177',
          500: '#6aa551',
          600: '#4f843d',
          700: '#3b6330',
        },
        amber: {
          300: '#fcd581',
          400: '#f6b94a',
          500: '#e89a1c',
          600: '#c27a10',
        },
        bone: {
          100: '#ece7da',
          300: '#c9c3b2',
          500: '#8f8a7a',
        },
        blood: {
          400: '#e0624f',
          500: '#c4412f',
        },
      },
      fontFamily: {
        display: ['"Unbounded"', 'system-ui', 'sans-serif'],
        sans: ['"Onest"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fog-drift': {
          '0%, 100%': { transform: 'translate3d(-4%, 0, 0)' },
          '50%': { transform: 'translate3d(6%, -3%, 0)' },
        },
        'fog-drift-rev': {
          '0%, 100%': { transform: 'translate3d(5%, 0, 0)' },
          '50%': { transform: 'translate3d(-6%, 3%, 0)' },
        },
      },
      animation: {
        'fog-drift': 'fog-drift 28s ease-in-out infinite',
        'fog-drift-rev': 'fog-drift-rev 34s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(246, 185, 74, 0.35)',
      },
      backgroundImage: {
        'isle-radial':
          'radial-gradient(ellipse at 20% 0%, rgba(79,132,61,0.18), transparent 55%), radial-gradient(ellipse at 90% 10%, rgba(232,154,28,0.10), transparent 50%)',
      },
    },
  },
  plugins: [],
}
