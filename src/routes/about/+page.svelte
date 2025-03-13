<script lang="ts">
	import AnimatedSandwichBackground from '$lib/components/AnimatedSandwichBackground.svelte';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		// Initialize animations
		gsap.from('.about-title', {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: 'power3.out',
		});

		// Animate sections on scroll
		const sections = document.querySelectorAll('.about-section');
		for (const [index, section] of sections.entries()) {
			gsap.from(section, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					toggleActions: 'play none none none',
				},
				delay: index * 0.1,
			});
		}

		// Animate team members with staggered effect
		gsap.from('.team-member', {
			opacity: 0,
			y: 30,
			stagger: 0.15,
			duration: 0.6,
			scrollTrigger: {
				trigger: '.team-grid',
				start: 'top 80%',
			},
		});

		// Animate values cards
		gsap.from('.value-card', {
			opacity: 0,
			scale: 0.9,
			stagger: 0.15,
			duration: 0.6,
			scrollTrigger: {
				trigger: '.values-grid',
				start: 'top 80%',
			},
		});
	});
</script>

<AnimatedSandwichBackground animated={true} count={20} opacity={0.3} speed={1.5} />

<div class="container my-8 px-4 max-w-5xl mx-auto">
	<h1 class="about-title text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
		About Greenwich
	</h1>

	<div
		class="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12 bg-white/80 rounded-xl p-6 shadow-md"
	>
		<div>
			<h2 class="text-2xl font-bold mb-3 text-primary">Our Heritage</h2>
			<p class="text-base mb-3">
				Established in 2025, Greenwich was conceived with a singular vision: to create exceptional
				vegetarian sandwiches that redefine plant-based dining.
			</p>
			<p class="text-base mb-3">
				Our founder, Sarah Chen, dedicated years to perfecting plant-forward recipes that deliver
				uncompromising flavor, texture, and satisfaction. What began as a modest food truck has
				evolved into a celebrated culinary destination.
			</p>
		</div>
		<div
			class="rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105"
		>
			<img
				src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2080&auto=format&fit=crop"
				alt="Our culinary team preparing artisanal sandwiches"
				class="w-full h-auto object-cover aspect-video"
			/>
		</div>
	</div>

	<div class="about-section bg-primary/5 p-6 rounded-xl mb-12 shadow-md opacity-100" >
		<h2 class="text-2xl font-bold mb-4 text-center text-primary">Our Core Values</h2>

		<div class="values-grid grid grid-cols-1 md:grid-cols-3 gap-4">
			<div
				class="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
			>
				<div class="flex justify-center mb-3">
					<SandwichIcon size="md" />
				</div>
				<h3 class="text-lg font-bold mb-2 text-center">Sustainable Sourcing</h3>
				<p class="text-sm text-center">
					We serve our customers only the best, the finest of ingredients, made fresh every day
					through partnering with local farms and businesses. We take pride in everything we do,
					from our commitment to quality and service to our dedication to a farm-to-table approach.
				</p>
			</div>
			<div
				class="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
			>
				<div class="flex justify-center mb-3">
					<SandwichIcon size="md" />
				</div>
				<h3 class="text-lg font-bold mb-2 text-center">Top Quality</h3>
				<p class="text-sm text-center">
					Our diverse array of breads are made daily to ensure their softness and flavor. Whether
					it's an Italian ciabatta or a Mexican Tortilla Wrap, we craft our breads to the utmost
					quality that perfectly compliments what you prefer. Our veggies are carefully washed and
					hand-cut to preserve their freshness and crush. Our plant-based protein are delicately
					prepared to deliver the same sastisfying textures and bold flavors as traditional meat,
					but as a more healthier and nutritious alternative. Our in-house sauces are crafted to
					enhance the nature flavors of our fresh ingredients. Once the ingredients are prepped, we
					assemble each sandwich with utmost precision, and toast it however you like. We make sure
					every sandwich is catored to your exact preference before we serve it to you. Your
					satisfaction is our top priority. For takeout, we wrap your sandwich with care in
					cellophane packaging, so that it stays fresh when you enjoy it at home as it is when it
					leaves the kitchen.
				</p>
			</div>
			<div
				class="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
			>
				<div class="flex justify-center mb-3">
					<SandwichIcon size="md" />
				</div>
				<h3 class="text-lg font-bold mb-2 text-center">Ending Hunger</h3>
				<p class="text-sm text-center">
					We donate any excess food in our kitchen to local nonprofits and organizations, like food
					banks, to help serve our yummy sandwiches to those lacking access to adequate, quality
					food. By working with our local communities and serving customers like you, we can help
					make an impact - together.
				</p>
			</div>
		</div>
	</div>

	<div class="about-section mb-12">
		<h2 class="text-2xl font-bold mb-4 text-center text-primary">Our Culinary Team</h2>

		<div class="team-grid grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="team-member text-center bg-white p-4 rounded-lg shadow-md">
				<div class="rounded-full overflow-hidden w-24 h-24 mx-auto mb-3 border-2 border-primary">
					<img
						src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
						alt="Sarah Chen"
						class="w-full h-full object-cover"
					/>
				</div>
				<h3 class="text-base font-bold">Sarah Chen</h3>
				<p class="text-xs text-gray-600">Founder & Executive Chef</p>
			</div>

			<div class="team-member text-center bg-white p-4 rounded-lg shadow-md">
				<div class="rounded-full overflow-hidden w-24 h-24 mx-auto mb-3 border-2 border-primary">
					<img
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
						alt="Michael Rodriguez"
						class="w-full h-full object-cover"
					/>
				</div>
				<h3 class="text-base font-bold">Michael Rodriguez</h3>
				<p class="text-xs text-gray-600">Chef de Cuisine</p>
			</div>

			<div class="team-member text-center bg-white p-4 rounded-lg shadow-md">
				<div class="rounded-full overflow-hidden w-24 h-24 mx-auto mb-3 border-2 border-primary">
					<img
						src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
						alt="Aisha Johnson"
						class="w-full h-full object-cover"
					/>
				</div>
				<h3 class="text-base font-bold">Aisha Johnson</h3>
				<p class="text-xs text-gray-600">Operations Director</p>
			</div>

			<div class="team-member text-center bg-white p-4 rounded-lg shadow-md">
				<div class="rounded-full overflow-hidden w-24 h-24 mx-auto mb-3 border-2 border-primary">
					<img
						src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
						alt="David Park"
						class="w-full h-full object-cover"
					/>
				</div>
				<h3 class="text-base font-bold">David Park</h3>
				<p class="text-xs text-gray-600">Culinary Innovation Lead</p>
			</div>
		</div>
	</div>
</div>
