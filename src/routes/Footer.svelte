<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import { pages } from './pages';
</script>

<div class="w-full bg-primary py-12 z-5">
	<div class="container text-primary-foreground flex flex-col gap-8 px-4">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<div class="flex flex-col items-center md:items-start gap-4">
				<a href="/" class="w-fit"><Logo textClass="text-xl" /></a>
				<p class="text-sm opacity-80 max-w-xs text-center md:text-left">
					Greenwich specializes in crafting exceptional vegetarian sandwiches using premium,
					locally-sourced ingredients for a refined culinary experience.
				</p>
			</div>

			<div class="flex flex-col items-center md:items-start gap-2">
				<h3 class="font-bold text-lg mb-2">Menu</h3>
				<a href="/menu/signature" class="text-sm opacity-80 hover:opacity-100"
					>Signature Sandwiches</a
				>
				<a href="/menu/seasonal" class="text-sm opacity-80 hover:opacity-100"
					>Seasonal Specialties</a
				>
				<a href="/menu/sides" class="text-sm opacity-80 hover:opacity-100">Accompaniments</a>
				<a href="/menu/drinks" class="text-sm opacity-80 hover:opacity-100">Beverages</a>
			</div>

			<div class="flex flex-col items-center md:items-start gap-2">
				<h3 class="font-bold text-lg mb-2">Company</h3>
				{#each pages as page}
					<a href={page.href} class="text-sm opacity-80 hover:opacity-100">
						{page.title}
					</a>
				{/each}
			</div>

			<div class="flex flex-col items-center md:items-start gap-2">
				<h3 class="font-bold text-lg mb-2">Contact</h3>
				<a href="tel:+15551234567" class="text-sm opacity-80 hover:opacity-100">555-123-4567</a>
				<a href="mailto:contact@greenwich.jhstsa.org" class="text-sm opacity-80 hover:opacity-100"
					>contact@greenwich.jhstsa.org</a
				>
				<a
					href="https://maps.app.goo.gl/azSbbyC12TmuJwfF8"
					class="text-sm opacity-80 hover:opacity-100"
					target="_blank"
				>
					1600 Pennsylvania Avenue NW, Washington, DC 20500
				</a>
			</div>
		</div>

		<div class="border-t border-primary-foreground/20 pt-6 mt-4 text-center md:text-left">
			<p class="text-sm opacity-70">
				© {new Date().getFullYear()} Greenwich. All rights reserved.
			</p>
		</div>
	</div>
</div>
