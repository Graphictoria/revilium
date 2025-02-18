/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,svelte}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '3rem',
				sm: '4rem',
				lg: '5rem',
				xl: '6rem',
				'2xl': '7rem'
			}
		},
		extend: {
			colors: {
				accent: 'var(--revilium-accent)',
				base: 'var(--revilium-base)',
				secondary: 'var(--revilium-secondary)',
				terciary: 'var(--revilium-terciary)',
				surface0: 'var(--revilium-surface0)',
				surface1: 'var(--revilium-surface1)',
				surface2: 'var(--revilium-surface2)',
				overlay0: 'var(--revilium-overlay0)',
				overlay1: 'var(--revilium-overlay1)',
				overlay2: 'var(--revilium-overlay2)',
				text: 'var(--revilium-text)',
				subtext0: 'var(--revilium-subtext0)',
				subtext1: 'var(--revilium-subtext1)',
				danger: 'var(--revilium-danger)',
				warning: 'var(--revilium-warning)',
				success: 'var(--revilium-success)',
				status: {
					offline: 'var(--revilium-status-offline)',
					online: 'var(--revilium-status-online)',
					ingame: 'var(--revilium-status-ingame)'
				},
				role: {
					banned: 'var(--revilium-role-banned)',
					user: 'var(--revilium-role-user)',
					bc: 'var(--revilium-role-bc)',
					tbc: 'var(--revilium-role-tbc)',
					obc: 'var(--revilium-role-obc)',
					catalog_manager: 'var(--revilium-role-catalog_manager)',
					administrator: 'var(--revilium-role-administrator)',
					developer: 'var(--revilium-role-developer)'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@catppuccin/tailwindcss')({
			prefix: 'ctp'
		})
	]
};
