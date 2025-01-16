<script lang="ts">
	import type { PageData } from './$types';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>menu - bread</title>
</svelte:head>

<div class="container my-8">
	<h1 class="scroll-m-20 mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">menu</h1>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.products as product}
			<ProductCard {product} />
		{:else}
			<p>No products found!</p>
		{/each}
	</div>
</div>
