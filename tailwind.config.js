module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', "./node_modules/flowbite/**/*.js"],
	plugins: [
		require('flowbite/plugin')
	],
	theme: {
		screens: {
			xs:"420px",
			xsSm:"510px",
			sm: '640px',
			md: '768px',
			lg: '1000px',
			xl: '1280px',
			'2xl': '1440px',
			'3xl': '1660px',

		},
		darkMode: 'class',

		extend: {
			transitionProperty: {
				'height': 'height',
			  },
			keyframes: {
				highlight: {
					'0%': {
						background: 'rgb(254 252 232)',
						'box-shadow': '0 0 0 rgba(0, 0, 0, 0) drop-shadow(0 0 2rem rgba(254, 240, 138, 0.7))',


					},
					'100%': {
						background: 'none',
					},
				}
				
			},
			textDecoration: ['dashed'],
			height: {
				6.5: '1.675rem',
				a4: '842px',
				120: '30rem',
				144: '36rem',
				160: '40rem',
			},
			width: {
				22: '5.6rem',
				50: '12.5rem',
				100: '25rem',
				104: '26rem',
				108: '27rem',
				112: '28rem',
				116: '29rem',
				120: '30rem',
				144: '36rem',
				160: '40rem',
				a4: '795px',
			},
			dropShadow: {
				'3xl': '0 20px 17px rgba(0, 0, 0, 0.35)',
			},

			zIndex: {
				'-10': '-10',
			},
			margin: {
				7.5: '1.875rem',
				8.5: '2.25rem',
			},
			padding: {
				18: '4.5rem',
				26: '6.5rem',
			},
			spacing: {
				1.75: '0.4375rem',
				8.5: '2.2rem',
			},
			fontSize: {
				'4.5xl': '2.75rem',
				'3.5xl': '2rem',
				'2xs': '14px',
				'3xs': '12px',
				'4xs': '10px',
				'5xs': '8px',
			},
			fontFamily: {
		/* 		noto: ['Noto Sans', 'sans-serif'], */

			},
			colors: {
				main: '#2f3542',
				mainText: '#ced4da',
				sideColor: '#000',
				darker: '#03001C',
				darkMode:"#191919",
				greenColor:"#86efac",
				// palette - sunset
				bordoLike: '#20262E',
				purpleLike: '#20262E',

				lightblueLike: '#20262E',

				//palette - fener
				whiteLike: '#F9F8F8',
				blueLike: '#2f3542',
				mildDarkMode:"#202020",
//				midestDarkMode:"#1a1a1a",
			},
			backgroundImage: (theme) => ({
				searchBg: "url('./img/search.svg')",
			}),
		},
		animation: {
			highlight: 'highlight 1s ease-in-out',
			'highlight-delayed': 'highlight 1s ease-in-out 1000ms',
		},
	},
};
