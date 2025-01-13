<script lang="ts">
	import { addToCart } from '$lib/cart';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	interface Props {
		product: PageData['products'][number];
	}

	let { product }: Props = $props();
</script>

<Card.Root>
	<Card.Header>
		<a href="/menu/{product.slug}">
			<Card.Title>{product.name}</Card.Title>
		</a>
	</Card.Header>
	<Card.Content>
		<a href="/menu/{product.slug}">
			<img src={product.image_url} alt={product.name} />
		</a>
	</Card.Content>
	<Card.Footer class="gap-4">
		<Button
			onclick={() => {
				addToCart(product.id);
			}}
		>
			add to cart
		</Button>
		<Button variant="outline">view details</Button>
	</Card.Footer>
</Card.Root>
