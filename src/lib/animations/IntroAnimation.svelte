<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';

	let introOverlay: HTMLDivElement;
	let introComplete = false;

	onMount(() => {
		// Create timeline for intro animation
		const tl = gsap.timeline({
			onComplete: () => {
				introComplete = true;
				document.body.classList.remove('overflow-hidden');

				// Trigger content animations after intro
				gsap.to('.hero-content', {
					opacity: 1,
					y: 0,
					duration: 1,
					stagger: 0.2,
					ease: 'power3.out',
				});
			},
		});

		// Set initial state
		document.body.classList.add('overflow-hidden');

		// Animate logo
		tl.from('.intro-logo', {
			scale: 0,
			rotation: -180,
			opacity: 0,
			duration: 1.2,
			ease: 'elastic.out(1, 0.5)',
		});

		// Animate text
		tl.from(
			'.intro-text',
			{
				y: 50,
				opacity: 0,
				duration: 0.8,
				ease: 'back.out(1.7)',
			},
			'-=0.5',
		);

		// Create sandwich explosion
		tl.to(
			'.intro-logo',
			{
				scale: 1.5,
				duration: 0.5,
				ease: 'power2.in',
			},
			'+=0.5',
		);

		// Create slices animation
		tl.to('.intro-content', {
			opacity: 0,
			duration: 0.3,
		});

		// Animate slices
		tl.to(
			'.intro-slice:nth-child(1)',
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.1',
		);

		tl.to(
			'.intro-slice:nth-child(2)',
			{
				xPercent: 100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		tl.to(
			'.intro-slice:nth-child(3)',
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		tl.to(
			'.intro-slice:nth-child(4)',
			{
				xPercent: 100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		tl.to(
			'.intro-slice:nth-child(5)',
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		// Hide overlay
		tl.to(
			'.intro-overlay',
			{
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					introOverlay.classList.add('hidden');
				},
			},
			'-=0.3',
		);

		// Create floating sandwich icons
		for (let i = 0; i < 20; i++) {
			createFloatingSandwich();
		}
	});

	function createFloatingSandwich() {
		const types = ['classic', 'wrap', 'veggie'];
		const type = types[Math.floor(Math.random() * types.length)];

		const sandwich = document.createElement('div');
		sandwich.className = `sandwich-explosion`;
		sandwich.style.left = `${Math.random() * 100}vw`;
		sandwich.style.top = `${Math.random() * 100}vh`;
		sandwich.style.animationDelay = `${Math.random() * 0.5}s`;

		const icon = document.createElement('div');
		icon.className = `sandwich-icon ${type}`;
		icon.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;

		sandwich.appendChild(icon);
		document.body.appendChild(sandwich);

		// Remove after animation completes
		setTimeout(() => {
			document.body.removeChild(sandwich);
		}, 2000);
	}
</script>

<div class="intro-overlay" bind:this={introOverlay}>
	<div class="intro-slice"></div>
	<div class="intro-slice"></div>
	<div class="intro-slice"></div>
	<div class="intro-slice"></div>
	<div class="intro-slice"></div>

	<div class="intro-content">
		<div class="intro-logo">
			<SandwichIcon type="classic" size="lg" />
		</div>
		<div class="intro-text">Greens</div>
	</div>
</div>
