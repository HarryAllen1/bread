<script lang="ts">
	import { Utensils, Clock, Sparkles } from 'lucide-svelte';
</script>

<div
	class="w-full relative overflow-hidden"
	style="background-image: url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2070&auto=format&fit=crop'); background-size: cover; background-position: center;"
>
	<!-- Semi-transparent overlay for better text readability -->
	<div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/70"></div>

	<div class="container max-w-6xl mx-auto px-4 relative z-10 py-16 md:py-20">
		<div class="grid md:grid-cols-2 gap-8 items-center">
			<div class="order-2 md:order-1">
				<div class="grid grid-cols-2 gap-4">
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-48 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
							alt="Chef preparing food"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-64 mt-8 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=2070&auto=format&fit=crop"
							alt="Food preparation"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-64 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2070&auto=format&fit=crop"
							alt="Chef cooking"
							class="w-full h-full object-cover rounded"
						/>
					</div>
					<div
						class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-transform h-48 mt-8 flex items-center justify-center"
					>
						<img
							src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2070&auto=format&fit=crop"
							alt="Food plating"
							class="w-full h-full object-cover rounded"
						/>
					</div>
				</div>
			</div>

			<div class="order-1 md:order-2">
				<div class="bg-black/80 p-8 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl">
					<h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">Culinary Craftsmanship</h2>
					<p class="text-lg text-white/90 mb-8 font-medium">
						Each sandwich is meticulously prepared using traditional techniques and innovative
						flavor combinations to create a memorable dining experience.
					</p>

					<div class="space-y-6">
						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary aspect-square size-12 p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<Utensils class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Artisanal Preparation</h3>
								<p class="text-white/90">
									Our professional culinary team works from dawn to dusk just to prepare fresh
									ingredients and bake artisanal sandwiches for optimal quality and flavor.
								</p>
							</div>
						</div>

						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary aspect-square size-12 p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<Clock class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Made to Order</h3>
								<p class="text-white/90">
									Each sandwich is assembled upon order, ensuring maximum freshness and allowing for
									precise customization to your preferences.
								</p>
							</div>
						</div>

						<div class="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
							<div
								class="flex-shrink-0 bg-primary aspect-square size-12 p-3 rounded-full shadow-lg group-hover:bg-primary/80 transition-colors"
							>
								<Sparkles class="text-white size-6" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2 text-white">Chef-Developed Recipes</h3>
								<p class="text-white/90">
									Our menu is developed by our culinary team with decades of combined experience in
									plant-based cuisine, meticulously balancing flavors, textures, and nutritional
									profiles.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
