import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(),enhancedImages(), sveltekit()],
	build: {
		target: 'es2020',
		sourcemap: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020',
		},
	},
});
