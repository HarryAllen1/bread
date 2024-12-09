import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltePhosphorOptimize } from 'phosphor-svelte/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltePhosphorOptimize(), enhancedImages(), sveltekit()],
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
