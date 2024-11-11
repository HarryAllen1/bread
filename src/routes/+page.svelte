<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
</script>

<div class="container my-8">
	<h1 class="w-full text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		bread
	</h1>
	<p class="leading-7 [&:not(:first-child)]:mt-6 text-center mb-6">
		the world's premier vegetarian bread restaurant
	</p>
	<Carousel.Root
		opts={{
			loop: true,
		}}
		plugins={[Autoplay()]}
	>
		<Carousel.Content>
			<Carousel.Item>
				<enhanced:img src="./carousel/challah.jpg" alt="Challah bread" />
			</Carousel.Item>
			<Carousel.Item>
				<enhanced:img src="./carousel/banana-bread.jpg" alt="Banana bread" />
			</Carousel.Item>
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
