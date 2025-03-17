<script lang="ts">
	import { browser } from '$app/environment';
	import { cart } from '$lib/cart';
	import { Badge } from '$lib/components/ui/badge';
	import { buttonVariants } from '$lib/components/ui/button';
	import { userPreferences } from '$lib/stores/userPreferences';
	import { cn } from '$lib/utils.js';
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';
	import MainNav from './MainNav.svelte';
	import MobileNav from './MobileNav.svelte';

	let cartSize = $derived($cart.reduce((accumulator, item) => accumulator + item.quantity, 0));

	// Check if user has favorites - only in browser environment
	let hasFavorites = $state(false);
	let favoritesCount = $state(0);

	// Only access the store in browser environment
	$effect(() => {
		if (browser) {
			const prefs = $userPreferences;
			hasFavorites = prefs.favorites.length > 0;
			favoritesCount = prefs.favorites.length || 0;
		}
	});
</script>

<header
	class="border-border/40 bg-primary supports-backdrop-filter:bg-primary/90 sticky top-0 z-50 w-full border-b text-primary-foreground backdrop-blur-sm"
>
	<div class="container flex h-18 max-w-(--breakpoint-2xl) items-center">
		<MainNav />
		<MobileNav />
		<div class="grow"></div>
		<div class="flex items-center justify-between space-x-4 md:justify-end">
			{#if hasFavorites}
				<a
					href="/favorites"
					class={cn(
						buttonVariants({
							size: 'sm',
							variant: 'ghost',
						}),
						'size-12 p-0 relative',
					)}
				>
					<svg class="size-7 fill-current" viewBox="0 0 24 24">
						<path
							d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
						/>
					</svg>
					<span class="sr-only">Favorites</span>
					<Badge
						variant="destructive"
						class="flex aspect-square size-5 absolute -bottom-1 -right-1 p-1 text-sm justify-center items-center"
					>
						{favoritesCount}
					</Badge>
				</a>
			{/if}

			<nav class="flex items-center">
				<a href="/cart" class="relative">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost',
							}),
							'size-12 p-0',
						)}
					>
						<ShoppingCart class="size-7 fill-current" />
						<span class="sr-only">Cart</span>
					</div>
					{#if cartSize > 0}
						<Badge
							variant="destructive"
							class="flex aspect-square size-5 absolute -bottom-1 -right-1 p-1 text-sm justify-center items-center"
						>
							{cartSize}
						</Badge>
					{/if}
				</a>
			</nav>
		</div>
	</div>
</header>
