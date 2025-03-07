<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import lottie from 'lottie-web';
	import { Button } from '$lib/components/ui/button';
	import SandwichCarousel from './SandwichCarousel.svelte';
	import WhyGreens from './WhyGreens.svelte';
	import FarmToTable from './FarmToTable.svelte';
	import PreparationProcess from './PreparationProcess.svelte';
	import Sustainability from './Sustainability.svelte';
	import Offerings from './Offerings.svelte';
	import AnimatedSandwichBackground from '$lib/components/AnimatedSandwichBackground.svelte';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	const sandwichTypes = ['classic', 'wrap', 'veggie', 'avocado', 'club', 'sub'];
	let heroSection: HTMLDivElement;
	let lottieContainer: HTMLDivElement;
	let lottieAnimation: any;

	onMount(() => {
		// Initialize lottie animation
		if (lottieContainer) {
			lottieAnimation = lottie.loadAnimation({
				container: lottieContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: 'https://assets5.lottiefiles.com/packages/lf20_tljjahng.json', // Sandwich animation
			});
		}

		// Create intro animation
		const introOverlay = document.createElement('div');
		introOverlay.className = 'intro-overlay';
		document.body.appendChild(introOverlay);

		// Create slices
		for (let i = 0; i < 5; i++) {
			const slice = document.createElement('div');
			slice.className = 'intro-slice';
			slice.style.top = `${i * 20}vh`;
			introOverlay.appendChild(slice);
		}

		// Create content
		const introContent = document.createElement('div');
		introContent.className = 'intro-content';

		const logoContainer = document.createElement('div');
		logoContainer.className = 'intro-logo';

		const logo = document.createElement('div');
		logo.className = 'sandwich-icon classic';
		logo.style.width = '200px';
		logo.style.height = '200px';

		logoContainer.appendChild(logo);

		const text = document.createElement('div');
		text.className = 'intro-text';
		text.textContent = 'Greens';

		introContent.appendChild(logoContainer);
		introContent.appendChild(text);
		introOverlay.appendChild(introContent);

		// Create timeline for intro animation
		const introTl = gsap.timeline({
			onComplete: () => {
				document.body.classList.remove('overflow-hidden');
				introOverlay.classList.add('hidden');
				setTimeout(() => {
					document.body.removeChild(introOverlay);
				}, 1000);

				// Start hero animations after intro
				animateHero();
			},
		});

		// Set initial state
		document.body.classList.add('overflow-hidden');

		// Animate logo
		introTl.from(logoContainer, {
			scale: 0,
			rotation: -180,
			opacity: 0,
			duration: 1.2,
			ease: 'elastic.out(1, 0.5)',
		});

		// Animate text
		introTl.from(
			text,
			{
				y: 50,
				opacity: 0,
				duration: 0.8,
				ease: 'back.out(1.7)',
			},
			'-=0.5',
		);

		// Pause for a moment
		introTl.to({}, { duration: 0.7 });

		// Create slices animation
		introTl.to(logoContainer, {
			scale: 1.5,
			opacity: 0,
			duration: 0.5,
		});

		introTl.to(
			text,
			{
				opacity: 0,
				duration: 0.3,
			},
			'-=0.3',
		);

		// Animate slices
		const slices = document.querySelectorAll('.intro-slice');

		introTl.to(
			slices[0],
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.1',
		);

		introTl.to(
			slices[1],
			{
				xPercent: 100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		introTl.to(
			slices[2],
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		introTl.to(
			slices[3],
			{
				xPercent: 100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		introTl.to(
			slices[4],
			{
				xPercent: -100,
				duration: 0.8,
				ease: 'power2.inOut',
			},
			'-=0.7',
		);

		// Hide overlay
		introTl.to(
			introOverlay,
			{
				opacity: 0,
				duration: 0.5,
			},
			'-=0.3',
		);

		// Initialize scroll animations
		initScrollAnimations();
	});

	function animateHero() {
		if (!heroSection) return;

		// Hero section animation
		gsap.from('.hero-title', {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power3.out',
		});

		gsap.from('.hero-description', {
			opacity: 0,
			y: 30,
			duration: 1,
			delay: 0.3,
			ease: 'power3.out',
		});

		gsap.from('.hero-buttons', {
			opacity: 0,
			y: 30,
			duration: 1,
			delay: 0.6,
			ease: 'power3.out',
		});

		// Animate background gradient
		gsap.to('.hero-bg', {
			backgroundPosition: '100% 100%',
			duration: 15,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
		});

		// Animate decorative elements
		const decorElements = heroSection.querySelectorAll('.hero-decor');
		decorElements.forEach((el, index) => {
			gsap.to(el, {
				y: -20 + Math.random() * 40,
				x: -10 + Math.random() * 20,
				rotation: Math.random() * 20 - 10,
				duration: 5 + Math.random() * 5,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: index * 0.2,
			});
		});
	}

	function initScrollAnimations() {
		// Animate sections on scroll
		const sections = document.querySelectorAll('.animate-on-scroll');
		sections.forEach((section) => {
			gsap.from(section, {
				opacity: 0,
				y: 50,
				duration: 1,
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					end: 'top 50%',
					scrub: 1,
				},
			});
		});

		// Parallax effect for background elements
		const parallaxElements = document.querySelectorAll('.parallax');
		parallaxElements.forEach((element) => {
			gsap.to(element, {
				y: -100,
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

	function createFloatingSandwiches() {
		// Use only the icons that are loading properly
		const workingSandwichTypes = ['hamburger', 'croissant', 'sandwich'];

		for (let i = 0; i < 20; i++) {
			const sandwich = document.createElement('div');
			sandwich.className = `floating-sandwich`;

			// Random position
			sandwich.style.left = `${Math.random() * 100}vw`;
			sandwich.style.top = `${Math.random() * 100}vh`;

			// Random size
			const size = 40 + Math.random() * 60;
			sandwich.style.width = `${size}px`;
			sandwich.style.height = `${size}px`;

			// Random rotation
			sandwich.style.transform = `rotate(${Math.random() * 360}deg)`;

			// Add shadow for visibility
			sandwich.style.filter = 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))';

			// Create image element instead of using CSS classes
			const img = document.createElement('img');
			const iconType =
				workingSandwichTypes[Math.floor(Math.random() * workingSandwichTypes.length)];
			img.src = `https://img.icons8.com/color/96/${iconType}.png`;
			img.alt = 'Food icon';
			img.className = 'w-full h-full object-contain';

			sandwich.appendChild(img);
			document.body.appendChild(sandwich);

			// Animate with GSAP
			gsap.to(sandwich, {
				x: -200 + Math.random() * 400,
				y: -200 + Math.random() * 400,
				rotation: Math.random() * 360,
				duration: 10 + Math.random() * 15,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
			});
		}
	}
</script>
<AnimatedSandwichBackground count={25} animated={true} opacity={0.3} speed={1.5} />

<div class="relative min-h-screen" bind:this={heroSection}>
	<!-- Animated gradient background -->
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-primary/10 hero-bg animate-gradient-background"
		style="background-size: 400% 400%; background-position: 0% 0%;"
	></div>

	<!-- Decorative elements - using only working icons -->
	<!-- <div
		class="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-20 hero-decor"
	>
		<img src="https://img.icons8.com/color/96/hamburger.png" alt="Hamburger" class="w-24 h-24" />
	</div>
	<div
		class="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 opacity-20 hero-decor"
	>
		<img src="https://img.icons8.com/color/96/croissant.png" alt="Croissant" class="w-20 h-20" />
	</div>
	<div
		class="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-20 hero-decor"
	>
		<img src="https://img.icons8.com/color/96/sandwich.png" alt="Sandwich" class="w-16 h-16" />
	</div> -->

	<div class="container mx-auto px-4 py-12 md:py-16 relative z-10">
		<div class="max-w-3xl mx-auto text-center mb-12">
			<div
				class="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 text-primary font-medium backdrop-blur-sm border border-primary/30 hero-badge"
			>
				Premium Vegetarian Cuisine
			</div>

			<h1
				class="hero-title text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance bg-gradient-to-r from-primary/90 to-primary p-6 rounded-lg inline-block backdrop-blur-sm border-2 border-primary/70 shadow-lg text-white"
			>
				Artisanal Vegetarian Sandwiches
			</h1>

			<p
				class="hero-description text-base md:text-lg text-foreground mb-6 max-w-2xl mx-auto leading-relaxed bg-background/90 px-6 py-3 rounded-lg inline-block backdrop-blur-sm border-2 border-primary/70 shadow-lg font-medium"
			>
				Experience our meticulously crafted selection of premium vegetarian sandwiches, featuring
				locally-sourced ingredients and innovative flavor combinations.
			</p>

			<div class="hero-buttons flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
				<Button
					size="lg"
					class="text-lg px-6 py-5 hover-lift w-full sm:w-auto rounded-full shadow-lg transition-all duration-500 hover:shadow-primary/30 hover:shadow-xl bg-gradient-to-r from-primary to-primary/80 text-white"
					href="/menu"
				>
					Explore Menu
				</Button>
				<Button
					variant="outline"
					size="lg"
					class="text-lg px-6 py-5 hover-lift w-full sm:w-auto rounded-full shadow-lg transition-all duration-500 hover:shadow-primary/20 hover:shadow-xl border-primary text-primary"
					href="/create"
				>
					Customize Your Order
				</Button>
			</div>
		</div>

		<div
			class="bg-card rounded-2xl mb-12 overflow-hidden shadow-2xl animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-500 animate-on-scroll"
		>
			<SandwichCarousel />
		</div>

		<div
			class="animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-700 animate-on-scroll"
		>
			<WhyGreens />
		</div>
	</div>

	<div
		class="animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-900 animate-on-scroll parallax"
	>
		<FarmToTable />
	</div>

	<div
		class="animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-1000 animate-on-scroll"
	>
		<PreparationProcess />
	</div>

	<div
		class="animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-1100 animate-on-scroll parallax"
	>
		<Sustainability />
	</div>

	<div class="relative">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
		<div
			class="animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-1200 animate-on-scroll"
		>
			<Offerings />
		</div>
	</div>
</div>

<style>
	.intro-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
	}

	.intro-overlay.hidden {
		display: none;
	}

	.intro-slice {
		position: absolute;
		width: 100%;
		height: 20vh;
		background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
		transform-origin: center;
	}

	.intro-slice:nth-child(1) {
		top: 0;
	}

	.intro-slice:nth-child(2) {
		top: 20vh;
	}

	.intro-slice:nth-child(3) {
		top: 40vh;
	}

	.intro-slice:nth-child(4) {
		top: 60vh;
	}

	.intro-slice:nth-child(5) {
		top: 80vh;
	}

	.intro-content {
		position: relative;
		z-index: 10;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.intro-logo {
		width: 200px;
		height: 200px;
		margin: 0 auto;
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.intro-text {
		font-size: 5rem;
		font-weight: bold;
		background: linear-gradient(to right, #ffffff, #e0f7fa, #ffffff);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin-top: 1rem;
		text-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		animation: gradient-shift 3s ease infinite;
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.hero-badge {
		animation: pulse 3s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
		}
	}

	.floating-sandwich {	x
		position: absolute;
		z-index: -1;
		pointer-events: none;
		opacity: 0.4;
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

	@keyframes gradient-background {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 100% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}

	.animate-gradient-background {
		animation: gradient-background 15s ease infinite;
	}
</style>
