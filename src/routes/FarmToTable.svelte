<script lang="ts">
	import { Leaf, MapPin, Truck } from 'lucide-svelte';
</script>

<div
	class="w-full relative overflow-hidden"
	style="background-image: url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop'); background-size: cover; background-position: center;"
>
	<!-- Semi-transparent overlay for better text readability -->
	<div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/70"></div>

	<div class="container max-w-6xl mx-auto px-4 relative z-10 py-16 md:py-20">
		<div class="grid md:grid-cols-2 gap-8 items-center">
			<div>
				<div class="bg-black/80 p-8 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl">
					<h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">Farm to Table Approach</h2>
					<p class="text-lg text-white/90 mb-8 font-medium">
						We cultivate direct relationships with local farmers to procure the freshest
						ingredients, supporting sustainable agriculture while ensuring superior quality.
					</p>

					<div class="space-y-6">
						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<Leaf class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Local Sourcing</h3>
								<p class="text-white/90">
									We source 85% of our produce from farms within a 50-mile radius, ensuring maximum
									freshness and minimizing environmental impact.
								</p>
							</div>
						</div>

						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<MapPin class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Seasonal Selection</h3>
								<p class="text-white/90">
									Our menu evolves with the seasons to showcase regional produce at its peak flavor
									and nutritional value.
								</p>
							</div>
						</div>

						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<Truck class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Direct Partnerships</h3>
								<p class="text-white/90">
									We work directly with farmers and producers, eliminating intermediaries to ensure
									fair compensation and superior quality control.
								</p>
							</div>
						</div>
					</div>

					<div class="mt-8">
						<a
							href="/about"
							class="inline-block bg-white text-primary font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
							>Learn more about our partners →</a
						>
					</div>
				</div>
			</div>

			<div class="hidden md:block">
				<div class="grid grid-cols-2 gap-4">
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-48 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2070&auto=format&fit=crop"
							alt="Local farm"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-64 mt-8 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?q=80&w=2070&auto=format&fit=crop"
							alt="Fresh produce"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-64 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1470072768013-bf9532016c10?q=80&w=2070&auto=format&fit=crop"
							alt="Organic vegetables"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-48 mt-8 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2070&auto=format&fit=crop"
							alt="Farmer's market"
							class="w-full h-full object-cover rounded"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
