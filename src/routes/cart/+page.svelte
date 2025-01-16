<script lang="ts">
	import { addToCart, cart, removeFromCart } from '$lib/cart';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import Plus from 'lucide-svelte/icons/plus';
	import Minus from 'lucide-svelte/icons/minus';
	import Trash from 'lucide-svelte/icons/trash';
	import { toast } from 'svelte-sonner';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">cart</h1>

	{#each $cart as cartItem}
		{@const item = data.products.find((currentItem) => currentItem.id === cartItem.id)}
		{#if item}
			<div class="flex items-center justify-between my-4">
				<div class="flex items-center">
					<img src={item.image_url} alt={item.name} class="w-16 h-16 object-cover rounded-lg" />
					<div class="ml-4">
						<p class="text-lg font-semibold">{item.name}</p>
						<p class="text-sm text-gray-500">${item.price} each</p>
					</div>
				</div>

				<div class="flex items-center">
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
		{/if}
	{:else}
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Your cart is empty, but it doesn't have to be! Check out our <a
				href="/menu"
				class="text-primary font-medium underline underline-offset-4"
			>
				menu
			</a> to find something you like.
		</p>
	{/each}
	{#if $cart.length}
		<Button href="/checkout" class="mt-8">checkout</Button>
	{/if}
</div>
