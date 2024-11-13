import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
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
