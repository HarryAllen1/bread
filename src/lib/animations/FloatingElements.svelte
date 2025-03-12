<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface Props {
		count: number;
		types: string[];
	}
	let { count, types }: Props = $props();

	onMount(() => {
		createFloatingElements();
	});

	const createFloatingElements = (): void => {
		const container = document.createElement('div');
		container.className = 'floating-elements-container';
		container.style.position = 'absolute';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100%';
		container.style.height = '100%';
		container.style.overflow = 'hidden';
		container.style.pointerEvents = 'none';
		container.style.zIndex = '1';

		document.body.append(container);

		for (let i = 0; i < count; i++) {
			const element = document.createElement('div');
			element.className = 'floating-element';

			// Random position
			element.style.left = `${Math.random() * 100}vw`;
			element.style.top = `${Math.random() * 100}vh`;

			// Random size
			const size = 30 + Math.random() * 50;
			element.style.width = `${size}px`;
			element.style.height = `${size}px`;

			// Random rotation
			element.style.transform = `rotate(${Math.random() * 360}deg)`;

			// Create icon
			const type = types[Math.floor(Math.random() * types.length)];
			const iconElement = document.createElement('div');
			iconElement.className = `sandwich-icon ${type}`;
			element.append(iconElement);

			container.append(element);

			// Animate with GSAP
			gsap.to(element, {
				x: `${-50 + Math.random() * 100}vw`,
				y: `${-50 + Math.random() * 100}vh`,
				rotation: `${Math.random() * 720 - 360}`,
				duration: 30 + Math.random() * 60,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
			});
		}
	};
</script>
