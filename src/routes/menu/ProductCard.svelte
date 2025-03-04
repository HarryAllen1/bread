<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { addToCart } from '$lib/cart';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import { userPreferences } from '$lib/stores/userPreferences';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	interface Props {
		product: PageData['products'][number];
		cartMode?: boolean;
	}

	let { product, cartMode = false }: Props = $props();

	// Determine sandwich type icon
	let sandwichType: 'classic' | 'wrap' | 'veggie' | 'avocado' | 'club' | 'sub' = $state('classic');
	if (product.name.toLowerCase().includes('wrap')) {
		sandwichType = 'wrap';
	} else if (product.name.toLowerCase().includes('veggie')) {
		sandwichType = 'veggie';
	} else if (product.name.toLowerCase().includes('avocado')) {
		sandwichType = 'avocado';
	} else if (product.name.toLowerCase().includes('club')) {
		sandwichType = 'club';
	} else if (product.name.toLowerCase().includes('sub')) {
		sandwichType = 'sub';
	}

	// Check if this is a favorite - safely with browser check
	let isFavorite = $state(false);
	let dietaryWarning = $state(false);

	$effect(() => {
		if (browser) {
			isFavorite = $userPreferences.favorites.includes(product.id) || false;

			// Check if product matches dietary preferences
			const allergenList = product.allergens
				? product.allergens.split(',').map((a) => a.trim())
				: [];

			dietaryWarning =
				($userPreferences.dietaryRestrictions.glutenFree &&
					(allergenList.includes('Wheat') || allergenList.includes('Gluten'))) ||
				($userPreferences.dietaryRestrictions.dairyFree && allergenList.includes('Dairy')) ||
				($userPreferences.dietaryRestrictions.nutFree &&
					(allergenList.includes('Nuts') || allergenList.includes('Peanuts'))) ||
				($userPreferences.dietaryRestrictions.vegan &&
					(allergenList.includes('Dairy') || allergenList.includes('Eggs')));
		}
	});

	const toggleFavorite = (event: MouseEvent): void => {
		event.preventDefault();
		event.stopPropagation();

		if (isFavorite) {
			userPreferences.update((prefs) => {
				return {
					...prefs,
					favorites: prefs.favorites.filter((id) => id !== product.id),
				};
			});
			toast.success('Removed from favorites');
		} else {
			userPreferences.update((prefs) => {
				return {
					...prefs,
					favorites: [...prefs.favorites, product.id],
				};
			});
			toast.success('Added to favorites');
		}
	};
</script>

<Card.Root
	class="card-3d hover:shadow-2xl hover:shadow-primary/20 relative transition-all duration-500 opacity-0 translate-y-8 card-loaded"
>
	{#if isFavorite}
		<div class="absolute top-2 right-2 z-10">
			<button
				class="flex items-center justify-center size-10 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
				onclick={toggleFavorite}
				aria-label="Remove from favorites"
			>
				<svg class="size-6 text-red-500 fill-current" viewBox="0 0 24 24">
					<path
						d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
					/>
				</svg>
			</button>
		</div>
	{/if}

	{#if dietaryWarning}
		<div class="absolute top-2 left-2 z-10">
			<div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium shadow-md">
				Dietary Warning
			</div>
		</div>
	{/if}

	<Card.Header>
		<a href="/menu/{product.slug}" class="flex items-center gap-2">
			<SandwichIcon type={sandwichType} size="sm" animated={true} />
			<Card.Title class="text-xl">{product.name}</Card.Title>
		</a>
		<Card.Description class="flex justify-between items-center text-lg">
			<span class="font-bold text-primary">${product.price}</span>

			{#if !isFavorite}
				<button
					class="text-gray-400 hover:text-red-500 transition-colors"
					onclick={toggleFavorite}
					aria-label="Add to favorites"
				>
					<svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
				</button>
			{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<a href="/menu/{product.slug}" class="block relative overflow-hidden rounded-lg">
			<img
				src={product.image_url}
				alt={product.name}
				class={cartMode
					? 'max-w-xs w-full h-auto aspect-square object-cover'
					: 'w-full h-64 object-cover'}
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100"
			></div>
			<div
				class="absolute bottom-4 right-4 size-10 text-white opacity-0 transition-opacity hover:opacity-100 animate-float"
			>
				<SandwichIcon type={sandwichType} size="md" animated />
			</div>
		</a>

		{#if product.description}
			<p class="mt-3 text-base text-gray-600 line-clamp-2">{product.description}</p>
		{/if}
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
			class="hover-lift text-base py-5 w-full"
		>
			add to cart
		</Button>
		{#if !cartMode}
			<Button variant="outline" href="/menu/{product.slug}" class="hover-lift text-base py-5 w-full"
				>view details</Button
			>
		{/if}
	</Card.Footer>
</Card.Root>

<style>
	:global(.card-loaded) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
