<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
</script>

<Carousel.Root
	opts={{
		loop: true,
	}}
	plugins={[Autoplay({ delay: 5000 })]}
>
	<Carousel.Content>
		<Carousel.Item>
			<div class="relative">
				<enhanced:img
					src="./carousel/delight.jpg"
					alt="Mediterranean Delight sandwich"
					class="w-full h-[400px] object-cover"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
					<div class="p-6 text-white">
						<h3 class="text-2xl font-bold mb-2">Mediterranean Delight</h3>
						<p class="text-sm md:text-base">
							Featuring house-made hummus, roasted vegetables, and artisanal feta on freshly baked
							ciabatta
						</p>
					</div>
				</div>
			</div>
		</Carousel.Item>
		<Carousel.Item>
			<div class="relative">
				<img
					src="https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt="Premium veggie wrap"
					class="w-full h-[400px] object-cover"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
					<div class="p-6 text-white">
						<h3 class="text-2xl font-bold mb-2">Garden Harvest Wrap</h3>
						<p class="text-sm md:text-base">
							Seasonal vegetables, quinoa, and herb-infused dressing in an organic spinach tortilla
						</p>
					</div>
				</div>
			</div>
		</Carousel.Item>
		<Carousel.Item>
			<div class="relative">
				<img
					src="https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=2074&auto=format&fit=crop"
					alt="Gourmet avocado toast"
					class="w-full h-[400px] object-cover"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
					<div class="p-6 text-white">
						<h3 class="text-2xl font-bold mb-2">Artisanal Avocado Toast</h3>
						<p class="text-sm md:text-base">
							Hand-mashed avocado, heirloom tomatoes, and microgreens on our signature sourdough
						</p>
					</div>
				</div>
			</div>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
