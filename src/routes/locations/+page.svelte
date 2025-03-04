<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { MapPin, Clock, Phone } from 'lucide-svelte';
	import AnimatedSandwichBackground from '$lib/components/AnimatedSandwichBackground.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		// Initialize animations
		gsap.from('.locations-title', {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: 'power3.out',
		});

		// Animate location cards with staggered effect
		gsap.from('.location-card', {
			opacity: 0,
			y: 30,
			stagger: 0.2,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.locations-grid',
				start: 'top 80%',
			},
		});

		// Animate map section
		gsap.from('.map-section', {
			opacity: 0,
			y: 50,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.map-section',
				start: 'top 80%',
			},
		});

		// Animate catering section
		gsap.from('.catering-section', {
			opacity: 0,
			y: 50,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.catering-section',
				start: 'top 80%',
			},
		});
	});
</script>

<AnimatedSandwichBackground animated={true} count={20} opacity={0.3} speed={1.5} />

<div class="container my-8 px-4 max-w-5xl mx-auto">
	<h1 class="locations-title text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
		Our Locations
	</h1>

	<div class="mb-8">
		<p class="text-lg max-w-3xl mx-auto text-center">
			Visit one of our establishments to experience our artisanal vegetarian sandwiches. Each Greens
			location maintains our exacting standards for ingredient quality and culinary execution.
		</p>
	</div>

	<div class="locations-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
		<Card.Root
			class="location-card transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
		>
			<Card.Header>
				<Card.Title>Downtown Flagship</Card.Title>
				<Card.Description>Our signature location</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="mb-4 rounded-lg overflow-hidden h-40">
					<img
						src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
						alt="Downtown location"
						class="w-full h-full object-cover"
					/>
				</div>

				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<MapPin class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">1600 Pennsylvania Avenue NW</p>
							<p>Washington, DC 20500</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<Clock class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">Hours of Operation</p>
							<p>Monday - Friday: 7:00 AM - 8:00 PM</p>
							<p>Saturday - Sunday: 8:00 AM - 7:00 PM</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<Phone class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">Contact</p>
							<p>(202) 555-1234</p>
						</div>
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button
					variant="outline"
					class="w-full"
					onclick={() => window.open('https://maps.app.goo.gl/azSbbyC12TmuJwfF8', '_blank')}
				>
					Get Directions
				</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root
			class="location-card transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
		>
			<Card.Header>
				<Card.Title>Midtown Establishment</Card.Title>
				<Card.Description>Our newest location</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="mb-4 rounded-lg overflow-hidden h-40">
					<img
						src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=2066&auto=format&fit=crop"
						alt="Midtown location"
						class="w-full h-full object-cover"
					/>
				</div>

				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<MapPin class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">350 Fifth Avenue</p>
							<p>New York, NY 10118</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<Clock class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">Hours of Operation</p>
							<p>Monday - Friday: 7:00 AM - 9:00 PM</p>
							<p>Saturday - Sunday: 8:00 AM - 8:00 PM</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<Phone class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">Contact</p>
							<p>(212) 555-5678</p>
						</div>
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button
					variant="outline"
					class="w-full"
					onclick={() => window.open('https://maps.app.goo.gl/azSbbyC12TmuJwfF8', '_blank')}
				>
					Get Directions
				</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root
			class="location-card transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
		>
			<Card.Header>
				<Card.Title>West Coast Expansion</Card.Title>
				<Card.Description>Opening Fall 2025</Card.Description>
			</Card.Header>
			<Card.Content>
				<div
					class="mb-4 rounded-lg overflow-hidden h-40 bg-gray-100 flex items-center justify-center"
				>
					<div class="text-center p-4">
						<p class="text-2xl font-bold text-primary mb-2">Coming Soon</p>
						<p class="text-gray-600">Join our mailing list for updates</p>
					</div>
				</div>

				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<MapPin class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">1200 Ocean Avenue</p>
							<p>Santa Monica, CA 90401</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<Clock class="size-5 text-primary flex-shrink-0 mt-0.5" />
						<div>
							<p class="font-medium">Projected Hours</p>
							<p>Monday - Sunday: 7:00 AM - 9:00 PM</p>
						</div>
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full">Join Waitlist</Button>
			</Card.Footer>
		</Card.Root>
	</div>

	<div class="map-section bg-white p-6 rounded-xl shadow-lg mb-12">
		<h2 class="text-2xl font-bold mb-4 text-center text-primary">National Presence</h2>

		<div class="rounded-lg overflow-hidden shadow-lg">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.746318586604!2d-122.01209337021786!3d37.33919716775522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2sApple%20Park!5e0!3m2!1sen!2sus!4v1654789542873!5m2!1sen!2sus"
				width="100%"
				height="500"
				style="border:0;"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				title="Greens locations map"
			></iframe>
		</div>

		<div class="mt-4 text-center text-sm text-gray-500">
			<p>Interactive map showing all Greens locations. Click on markers for details.</p>
		</div>
	</div>

	<div class="catering-section text-center mb-12 bg-primary/5 p-8 rounded-xl shadow-lg">
		<h2 class="text-2xl font-bold mb-3 text-primary">Catering & Events</h2>
		<p class="text-lg max-w-2xl mx-auto mb-6">
			Elevate your next gathering with our premium vegetarian catering services. We offer customized
			menus for corporate functions, private celebrations, and special occasions.
		</p>
		<Button href="/catering" size="lg" class="shadow-md hover:shadow-xl transition-all duration-300"
			>Explore Catering Services</Button
		>
	</div>
</div>
