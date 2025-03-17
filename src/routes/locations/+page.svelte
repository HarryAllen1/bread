<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { MapPin, Clock, Phone } from 'lucide-svelte';
	import AnimatedSandwichBackground from '$lib/components/AnimatedSandwichBackground.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Metadata from '$lib/Metadata.svelte';
	import { googleCore, googleMaps, googleMarker } from '$lib/google-maps';
	import { MarkerClusterer } from '@googlemaps/markerclusterer';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	let map = $state<HTMLDivElement | undefined>();

	onMount(() => {
		const locations: google.maps.LatLng[] = [
			new googleCore.LatLng(41.026_673_661_938_15, -73.631_056_275_123_16),
			new googleCore.LatLng(51.489_982_373_334_27, 0.016_107_124_373_262_994),
			new googleCore.LatLng(47.313_134_459_109_12, -122.178_652_383_806_41),
		];
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const googleMap = new googleMaps.Map(map!, {
			mapId: 'b92cb68e2da8aab1',
			center: {
				lat: 0,
				lng: 0,
			},
			zoom: 8,
		});

		const bounds = new googleCore.LatLngBounds();
		for (const location of locations) {
			bounds.extend(location);
		}
		googleMap.fitBounds(bounds);

		const markers = [
			{
				headerContent: 'Downtown',
				marker: new googleMarker.AdvancedMarkerElement({
					map: googleMap,
					position: locations[0],
				}),
				infoWindow: new googleMaps.InfoWindow({
					position: locations[0],
					content: `<a class="underline" href="https://maps.app.goo.gl/FYMAQcMd22QKWNL88" target="_blank">Get directions</a>`,
				}),
			},
			{
				headerContent: 'Midtown',
				marker: new googleMarker.AdvancedMarkerElement({
					map: googleMap,
					position: locations[1],
				}),
				infoWindow: new googleMaps.InfoWindow({
					position: locations[1],
					content: `<a class="underline" href="https://maps.app.goo.gl/9cT7X6msdw9jGVzL8" target="_blank">Get directions</a>`,
				}),
			},
			{
				headerContent: 'West Coast Expansion',
				marker: new googleMarker.AdvancedMarkerElement({
					map: googleMap,
					position: locations[2],
				}),
				infoWindow: new googleMaps.InfoWindow({
					position: locations[2],
					content: `<a class="underline" href="https://maps.app.goo.gl/DYK5Z4Qe4kLRtemo8" target="_blank">Get directions</a>`,
				}),
			},
		];

		new MarkerClusterer({
			map: googleMap,
			markers: markers.map((marker) => marker.marker),
		});

		for (const marker of markers) {
			marker.marker.addListener('click', () => {
				for (const mark of markers) {
					if (mark.infoWindow.isOpen) {
						mark.infoWindow.close();
					}
				}

				const headerElement = document.createElement('h2');

				headerElement.classList.add('font-medium', 'text-lg');
				headerElement.textContent = marker.headerContent;

				marker.infoWindow.setHeaderContent(headerElement);
				marker.infoWindow.open({
					map: googleMap,
				});
			});
		}

		// Initialize animations
		gsap.from('.locations-title', {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: 'power3.out',
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
	});
</script>

<Metadata title="Locations - Greenwich" />

<AnimatedSandwichBackground animated={true} count={20} opacity={0.3} speed={1.5} />

<div class="container my-8 px-4 max-w-5xl mx-auto">
	<h1 class="locations-title text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
		Our Locations
	</h1>

	<div class="mb-8">
		<p class="text-lg max-w-3xl mx-auto text-center">
			Visit one of our establishments to experience our artisanal vegetarian sandwiches. Each
			Greenwich location maintains our exacting standards for ingredient quality and culinary
			execution.
		</p>
	</div>

	<div class="locations-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
		<Card.Root
			class="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
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
						<a
							class="text-primary underline underline-offset-4"
							href="https://maps.app.goo.gl/FYMAQcMd22QKWNL88"
							target="_blank"
						>
							<b class="font-medium">160 West Putnam Avenue,</b>
							<br />
							Greenwich, CT 06830
						</a>
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
					href="https://maps.app.goo.gl/FYMAQcMd22QKWNL88"
					target="_blank"
				>
					Get Directions
				</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root
			class="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
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
						<a
							class="text-primary underline underline-offset-4"
							target="_blank"
							href="https://maps.app.goo.gl/9cT7X6msdw9jGVzL8"
						>
							<b class="font-medium">55-57 Bugsby's Way,</b>
							<br />
							London SE10 0QJ, United Kingdom
						</a>
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
					href="https://maps.app.goo.gl/9cT7X6msdw9jGVzL8"
					target="_blank"
				>
					Get Directions
				</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root
			class="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
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
						<a
							class="text-primary underline underline-offset-4"
							href="https://maps.app.goo.gl/DYK5Z4Qe4kLRtemo8"
							target="_blank"
						>
							<b class="font-medium">12401 SE 320th St,</b>
							<br />
							Auburn, WA 98092
						</a>
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
		</Card.Root>
	</div>

	<div class="map-section bg-white p-6 rounded-xl shadow-lg mb-12">
		<h2 class="text-2xl font-bold mb-4 text-center text-primary">National Presence</h2>

		<div class="rounded-lg overflow-hidden shadow-lg h-96" bind:this={map}></div>

		<div class="mt-4 text-center text-sm text-gray-500">
			<p>Interactive map showing all Greenwich locations. Click on markers for details.</p>
		</div>
	</div>
</div>
