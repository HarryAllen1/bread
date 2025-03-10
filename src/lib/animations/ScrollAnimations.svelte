<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	onMount(() => {
		// Register ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		// Initialize reveal sections
		initRevealSections();

		// Initialize reveal items
		initRevealItems();

		// Initialize parallax effects
		initParallaxEffects();

		// Initialize tilt effects
		initTiltEffects();
	});

	const initRevealSections = (): void => {
		const sections = document.querySelectorAll('.reveal-section');

		for (const section of sections) {
			ScrollTrigger.create({
				trigger: section,
				start: 'top 80%',
				onEnter: () => section.classList.add('active'),
				once: true,
			});
		}
	};

	const initRevealItems = (): void => {
		const items = document.querySelectorAll('.reveal-item');

		for (const item of items) {
			ScrollTrigger.create({
				trigger: item,
				start: 'top 85%',
				onEnter: () => item.classList.add('active'),
				once: true,
			});
		}
	};

	const initParallaxEffects = (): void => {
		const parallaxElements = document.querySelectorAll<HTMLDivElement>('.parallax-element');

		for (const element of parallaxElements) {
			const speed = element.dataset.speed || '0.1';

			gsap.to(element, {
				y: `${-100 * Number.parseFloat(speed)}%`,
				ease: 'none',
				scrollTrigger: {
					trigger: element.parentElement,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			});
		}
	};

	const initTiltEffects = (): void => {
		const tiltCards = document.querySelectorAll<HTMLDivElement>('.tilt-card');

		for (const card of tiltCards) {
			card.addEventListener('mousemove', (event) => {
				const rect = card.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;

				const centerX = rect.width / 2;
				const centerY = rect.height / 2;

				const rotateX = (y - centerY) / 10;
				const rotateY = (centerX - x) / 10;

				card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			});

			card.addEventListener('mouseleave', () => {
				card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
			});
		}
	};
</script>
