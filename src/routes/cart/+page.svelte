<script lang="ts">
	import { addToCart, cart, removeFromCart } from '$lib/cart';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Minus from '@lucide/svelte/icons/minus';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash from '@lucide/svelte/icons/trash';
	import { toast } from 'svelte-sonner';
	import ProductCard from '../menu/ProductCard.svelte';
	import type { PageData } from './$types';
	import Metadata from '$lib/Metadata.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const itemsNotInCart = data.products.filter(
		(product) => !$cart.some((cartItem) => cartItem.id === product.id),
	);
</script>

<Metadata title="Cart - Greenwich" />

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Cart</h1>

	{#each $cart as cartItem}
		{#if 'isSandwich' in cartItem}
			<div class="flex md:items-center justify-center flex-row my-4">
				<div class="flex md:items-center min-w-16">
					<a href="/create" aria-label="Custom sandwich">
						<enhanced:img
							src="$lib/images/custom-sandwich.jpeg"
							alt="Custom sandwich"
							class="size-16 aspect-square object-cover rounded-lg"
						/>
					</a>
				</div>
				<div class="flex flex-col md:flex-row md:items-center w-full ml-4 gap-2">
					<div class="w-full">
						<a class="text-lg font-semibold" href="/create">
							{cartItem.description}
						</a>
						<p class="text-sm text-gray-500">${cartItem.price} each</p>
					</div>

					<div class="grow"></div>

					<div class="flex items-center justify-start md:justify-end w-full">
						<Button size="icon" variant="outline" onclick={() => removeFromCart(cartItem.id)}>
							<Minus />
						</Button>
						<p class="mx-4">{cartItem.quantity}</p>
						<Button size="icon" variant="outline" onclick={() => addToCart(cartItem.id)}>
							<Plus />
						</Button>

						<Button
							onclick={() => {
								$cart = $cart.filter((value) => value.id !== cartItem.id);
								toast.success('Removed from cart!');
							}}
							variant="outline"
							size="icon"
							class="text-red-500 ml-4"
						>
							<Trash />
						</Button>

						<p class="ml-4 text-lg font-semibold">${cartItem.price * cartItem.quantity}</p>
					</div>
				</div>
			</div>
		{:else}
			{@const item = data.products.find((currentItem) => currentItem.id === cartItem.id)}
			{#if item}
				<div class="flex md:items-center justify-center flex-row my-4">
					<div class="flex md:items-center min-w-16">
						<a href="/menu/{item.slug}">
							<img
								src={item.image_url}
								alt={item.name}
								class="size-16 aspect-square object-cover rounded-lg"
							/>
						</a>
					</div>
					<div class="flex flex-col md:flex-row md:items-center w-full ml-4 gap-2">
						<div class="w-full">
							<a class="text-lg font-semibold" href="/menu/{item.slug}">
								{item.name}
							</a>
							<p class="text-sm text-gray-500">${item.price} each</p>
						</div>

						<div class="grow"></div>

						<div class="flex items-center justify-start md:justify-end w-full">
							<Button size="icon" variant="outline" onclick={() => removeFromCart(item.id)}>
								<Minus />
							</Button>
							<p class="mx-4">{cartItem.quantity}</p>
							<Button size="icon" variant="outline" onclick={() => addToCart(item.id)}>
								<Plus />
							</Button>

							<Button
								onclick={() => {
									$cart = $cart.filter((value) => value.id !== item.id);
									toast.success('Removed from cart!');
								}}
								variant="outline"
								size="icon"
								class="text-red-500 ml-4"
							>
								<Trash />
							</Button>

							<p class="ml-4 text-lg font-semibold">${item.price * cartItem.quantity}</p>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	{:else}
		<p class="leading-7 not-first:mt-6">
			Your cart is empty, but it doesn't have to be! Check out our <a
				href="/menu"
				class="text-primary font-medium underline underline-offset-4"
			>
				menu
			</a> to find something you like.
		</p>
	{/each}
	{#if $cart.length}
		{#if itemsNotInCart.length}
			<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
				Want to add anything else?
			</h3>

			<ScrollArea orientation="horizontal" class="mt-4">
				<div class="flex flex-row gap-4">
					{#each itemsNotInCart as item}
						<ProductCard product={item} cartMode class="w-64 mb-8" />
					{/each}
				</div>
			</ScrollArea>
		{/if}

		<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Subtotal</h3>
		<p class="leading-7 not-first:mt-4">
			${$cart.reduce((accumulator, cartItem) => {
				if ('isSandwich' in cartItem) {
					return accumulator + cartItem.price * cartItem.quantity;
				}
				const item = data.products.find((currentItem) => currentItem.id === cartItem.id);
				if (item) {
					return accumulator + item.price * cartItem.quantity;
				}
				return accumulator;
			}, 0)}
		</p>

		<Button href="/checkout" class="mt-8">Checkout</Button>
	{/if}
</div>
