import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		{
			...threeMinifier(),
			enforce: 'pre',
		},
		sveltekit(),
	],
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
