<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		animated?: boolean;
		count?: number;
		opacity?: number;
		pattern?: boolean; // Whether to arrange in a pattern (checkerboard) or random
	}

	let { animated = true, count = 30, opacity = 0.15, pattern = false }: Props = $props();

	// Create static sandwich icons
	const createStaticSandwichIcons = (): HTMLDivElement => {
		const container = document.createElement('div');
		container.className = 'static-sandwiches-container';
		container.style.position = 'absolute';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100%';
		container.style.height = '100%';
		container.style.overflow = 'hidden';
		container.style.pointerEvents = 'none';
		container.style.zIndex = '-1';

		document.body.append(container);

		// Use only icons that are loading properly
		const workingIcons = [
			{ src: 'https://img.icons8.com/color/96/hamburger.png', alt: 'Hamburger' },
			{ src: 'https://img.icons8.com/color/96/croissant.png', alt: 'Croissant' },
			{ src: 'https://img.icons8.com/color/96/sandwich.png', alt: 'Sandwich' },
		];

		if (pattern) {
			// Create a checkerboard pattern
			const gridSize = Math.ceil(Math.sqrt(count));
			const cellWidth = 100 / gridSize;
			const cellHeight = 100 / gridSize;

			let counter = 0;
			for (let row = 0; row < gridSize; row++) {
				for (let col = 0; col < gridSize; col++) {
					if (counter >= count) break;

					const wrapper = document.createElement('div');
					wrapper.className = 'static-sandwich';
					wrapper.style.position = 'absolute';
					wrapper.style.left = `${col * cellWidth + Math.random() * cellWidth * 0.5}vw`;
					wrapper.style.top = `${row * cellHeight + Math.random() * cellHeight * 0.5}vh`;
					wrapper.style.opacity = opacity.toString();
					wrapper.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
					wrapper.style.filter = 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))';

					if (animated) {
						wrapper.style.animation = `sandwichFloat ${8 + Math.random() * 12}s ease-in-out infinite`;
						wrapper.style.animationDelay = `${-Math.random() * 10}s`;
					}

					// Use image element instead of CSS classes
					const img = document.createElement('img');
					const icon = workingIcons[Math.floor(Math.random() * workingIcons.length)];
					img.src = icon.src;
					img.alt = icon.alt;
					img.style.width = `${40 + Math.random() * 30}px`;
					img.style.height = `${40 + Math.random() * 30}px`;
					wrapper.append(img);

					container.append(wrapper);
					counter++;
				}
			}
		} else {
			// Random distribution
			for (let i = 0; i < count; i++) {
				const wrapper = document.createElement('div');
				wrapper.className = 'static-sandwich';
				wrapper.style.position = 'absolute';
				wrapper.style.left = `${Math.random() * 90}vw`;
				wrapper.style.top = `${Math.random() * 90}vh`;
				wrapper.style.opacity = opacity.toString();
				wrapper.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
				wrapper.style.filter = 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))';

				if (animated) {
					wrapper.style.animation = `sandwichFloat ${8 + Math.random() * 12}s ease-in-out infinite`;
					wrapper.style.animationDelay = `${-Math.random() * 10}s`;
				}

				// Use image element instead of CSS classes
				const img = document.createElement('img');
				const icon = workingIcons[Math.floor(Math.random() * workingIcons.length)];
				img.src = icon.src;
				img.alt = icon.alt;
				img.style.width = `${40 + Math.random() * 30}px`;
				img.style.height = `${40 + Math.random() * 30}px`;
				wrapper.append(img);

				container.append(wrapper);
			}
		}

		return container;
	};

	onMount(() => {
		const container = createStaticSandwichIcons();

		return () => {
			if (document.body.contains(container)) {
				container.remove();
			}
		};
	});
</script>

<style>
	:global(.static-sandwich) {
		position: absolute;
		z-index: -1;
		pointer-events: none;
	}

	@keyframes sandwichFloat {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(40px, -30px) rotate(15deg);
		}
		50% {
			transform: translate(80px, 0) rotate(0deg);
		}
		75% {
			transform: translate(40px, 30px) rotate(-15deg);
		}
	}
</style>
