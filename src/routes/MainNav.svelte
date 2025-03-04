<script lang="ts">
	import { page as pageStore } from '$app/state';
	import Logo from '$lib/Logo.svelte';
	import { cn } from '$lib/utils.js';
	import { pages } from './pages';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-10 flex items-center space-x-2">
		<Logo />
	</a>
	<nav class="flex items-center gap-6 text-sm">
		{#each pages as page}
			<a
				href={page.href}
				class={cn(
					'hover:text-primary-foreground/80 transition-colors font-medium',
					pageStore.url.pathname === page.href
						? 'text-primary-foreground'
						: 'text-primary-foreground/60',
				)}
			>
				{page.title}
			</a>
		{/each}
	</nav>
</div>
