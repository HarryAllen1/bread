<script lang="ts">
	import BackgroundSandwiches from '$lib/components/BackgroundSandwiches.svelte';
	import { Button } from '$lib/components/ui/button';
	import UserPreferences from '$lib/components/UserPreferences.svelte';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import { userPreferences } from '$lib/stores/userPreferences';
	import type { PageData } from './$types';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let showDietaryFilters = $state(false);

	// Define product categories
	const categories = [
		{ id: 'all', name: 'All Sandwiches' },
		{ id: 'signature', name: 'Signature Sandwiches' },
		{ id: 'wraps', name: 'Wraps & Rolls' },
		{ id: 'avocado', name: 'Avocado Specials' },
		{ id: 'seasonal', name: 'Seasonal Offerings' },
		{ id: 'sides', name: 'Sides & Extras' },
	];

	// Filter products based on search, category, and dietary preferences
	let filteredProducts = $derived(
		data.products.filter((product) => {
			// Filter by search query
			if (
				searchQuery &&
				!product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!product.description?.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}

			// Filter by category
			if (
				selectedCategory !== 'all'
				// TODO: add product category
				//  &&
				// !product.cate(selectedCategory)
			) {
				return false;
			}

			// Filter by dietary preferences
			if (showDietaryFilters) {
				const allergens = product.allergens
					? product.allergens.split(',').map((a) => a.trim())
					: [];

				if (
					$userPreferences.dietaryRestrictions.glutenFree &&
					(allergens.includes('Wheat') || allergens.includes('Gluten'))
				) {
					return false;
				}

				if ($userPreferences.dietaryRestrictions.dairyFree && allergens.includes('Dairy')) {
					return false;
				}

				if (
					$userPreferences.dietaryRestrictions.nutFree &&
					(allergens.includes('Nuts') || allergens.includes('Peanuts'))
				) {
					return false;
				}

				if (
					$userPreferences.dietaryRestrictions.vegan &&
					(allergens.includes('Dairy') || allergens.includes('Eggs'))
				) {
					return false;
				}
			}

			return true;
		}),
	);
</script>

<BackgroundSandwiches animated={false} count={30} opacity={0.08} pattern={true} />

<div class="container my-8 relative z-10 sandwich-pattern px-4">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Our Menu</h1>

		<div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
			<div class="relative flex-grow">
				<input
					type="text"
					placeholder="Search sandwiches..."
					class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
					bind:value={searchQuery}
				/>
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

			<UserPreferences />
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

			<button
				class={[
					'px-4 py-2 rounded-full text-sm font-medium transition-colors',
					{
						'bg-green-600 text-white': showDietaryFilters,
						'bg-gray-100': !showDietaryFilters,
						'hover:bg-gray-200': !showDietaryFilters,
					},
				]}
				onclick={() => (showDietaryFilters = !showDietaryFilters)}
			>
				{showDietaryFilters ? 'Dietary Filters On' : 'Dietary Filters Off'}
			</button>
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
				slug: '',
				price_id: '',
				image_bucket_id: '',
				image_name: '',
			}}
		/>

		{#each filteredProducts as product}
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
						showDietaryFilters = false;
					}}
				>
					Reset Filters
				</Button>
			</div>
		{/each}
	</div>
</div>
