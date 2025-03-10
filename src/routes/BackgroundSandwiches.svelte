<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		animated?: boolean;
		count?: number;
		opacity?: number;
	}

	let { animated = true, count = 10, opacity = 0.15 }: Props = $props();

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
			wrapper.append(iconElement);

			container.append(wrapper);
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

	:global(.static-sandwich .sandwich-icon) {
		width: 40px;
		height: 40px;
	}
</style>
