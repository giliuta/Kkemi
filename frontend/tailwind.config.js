/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        display: ['Playfair Display', 'serif'],
                        heading: ['Libre Baskerville', 'serif'],
                        body: ['Inter', 'sans-serif'],
                        accent: ['Space Mono', 'monospace'],
                },
                colors: {
                        cream: '#FAF8F5',
                        charcoal: '#1A1A1A',
                        'soft-cream': '#F2EBE5',
                        'blush': '#E8B4B8',
                        'gold': '#B8860B',
                        'royal': '#5B2C6F',
                        'forest': '#1B4332',
                        'coral': '#FF6B6B',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'marquee': {
                                '0%': { transform: 'translateX(0%)' },
                                '100%': { transform: 'translateX(-50%)' }
                        },
                        'marquee-reverse': {
                                '0%': { transform: 'translateX(-50%)' },
                                '100%': { transform: 'translateX(0%)' }
                        },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                '50%': { transform: 'translateY(-20px) rotate(3deg)' }
                        },
                        'grain': {
                                '0%, 100%': { transform: 'translate(0, 0)' },
                                '10%': { transform: 'translate(-5%, -10%)' },
                                '30%': { transform: 'translate(3%, -15%)' },
                                '50%': { transform: 'translate(12%, 9%)' },
                                '70%': { transform: 'translate(9%, 4%)' },
                                '90%': { transform: 'translate(-1%, 7%)' }
                        },
                        'dash': {
                                'to': { strokeDashoffset: '0' }
                        },
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'marquee': 'marquee 30s linear infinite',
                        'marquee-reverse': 'marquee-reverse 35s linear infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'grain': 'grain 8s steps(10) infinite',
                        'dash': 'dash 2s ease-in-out forwards',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
