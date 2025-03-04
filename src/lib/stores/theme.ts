import { writable } from 'svelte/store';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
	if (!isBrowser) return 'light';

	const stored = localStorage.getItem('theme');
	if (stored) return stored;

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const theme = writable<'light' | 'dark'>(getInitialTheme());

// Subscribe to changes and update localStorage and document class
if (isBrowser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}
