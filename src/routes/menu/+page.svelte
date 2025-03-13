<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let searchQuery = $state('');
	let selectedCategory = $state('all');

	// Define product categories
	const categories = [
		{ id: 'all', name: 'All Products' },
		{ id: 'sandwich', name: 'Signature Sandwiches' },
		{ id: 'bread', name: 'Fresh Bread' },
	];

	let possibleProducts = $derived(
		data.products.filter(
			(prod) => selectedCategory === 'all' || prod.category === selectedCategory,
		),
	);
	let fuse = $derived(
		new Fuse(possibleProducts, {
			keys: ['name'],
		}),
	);

	// Filter products based on search, category, and dietary preferences
	let filteredProducts = $derived(
		searchQuery === '' ? possibleProducts : fuse.search(searchQuery).map((r) => r.item),
	);
</script>

<div class="container my-8 relative z-10 sandwich-pattern px-4">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Our Menu</h1>

		<div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
			<div class="relative flex-grow">
				<Input placeholder="Search sandwiches..." bind:value={searchQuery} />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>
		</div>
	</div>

	<div class="mb-8">
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<button
					class={[
						'px-4 py-2 rounded-full text-sm font-medium transition-colors',
						{
							'bg-primary text-white': selectedCategory === category.id,
							'bg-gray-100': selectedCategory !== category.id,
							'hover:bg-gray-200': selectedCategory !== category.id,
						},
					]}
					onclick={() => (selectedCategory = category.id)}
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<ProductCard
			byo
			product={{
				id: 9999,
				name: 'Build Your Own Sandwich',
				allergens: '',
				category: 'custom',
				description: 'Create your own sandwich with your favorite ingredients',
				image_url:
					'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
				price: 0,
				created_at: '',
				slug: 'create',
				price_id: '',
				image_bucket_id: '',
				image_name: '',
			}}
		/>

		{#each filteredProducts as product (product.id)}
			<ProductCard {product} />
		{:else}
			<div class="col-span-full text-center py-12">
				<div class="flex justify-center mb-4">
					<SandwichIcon size="lg" />
				</div>
				<h3 class="text-xl font-semibold mb-2">No sandwiches found</h3>
				<p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
				<Button
					onclick={() => {
						searchQuery = '';
						selectedCategory = 'all';
					}}
				>
					Reset Filters
				</Button>
			</div>
		{/each}
	</div>
</div>
