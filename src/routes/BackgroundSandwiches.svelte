<script lang="ts">
	import { onMount } from 'svelte';

	export let animated = true;
	export let count = 10;
	export let opacity = 0.15;

	// Create static sandwich icons
	const createStaticSandwichIcons = () => {
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

		document.body.appendChild(container);

		const sandwichTypes = ['classic', 'wrap', 'veggie', 'avocado', 'club', 'sub'];

		for (let i = 0; i < count; i++) {
			const type = sandwichTypes[Math.floor(Math.random() * sandwichTypes.length)];

			const wrapper = document.createElement('div');
			wrapper.className = 'static-sandwich';
			wrapper.style.position = 'absolute';
			wrapper.style.left = `${Math.random() * 90}vw`;
			wrapper.style.top = `${Math.random() * 90}vh`;
			wrapper.style.opacity = opacity.toString();
			wrapper.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;

			if (animated) {
				wrapper.style.animation = `sandwichFloat ${8 + Math.random() * 4}s ease-in-out infinite ${-Math.random() * 10}s`;
			}

			const iconElement = document.createElement('div');
			iconElement.className = `sandwich-icon ${type}`;
			wrapper.appendChild(iconElement);

			container.appendChild(wrapper);
		}

		return container;
	};

	onMount(() => {
		const container = createStaticSandwichIcons();

		return () => {
			if (container && document.body.contains(container)) {
				document.body.removeChild(container);
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

	:global(.static-sandwich .sandwich-icon) {
		width: 40px;
		height: 40px;
	}
</style>
