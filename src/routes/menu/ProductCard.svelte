<script lang="ts">
	import { addToCart } from '$lib/cart';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Croissant } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	interface Props {
		product: PageData['products'][number];
		cartMode?: boolean;
	}

	let { product, cartMode = false }: Props = $props();
</script>

<Card.Root class="card-3d {cartMode ? '' : 'hover:shadow-2xl hover:shadow-primary/20'}">
	<Card.Header>
		<a href="/menu/{product.slug}">
			<Card.Title>{product.name}</Card.Title>
		</a>
		<Card.Description>
			${product.price}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<a href="/menu/{product.slug}" class="block relative overflow-hidden rounded-lg">
			<img
				src={product.image_url}
				alt={product.name}
				class={[
					cartMode ? 'max-w-(--breakpoint-sm) w-56 h-auto' : 'w-full',
					'transform transition-transform hover:scale-105',
				]}
			/>
			<div
				class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100"
			></div>
			<Croissant
				class="absolute bottom-4 right-4 size-8 text-white opacity-0 transition-opacity hover:opacity-100 animate-float"
			/>
		</a>
	</Card.Content>
	<Card.Footer class="gap-4">
		<Button
			onclick={() => {
				addToCart(product.id);
				toast.success('Added to cart!', {
					action: {
						label: 'View Cart',
						onClick: () => {
							goto('/cart');
						},
					},
				});
			}}
			class="hover-lift"
		>
			add to cart
		</Button>
		{#if !cartMode}
			<Button variant="outline" href="/menu/{product.slug}" class="hover-lift">view details</Button>
		{/if}
	</Card.Footer>
</Card.Root>
