<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import BreadIcon from '$lib/icons/BreadIcon.svelte';

	export let count = 10;
	export let types = ['classic', 'wrap', 'veggie'];

	onMount(() => {
		createFloatingElements();
	});

	function createFloatingElements() {
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

		document.body.appendChild(container);

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
			element.appendChild(iconElement);

			container.appendChild(element);

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
	}
</script>
