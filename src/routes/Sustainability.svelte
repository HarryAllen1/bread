<script lang="ts">
	import { Recycle, Droplets, Leaf } from 'lucide-svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const counters = document.querySelectorAll<HTMLElement>('.counter-animation');
						for (const counter of counters) {
							const target = Number.parseInt(counter.dataset.value || '0');
							const isPercentage = counter.querySelector('p')?.textContent?.includes('%');
							let count = 0;
							const duration = 2000; // 2 seconds
							const increment = target / (duration / 16); // 60fps

							const updateCounter = (): void => {
								if (count < target) {
									count += increment;
									if (count > target) count = target;

									const counterElement = counter.querySelector('p');
									if (counterElement) {
										counterElement.textContent = isPercentage
											? `${Math.floor(count)}%`
											: Math.floor(count).toLocaleString();
									}

									if (count < target) {
										requestAnimationFrame(updateCounter);
									}
								}
							};

							updateCounter();
						}

						observer.disconnect();
					}
				}
			},
			{ threshold: 0.5 },
		);

		const section = document.querySelector('.counter-animation');
		if (section) {
			observer.observe(section);
		}
	});
</script>

<div
	class="w-full bg-gradient-to-br from-primary/10 to-primary/20 py-16 md:py-20 relative overflow-hidden"
>
	<!-- Animated background elements -->
	<div class="absolute top-0 left-0 w-full h-full opacity-5">
		<div class="absolute top-1/4 left-1/4 animate-float" style="animation-duration: 20s;">
			<Recycle class="size-32 text-primary" />
		</div>
		<div
			class="absolute bottom-1/4 right-1/4 animate-float"
			style="animation-duration: 25s; animation-delay: 2s;"
		>
			<Droplets class="size-32 text-primary" />
		</div>
		<div
			class="absolute top-3/4 left-2/3 animate-float"
			style="animation-duration: 22s; animation-delay: 1s;"
		>
			<Leaf class="size-32 text-primary" />
		</div>
	</div>

	<div class="container max-w-6xl mx-auto px-4 relative z-10">
		<div class="text-center mb-12 md:mb-16">
			<h2
				class="text-3xl md:text-4xl font-bold mb-4 relative inline-block bg-gradient-to-r from-primary/80 to-primary p-6 rounded-lg text-white"
			>
				Environmental Stewardship
			</h2>
			<p class="text-lg text-foreground max-w-2xl mx-auto mt-4 bg-accent rounded-2xl py-4">
				We're committed to minimizing our environmental footprint through sustainable practices at
				every level of our operation.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
			<div
				class="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:translate-y-[-10px] duration-300 animate-in fade-in-50 slide-in-from-bottom-8 duration-700"
			>
				<div class="bg-gradient-to-br from-primary/20 to-primary/40 p-4 rounded-full w-fit mb-6">
					<Recycle class="text-primary size-6" />
				</div>
				<h3 class="text-xl font-bold mb-3">Sustainable Packaging</h3>
				<p class="text-muted-foreground mb-4">
					All our packaging is crafted from compostable or recyclable materials. Our sandwich wraps
					are made from plant-based materials that biodegrade within 90 days.
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Compostable sandwich wraps</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Recyclable containers</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Plant-based utensils</span>
					</li>
				</ul>
			</div>

			<div
				class="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:translate-y-[-10px] duration-300 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-100"
			>
				<div class="bg-gradient-to-br from-primary/20 to-primary/40 p-4 rounded-full w-fit mb-6">
					<Droplets class="text-primary size-6" />
				</div>
				<h3 class="text-xl font-bold mb-3">Water Conservation</h3>
				<p class="text-muted-foreground mb-4">
					Our facilities utilize water-efficient fixtures and advanced systems to recapture and
					reuse water throughout our operations.
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Low-flow fixtures</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Water reclamation systems</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Drought-resistant landscaping</span>
					</li>
				</ul>
			</div>

			<div
				class="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:translate-y-[-10px] duration-300 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-200"
			>
				<div class="bg-gradient-to-br from-primary/20 to-primary/40 p-4 rounded-full w-fit mb-6">
					<Leaf class="text-primary size-6" />
				</div>
				<h3 class="text-xl font-bold mb-3">Waste Reduction</h3>
				<p class="text-muted-foreground mb-4">
					We implement precise inventory management and small-batch preparation to minimize waste.
					Surplus food is donated to community partners or composted.
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Community donation program</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>On-site composting</span>
					</li>
					<li class="flex items-center gap-2">
						<div class="size-2 rounded-full bg-primary"></div>
						<span>Advanced inventory management</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-16 text-center">
			<div
				class="inline-block bg-white rounded-lg shadow-xl p-8 max-w-3xl animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-300"
			>
				<h3 class="text-2xl font-bold mb-4">Our Environmental Impact</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="counter-animation" data-value="85">
						<p class="text-4xl font-bold text-primary mb-2">0%</p>
						<p class="text-sm text-muted-foreground">Reduction in landfill waste since 2023</p>
					</div>
					<div class="counter-animation" data-value="12000">
						<p class="text-4xl font-bold text-primary mb-2">0</p>
						<p class="text-sm text-muted-foreground">Pounds of food donated annually</p>
					</div>
					<div class="counter-animation" data-value="30">
						<p class="text-4xl font-bold text-primary mb-2">0%</p>
						<p class="text-sm text-muted-foreground">Less water used than industry average</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
