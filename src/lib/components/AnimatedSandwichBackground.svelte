<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';

	interface Props {
		count?: number;
		animated?: boolean;
		opacity?: number;
		speed?: number;
	}

	let { count = 15, animated = true, opacity = 0.5, speed = 2 }: Props = $props();

	let container: HTMLDivElement | undefined = $state();
	let sandwiches: HTMLDivElement[] = [];

	// Reduced icon set to only include icons that are loading properly
	const sandwichIcons = [
		'https://img.icons8.com/color/96/hamburger.png',
		'https://img.icons8.com/color/96/croissant.png',
		'https://img.icons8.com/color/96/sandwich.png', // Added sandwich icon that loads properly
	];

	onMount(() => {
		if (!container) return;

		// Create sandwich elements
		for (let i = 0; i < count; i++) {
			const sandwich = document.createElement('div');
			sandwich.className = 'absolute pointer-events-none';

			// Random position
			sandwich.style.left = `${Math.random() * 100}vw`;
			sandwich.style.top = `${Math.random() * 100}vh`;

			// Random size
			const size = 40 + Math.random() * 60;
			sandwich.style.width = `${size}px`;
			sandwich.style.height = `${size}px`;

			// Random rotation
			sandwich.style.transform = `rotate(${Math.random() * 360}deg)`;

			// Set opacity
			sandwich.style.opacity = opacity.toString();

			// Add shadow for more visibility
			sandwich.style.filter = 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))';

			// Create image
			const img = document.createElement('img');
			img.src = sandwichIcons[Math.floor(Math.random() * sandwichIcons.length)];
			img.alt = 'Sandwich icon';
			img.className = 'w-full h-full object-contain';
			img.loading = 'eager'; // Ensure images load immediately

			sandwich.append(img);
			// eslint-disable-next-line svelte/no-dom-manipulating
			container.append(sandwich);
			sandwiches.push(sandwich);

			if (animated) {
				// Animate with GSAP
				gsap.to(sandwich, {
					x: `${-200 + Math.random() * 400}px`,
					y: `${-200 + Math.random() * 400}px`,
					rotation: `${Math.random() * 720 - 360}`,
					duration: 5 + Math.random() * 10 * (1 / speed),
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
				});
			}
		}
	});

	onDestroy(() => {
		// Clean up GSAP animations
		for (const sandwich of sandwiches) {
			gsap.killTweensOf(sandwich);
		}
	});
</script>

<div
	bind:this={container}
	class="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
></div>
