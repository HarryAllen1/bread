<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Croissant } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="container my-8 relative z-10 bread-pattern">
	<h1 class="scroll-m-20 mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">Menu</h1>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<a href="/create">
					<Card.Title>Create A Sandwich</Card.Title>
				</a>
				<Card.Description>Variable Price</Card.Description>
			</Card.Header>
			<Card.Content>
				<a href="/create" class="block relative overflow-hidden rounded-lg">
					<enhanced:img
						src="./sandwich.jpg"
						alt="A Sandwich"
						class="transform transition-transform hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
					<Croissant class="absolute bottom-4 right-4 size-8 text-white animate-float" />
				</a>
			</Card.Content>
			<Card.Footer class="gap-4">
				<Button href="/create" class="hover-lift">Start Creating</Button>
			</Card.Footer>
		</Card.Root>

		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</div>
