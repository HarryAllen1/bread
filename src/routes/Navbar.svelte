<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import MainNav from './MainNav.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { cart } from '$lib/cart';
	import MobileNav from './MobileNav.svelte';
	import { theme } from '$lib/stores/theme';

	let cartSize = $derived($cart.reduce((accumulator, item) => accumulator + item.quantity, 0));

	const toggleTheme = () => {
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	};
</script>

<header
	class="border-border/40 bg-primary supports-backdrop-filter:bg-primary sticky top-0 z-50 w-full border-b text-primary-foreground"
>
	<div class="container flex h-16 max-w-(--breakpoint-2xl) items-center">
		<MainNav />
		<MobileNav />
		<div class="grow"></div>
		<div class="flex items-center justify-between space-x-2 md:justify-end">
			<button
				class={cn(
					buttonVariants({
						size: 'sm',
						variant: 'ghost',
					}),
					'size-10 p-0',
				)}
				onclick={toggleTheme}
			>
				{#if $theme === 'dark'}
					<Sun class="size-6" />
				{:else}
					<Moon class="size-6" />
				{/if}

				<span class="sr-only">Toggle theme</span>
			</button>
			<nav class="flex items-center">
				<a href="/cart" class="relative">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost',
							}),
							'size-10 p-0',
						)}
					>
						<ShoppingCart class="size-6 fill-current" />
						<span class="sr-only">Cart</span>
					</div>
					{#if cartSize > 0}
						<Badge
							variant="destructive"
							class="aspect-square size-4 absolute -bottom-1 -right-1 p-1"
						>
							{cartSize}
						</Badge>
					{/if}
				</a>
			</nav>
		</div>
	</div>
</header>
