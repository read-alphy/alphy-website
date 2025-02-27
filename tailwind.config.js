module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ["class"],
  theme: {
  	screens: {
  		xs: '420px',
  		xsSm: '510px',
  		sm: '640px',
  		md: '768px',
  		lg: '1000px',
  		xl: '1280px',
  		'2xl': '1440px',
  		'3xl': '1660px'
  	},
  	extend: {
  		transitionProperty: {
  			height: 'height'
  		},
  		keyframes: {
  			highlight: {
  				'0%': {
  					background: 'rgb(254 252 232)',
  					'box-shadow': '0 0 0 rgba(0, 0, 0, 0) drop-shadow(0 0 2rem rgba(254, 240, 138, 0.7))'
  				},
  				'100%': {
  					background: 'none'
  				}
  			}
  		},
  		textDecoration: {
  			'dashed': 'dashed'
  		},
  		height: {
  			'120': '30rem',
  			'144': '36rem',
  			'160': '40rem',
  			'6.5': '1.675rem',
  			a4: '842px'
  		},
  		width: {
  			'22': '5.6rem',
  			'50': '12.5rem',
  			'100': '25rem',
  			'104': '26rem',
  			'108': '27rem',
  			'112': '28rem',
  			'116': '29rem',
  			'120': '30rem',
  			'144': '36rem',
  			'160': '40rem',
  			a4: '795px'
  		},
  		dropShadow: {
  			'3xl': '0 20px 17px rgba(0, 0, 0, 0.35)'
  		},
  		zIndex: {
  			'-10': '-10'
  		},
  		margin: {
  			'7.5': '1.875rem',
  			'8.5': '2.25rem'
  		},
  		padding: {
  			'18': '4.5rem',
  			'26': '6.5rem'
  		},
  		spacing: {
  			'1.75': '0.4375rem',
  			'8.5': '2.2rem'
  		},
  		fontSize: {
  			'4.5xl': '2.75rem',
  			'3.5xl': '2rem',
  			'2xs': '14px',
  			'3xs': '12px',
  			'4xs': '10px',
  			'5xs': '8px'
  		},
  		fontFamily: {},
  		colors: {
  			main: '#2f3542',
  			mainText: '#ced4da',
  			sideColor: '#000',
  			darker: '#03001C',
  			darkMode: '#191919',
  			greenColor: '#86efac',
  			bordoLike: '#20262E',
  			purpleLike: '#20262E',
  			lightblueLike: '#20262E',
  			whiteLike: '#F9F8F8',
  			blueLike: '#2f3542',
  			mildDarkMode: '#202020',
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
  		backgroundImage: {
  			searchBg: "url('./img/search.svg')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	animation: {
  		highlight: 'highlight 1s ease-in-out',
  		'highlight-delayed': 'highlight 1s ease-in-out 1000ms'
  	}
  },
    plugins: [require("tailwindcss-animate")]
}
