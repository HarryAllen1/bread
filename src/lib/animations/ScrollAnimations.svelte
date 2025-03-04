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

	function initRevealSections() {
		const sections = document.querySelectorAll('.reveal-section');

		sections.forEach((section) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top 80%',
				onEnter: () => section.classList.add('active'),
				once: true,
			});
		});
	}

	function initRevealItems() {
		const items = document.querySelectorAll('.reveal-item');

		items.forEach((item) => {
			ScrollTrigger.create({
				trigger: item,
				start: 'top 85%',
				onEnter: () => item.classList.add('active'),
				once: true,
			});
		});
	}

	function initParallaxEffects() {
		const parallaxElements = document.querySelectorAll('.parallax-element');

		parallaxElements.forEach((element) => {
			const speed = element.getAttribute('data-speed') || '0.1';

			gsap.to(element, {
				y: `${-100 * parseFloat(speed)}%`,
				ease: 'none',
				scrollTrigger: {
					trigger: element.parentElement,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			});
		});
	}

	function initTiltEffects() {
		const tiltCards = document.querySelectorAll('.tilt-card');

		tiltCards.forEach((card) => {
			card.addEventListener('mousemove', (e) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				const centerX = rect.width / 2;
				const centerY = rect.height / 2;

				const rotateX = (y - centerY) / 10;
				const rotateY = (centerX - x) / 10;

				card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			});

			card.addEventListener('mouseleave', () => {
				card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
			});
		});
	}
</script>
