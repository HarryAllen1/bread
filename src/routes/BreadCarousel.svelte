<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
</script>

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
