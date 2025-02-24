<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import BreadCarousel from './BreadCarousel.svelte';
	import Offerings from './Offerings.svelte';
	import WhyBread from './WhyBread.svelte';
	import { onMount } from 'svelte';

	const breadTypes = ['loaf', 'bagel', 'croissant'];

	const createBreadIcon = () => {
		const icon = document.createElement('div');
		const type = breadTypes[Math.floor(Math.random() * breadTypes.length)];
		icon.className = `bread-icon ${type}`;
		icon.style.left = `${Math.random() * 90}vw`;
		icon.style.top = `${Math.random() * 90}vh`;
		icon.style.animation = `breadFloat ${8 + Math.random() * 4}s ease-in-out infinite ${-Math.random() * 10}s`;
		icon.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(${0.8 + Math.random() * 0.4})`;
		document.body.appendChild(icon);
		return icon;
	};

	onMount(() => {
		const icons = Array.from({ length: 20 }, createBreadIcon);
		return () => {
			icons.forEach((icon) => icon.remove());
		};
	});
</script>

<div class="container my-24 relative z-10">
	<div class="max-w-4xl mx-auto text-center">
		<div
			class="inline-block mb-6 px-6 py-2 rounded-full bg-primary/10 text-primary font-medium animate-pulse-slow"
		>
			🥖 Now Taking Online Orders
		</div>

		<h1
			class="scroll-m-20 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
		>
			Experience The Art Of <br class="hidden sm:block" />
			<span class="text-primary">Artisanal Bread</span>
		</h1>

		<p
			class="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
		>
			Discover Our Curated Selection Of Handcrafted Breads And Vegetarian Sandwiches, Made With
			Passion And Tradition.
		</p>

		<div
			class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
		>
			<Button
				size="lg"
				class="text-lg px-10 py-6 hover-lift w-full sm:w-auto rounded-full"
				href="/menu"
			>
				Browse Menu
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="text-lg px-10 py-6 hover-lift w-full sm:w-auto rounded-full"
				href="/create"
			>
				Create Custom Sandwich
			</Button>
		</div>
	</div>

	<div class="bg-card rounded-2xl mb-32 overflow-hidden shadow-2xl">
		<BreadCarousel />
	</div>

	<WhyBread />
</div>

<div class="relative">
	<div class="absolute inset-0 bg-linear-to-b from-transparent to-background"></div>
	<Offerings />
</div>
