<script lang="ts">
	import BackgroundSandwiches from '$lib/components/BackgroundSandwiches.svelte';
	import { Button } from '$lib/components/ui/button';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import { userPreferences } from '$lib/stores/userPreferences';
	import { toast } from 'svelte-sonner';
	import ProductCard from '../menu/ProductCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Get user favorites - safely with browser check
	let favorites = $userPreferences.favorites;

	// Filter products to show only favorites
	let favoriteProducts = $derived(
		data.products.filter((product) => favorites.includes(product.id)),
	);

	// Clear all favorites
	const clearFavorites = (): void => {
		userPreferences.update((prefs) => ({
			...prefs,
			favorites: [],
		}));
		favorites = [];
		toast.success('All favorites cleared');
	};
</script>

<BackgroundSandwiches animated={false} count={30} opacity={0.08} pattern={true} />

<div class="container my-8 px-4">
	<div class="flex justify-between items-center mb-8">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Your Favorites</h1>

		{#if favoriteProducts.length > 0}
			<Button variant="outline" onclick={clearFavorites}>Clear All</Button>
		{/if}
	</div>

	{#if favoriteProducts.length > 0}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each favoriteProducts as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-16">
			<div class="flex justify-center mb-4">
				<SandwichIcon size="lg" />
			</div>
			<h2 class="text-2xl font-bold mb-2">No favorites yet</h2>
			<p class="text-gray-600 mb-6">
				You haven't added any products to your favorites yet. Browse our menu and click the heart
				icon to add items to your favorites.
			</p>
			<Button href="/menu">Browse Menu</Button>
		</div>
	{/if}
</div>
