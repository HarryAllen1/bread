<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { InstagramLogo } from 'phosphor-svelte';
	import MainNav from './MainNav.svelte';
</script>

<header
	class="border-border/40 bg-primary supports-[backdrop-filter]:bg-primary sticky top-0 z-50 w-full border-b text-primary-foreground"
>
	<div class="container flex h-16 max-w-screen-2xl items-center">
		<MainNav />
		<!-- <MobileNav /> -->
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center">
				<a href="https://www.instagram.com/nationaltsa/" target="_blank" rel="noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost',
							}),
							'size-8 px-0',
						)}
					>
						<InstagramLogo class="size-3 fill-current" />
						<span class="sr-only">Instagram</span>
					</div>
				</a>
			</nav>
		</div>
	</div>
</header>
