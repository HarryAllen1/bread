<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { addToCart } from '$lib/cart';
	import AllergenInfo from '$lib/components/AllergenInfo.svelte';
	import IngredientSourcing from '$lib/components/IngredientSourcing.svelte';
	import NutritionFacts from '$lib/components/NutritionFacts.svelte';
	import PerfectPairings from './PerfectPairings.svelte';
	import ReviewSystem from '$lib/components/ReviewSystem.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { userPreferences } from '$lib/stores/userPreferences';
	import Heart from 'lucide-svelte/icons/heart';
	import Shield from 'lucide-svelte/icons/shield';
	import Sprout from 'lucide-svelte/icons/sprout';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	// Sample nutrition data (would come from database in real app)
	const nutritionData = {
		calories: Math.floor(Math.random() * 200) + 300,
		protein: Math.floor(Math.random() * 8) + 10,
		carbs: Math.floor(Math.random() * 30) + 30,
		fat: Math.floor(Math.random() * 10) + 8,
		fiber: Math.floor(Math.random() * 4) + 3,
		sugar: Math.floor(Math.random() * 5) + 2,
		sodium: Math.floor(Math.random() * 300) + 400,
		servingSize: '1 sandwich (250g)',
	};

	// Parse allergens from product details
	const allergenList = data.productDetails.allergens
		? data.productDetails.allergens.split(',').map((a) => a.trim())
		: [];

	// Sample ingredient data
	const ingredients = [
		{
			name: 'Organic Bread',
			source: 'Local Bakery, 5 miles away',
			organic: true,
			local: true,
			description: 'Freshly baked artisanal bread made with organic flour.',
		},
		{
			name: 'Fresh Vegetables',
			source: 'Community Farm, 15 miles away',
			organic: true,
			local: true,
			description: 'Seasonal vegetables harvested daily.',
		},
		{
			name: 'Plant-Based Protein',
			source: 'Regional Producer',
			organic: true,
			local: false,
			description: 'Ethically produced plant protein alternatives.',
		},
		{
			name: 'Signature Sauce',
			source: 'House-made Daily',
			organic: false,
			local: true,
			description: 'Our secret recipe made fresh each morning.',
		},
	];

	// Check if product matches user dietary preferences
	let dietaryWarnings: string[] = $state([]);
	let isFavorite = $state(false);

	$effect(() => {
		if (browser) {
			// Reset warnings
			dietaryWarnings = [];

			if (
				$userPreferences.dietaryRestrictions.glutenFree &&
				(allergenList.includes('Wheat') || allergenList.includes('Gluten'))
			) {
				dietaryWarnings.push('Contains gluten');
			}

			if ($userPreferences.dietaryRestrictions.dairyFree && allergenList.includes('Dairy')) {
				dietaryWarnings.push('Contains dairy');
			}

			if (
				$userPreferences.dietaryRestrictions.nutFree &&
				(allergenList.includes('Nuts') || allergenList.includes('Peanuts'))
			) {
				dietaryWarnings.push('Contains nuts');
			}

			// Check if this is a favorite
			isFavorite = $userPreferences.favorites.includes(data.productDetails.id) || false;
		}
	});

	const toggleFavorite = (): void => {
		if (isFavorite) {
			userPreferences.update((prefs) => {
				return {
					...prefs,
					favorites: prefs.favorites.filter((id) => id !== data.productDetails.id),
				};
			});
			toast.success('Removed from favorites');
		} else {
			userPreferences.update((prefs) => {
				return {
					...prefs,
					favorites: [...prefs.favorites, data.productDetails.id],
				};
			});
			toast.success('Added to favorites');
		}
	};
</script>

<svelte:head>
	<title>
		{data.productDetails.name} - Greenwich
	</title>
	<meta
		name="description"
		content={data.productDetails.description ||
			`Delicious ${data.productDetails.name} from our vegetarian sandwich shop.`}
	/>
</svelte:head>

<div class="container my-8">
	{#if dietaryWarnings.length > 0}
		<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<p class="text-sm text-yellow-700">
						<span class="font-medium">Dietary Warning:</span> This product doesn't match your
						dietary preferences ({dietaryWarnings.join(', ')}).
					</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-col md:flex-row gap-6 items-start">
		<div class="md:w-1/2">
			<div class="flex justify-between items-center mb-4">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{data.productDetails.name}
				</h1>

				<button
					class="flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
					onclick={toggleFavorite}
					aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				>
					<svg
						class={['size-6', isFavorite && 'text-red-500']}
						fill={isFavorite ? 'currentColor' : 'none'}
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
				</button>
			</div>

			<div class="mb-6 rounded-lg overflow-hidden shadow-lg">
				<img
					src={data.productDetails.image_url}
					alt={data.productDetails.name}
					class="w-full h-auto object-cover"
				/>
			</div>

			<div class="mb-6">
				<div class="flex items-center justify-between">
					<div>
						<span class="text-3xl font-bold">${data.productDetails.price}</span>
						<span class="ml-2 text-sm text-gray-500">per sandwich</span>
					</div>

					<div class="flex gap-2">
						<Button
							onclick={() => {
								addToCart(data.productDetails.id);
								toast.success('Added to cart!', {
									action: {
										label: 'View Cart',
										onClick: () => {
											goto('/cart');
										},
									},
								});
							}}
							class="flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="9" cy="21" r="1"></circle>
								<circle cx="20" cy="21" r="1"></circle>
								<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
							</svg>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>

			<div class="mb-8">
				<h2 class="text-2xl font-bold mb-2">Description</h2>
				<p class="leading-7 text-gray-700">{data.productDetails.description}</p>

				<div class="mt-4 flex flex-wrap gap-2">
					<div
						class="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
					>
						<Sprout class="size-4" />
						<span>Vegetarian</span>
					</div>

					<div
						class="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
					>
						<Shield class="size-4" />
						<span>Fresh Daily</span>
					</div>

					<div
						class="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
					>
						<Heart class="size-4" />
						<span>Customer Favorite</span>
					</div>
				</div>
			</div>

			<div>
				<PerfectPairings products={data.products} />
			</div>
		</div>

		<div class="md:w-1/2">
			<Tabs.Root value="nutrition" class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="nutrition">Nutrition</Tabs.Trigger>
					<Tabs.Trigger value="allergens">Allergens</Tabs.Trigger>
					<Tabs.Trigger value="ingredients">Ingredients</Tabs.Trigger>
					<Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="nutrition" class="pt-4">
					<NutritionFacts {...nutritionData} />
				</Tabs.Content>

				<Tabs.Content value="allergens" class="pt-4">
					<AllergenInfo allergens={allergenList} mayContain={['Sesame', 'Soy']} />
				</Tabs.Content>

				<Tabs.Content value="ingredients" class="pt-4">
					<IngredientSourcing {ingredients} />
				</Tabs.Content>

				<Tabs.Content value="reviews" class="pt-4">
					<ReviewSystem productName={data.productDetails.name} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</div>
</div>
