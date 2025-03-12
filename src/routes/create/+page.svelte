<script lang="ts">
	import { browser } from '$app/environment';
	import BackgroundSandwiches from '$lib/components/BackgroundSandwiches.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';
	import { userPreferences } from '$lib/stores/userPreferences';
	import type { SandwichType } from '$lib/types';
	import { toast } from 'svelte-sonner';

	interface BaseProduct {
		id: string;
		name: string;
		price: number;
		vegan: boolean;
		glutenFree: boolean;
	}

	// Form state
	let currentStep = $state(1);
	let breadType = $state('sourdough');
	let breadSize = $state('medium');
	let toppings = $state<BaseProduct[]>([]);
	let spreads = $state<BaseProduct[]>([]);
	let proteins = $state<BaseProduct[]>([]);
	let vegetables = $state<BaseProduct[]>([]);
	let extras = $state<BaseProduct[]>([]);
	let specialInstructions = $state('');
	let name = $state('');
	let email = $state('');
	let phone = $state('');

	// Options
	const breadTypes: {
		id: string;
		name: string;
		price: number;
		icon: SandwichType;
	}[] = [
		{ id: 'sourdough', name: 'Sourdough', price: 1.5, icon: 'classic' },
		{ id: 'whole-wheat', name: 'Whole Wheat', price: 1.5, icon: 'classic' },
		{ id: 'rye', name: 'Rye', price: 1.75, icon: 'classic' },
		{ id: 'wrap', name: 'Tortilla Wrap', price: 2, icon: 'wrap' },
		{ id: 'ciabatta', name: 'Ciabatta', price: 2, icon: 'classic' },
		{ id: 'gluten-free', name: 'Gluten-Free', price: 2.5, icon: 'classic' },
	];

	const breadSizes = [
		{ id: 'small', name: 'Small', multiplier: 0.8 },
		{ id: 'medium', name: 'Medium', multiplier: 1 },
		{ id: 'large', name: 'Large', multiplier: 1.2 },
	];

	const toppingOptions = [
		{ id: 'sesame', name: 'Sesame Seeds', price: 0.25, vegan: true, glutenFree: true },
		{ id: 'poppy', name: 'Poppy Seeds', price: 0.25, vegan: true, glutenFree: true },
		{ id: 'everything', name: 'Everything Bagel', price: 0.5, vegan: true, glutenFree: false },
		{ id: 'salt', name: 'Sea Salt', price: 0.25, vegan: true, glutenFree: true },
		{ id: 'cheese', name: 'Cheese Crust', price: 0.75, vegan: false, glutenFree: false },
	];

	const spreadOptions = [
		{ id: 'hummus', name: 'Hummus', price: 0.75, vegan: true, glutenFree: true },
		{ id: 'pesto', name: 'Basil Pesto', price: 1, vegan: true, glutenFree: true },
		{ id: 'avocado', name: 'Avocado Spread', price: 1.5, vegan: true, glutenFree: true },
		{ id: 'mayo', name: 'Vegan Mayo', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'mustard', name: 'Dijon Mustard', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'tahini', name: 'Tahini Sauce', price: 0.75, vegan: true, glutenFree: true },
	];

	const proteinOptions = [
		{ id: 'tofu', name: 'Marinated Tofu', price: 2, vegan: true, glutenFree: true },
		{ id: 'tempeh', name: 'Smoked Tempeh', price: 2.5, vegan: true, glutenFree: true },
		{ id: 'seitan', name: 'Seitan', price: 2.5, vegan: true, glutenFree: false },
		{ id: 'falafel', name: 'Falafel', price: 2, vegan: true, glutenFree: true },
		{ id: 'chickpea', name: 'Chickpea Salad', price: 1.75, vegan: true, glutenFree: true },
		{ id: 'lentil', name: 'Lentil Patty', price: 2, vegan: true, glutenFree: true },
	];

	const vegetableOptions = [
		{ id: 'lettuce', name: 'Lettuce', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'tomato', name: 'Tomato', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'cucumber', name: 'Cucumber', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'onion', name: 'Red Onion', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'pepper', name: 'Roasted Peppers', price: 0.75, vegan: true, glutenFree: true },
		{ id: 'spinach', name: 'Spinach', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'arugula', name: 'Arugula', price: 0.75, vegan: true, glutenFree: true },
		{ id: 'pickles', name: 'Pickles', price: 0.5, vegan: true, glutenFree: true },
	];

	const extraOptions = [
		{ id: 'avocado', name: 'Avocado', price: 1.5, vegan: true, glutenFree: true },
		{ id: 'olives', name: 'Olives', price: 0.75, vegan: true, glutenFree: true },
		{ id: 'jalapenos', name: 'Jalapeños', price: 0.5, vegan: true, glutenFree: true },
		{ id: 'sprouts', name: 'Sprouts', price: 0.75, vegan: true, glutenFree: true },
		{ id: 'sauerkraut', name: 'Sauerkraut', price: 0.75, vegan: true, glutenFree: true },
		{
			id: 'sundried-tomatoes',
			name: 'Sun-dried Tomatoes',
			price: 1,
			vegan: true,
			glutenFree: true,
		},
	];

	// User preferences with safe initialization
	let userPrefs = $state({
		dietaryRestrictions: {
			glutenFree: false,
			vegan: false,
			vegetarian: false,
			dairyFree: false,
			nutFree: false,
		},
	});

	$effect(() => {
		if (browser) {
			userPrefs = $userPreferences;
		}
	});

	// Filter options based on dietary preferences
	const filterOptions = (options: BaseProduct[]): BaseProduct[] =>
		options.filter((option) => {
			if (userPrefs.dietaryRestrictions.glutenFree && !option.glutenFree) {
				return false;
			}
			if (userPrefs.dietaryRestrictions.vegan && !option.vegan) {
				return false;
			}
			return true;
		});

	// Calculate total price
	const calculateTotal = (): string => {
		// Base bread price
		const selectedBread = breadTypes.find((b) => b.id === breadType);
		let total = selectedBread ? selectedBread.price : 0;

		// Size multiplier
		const selectedSize = breadSizes.find((s) => s.id === breadSize);
		total *= selectedSize ? selectedSize.multiplier : 1;

		// Add toppings
		for (const toppingId of toppings) {
			const topping = toppingOptions.find((t) => t.id === toppingId.id);
			if (topping) total += topping.price;
		}

		// Add spreads
		for (const spreadId of spreads) {
			const spread = spreadOptions.find((s) => s.id === spreadId.id);
			if (spread) total += spread.price;
		}

		// Add proteins
		for (const proteinId of proteins) {
			const protein = proteinOptions.find((p) => p.id === proteinId.id);
			if (protein) total += protein.price;
		}

		// Add vegetables
		for (const vegetableId of vegetables) {
			const vegetable = vegetableOptions.find((v) => v.id === vegetableId.id);
			if (vegetable) total += vegetable.price;
		}

		// Add extras
		for (const extraId of extras) {
			const extra = extraOptions.find((extra) => extra.id === extraId.id);
			if (extra) total += extra.price;
		}

		return total.toFixed(2);
	};

	// Handle form navigation
	const nextStep = (): void => {
		if (currentStep < 7) {
			currentStep++;
		}
	};

	const previousStep = (): void => {
		if (currentStep > 1) {
			currentStep--;
		}
	};

	// Handle form submission
	const submitOrder = (): void => {
		// In a real app, this would send the order to a server
		toast.success('Your custom sandwich has been added to cart!');

		// Reset form
		currentStep = 1;
		breadType = 'sourdough';
		breadSize = 'medium';
		toppings = [];
		spreads = [];
		proteins = [];
		vegetables = [];
		extras = [];
		specialInstructions = '';
		name = '';
		email = '';
		phone = '';
	};

	// Toggle selection
	const toggleSelection = <T,>(array: T[], item: T): T[] => {
		const index = array.indexOf(item);
		return index === -1 ? [...array, item] : array.filter((i) => i !== item);
	};
</script>

<BackgroundSandwiches animated={false} count={30} opacity={0.08} pattern={true} />

<div class="container my-8 px-4">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
		Build Your Own Sandwich
	</h1>

	<div class="max-w-4xl mx-auto">
		<!-- Progress bar -->
		<div class="mb-8">
			<div class="flex justify-between mb-2">
				{#each { length: 7 }, i}
					<div
						class="flex flex-col items-center"
						class:text-primary={currentStep >= i + 1}
						class:text-gray-400={currentStep < i + 1}
					>
						<div
							class="size-8 rounded-full flex items-center justify-center mb-1"
							class:bg-primary={currentStep >= i + 1}
							class:bg-gray-200={currentStep < i + 1}
							class:text-white={currentStep >= i + 1}
						>
							{i + 1}
						</div>
						<span class="text-xs hidden sm:block">
							{i === 0
								? 'Bread'
								: i === 1
									? 'Toppings'
									: i === 2
										? 'Spreads'
										: i === 3
											? 'Protein'
											: i === 4
												? 'Veggies'
												: i === 5
													? 'Extras'
													: 'Review'}
						</span>
					</div>
				{/each}
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2.5">
				<div
					class="bg-primary h-2.5 rounded-full transition-all duration-300"
					style="width: {(currentStep / 7) * 100}%"
				></div>
			</div>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					{currentStep === 1
						? 'Choose Your Bread'
						: currentStep === 2
							? 'Add Toppings'
							: currentStep === 3
								? 'Select Spreads'
								: currentStep === 4
									? 'Add Protein'
									: currentStep === 5
										? 'Add Vegetables'
										: currentStep === 6
											? 'Any Extras?'
											: 'Review Your Order'}
				</Card.Title>
				<Card.Description>
					{currentStep === 1
						? 'Select the type and size of bread for your sandwich'
						: currentStep === 2
							? 'Choose toppings to add to your bread'
							: currentStep === 3
								? 'Select spreads for your sandwich'
								: currentStep === 4
									? 'Add protein to your sandwich'
									: currentStep === 5
										? 'Add fresh vegetables'
										: currentStep === 6
											? 'Add any extra ingredients'
											: 'Review your custom sandwich and complete your order'}
				</Card.Description>
			</Card.Header>

			<Card.Content>
				{#if currentStep === 1}
					<!-- Bread selection -->
					<div class="space-y-6">
						<div>
							<h3 class="text-lg font-medium mb-3">Bread Type</h3>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
								{#each breadTypes as bread}
									<button
										class={[
											'border rounded-lg p-4 cursor-pointer transition-all',
											{
												'border-primary': breadType === bread.id,
												'bg-primary-5': breadType === bread.id,
												'shadow-md': breadType === bread.id,
											},
										]}
										onclick={() => (breadType = bread.id)}
									>
										<div class="flex items-center gap-3">
											<SandwichIcon type={bread.icon} size="sm" />
											<div>
												<div class="font-medium">{bread.name}</div>
												<div class="text-sm text-gray-500">${bread.price.toFixed(2)}</div>
											</div>
										</div>
									</button>
								{/each}
							</div>
						</div>

						<div>
							<h3 class="text-lg font-medium mb-3">Size</h3>
							<div class="flex gap-4">
								{#each breadSizes as size}
									<button
										class={[
											'border rounded-lg p-4 cursor-pointer transition-all flex-1 text-center',
											{
												'border-primary': breadSize === size.id,
												'bg-primary-5': breadSize === size.id,
												'shadow-md': breadSize === size.id,
											},
										]}
										onclick={() => (breadSize = size.id)}
									>
										<div class="font-medium">{size.name}</div>
										<div class="text-sm text-gray-500">
											{size.multiplier < 1 ? '-' : '+'}
											{Math.abs((size.multiplier - 1) * 100)}%
										</div>
									</button>
								{/each}
							</div>
						</div>
					</div>
				{:else if currentStep === 2}
					<!-- Toppings selection -->
					<div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each filterOptions(toppingOptions) as topping}
								<button
									class={[
										'border rounded-lg p-4 cursor-pointer transition-all',
										{
											'border-primary': toppings.includes(topping),
											'bg-primary-5': toppings.includes(topping),
											'shadow-md': toppings.includes(topping),
										},
									]}
									onclick={() => (toppings = toggleSelection(toppings, topping))}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-medium">{topping.name}</div>
											<div class="text-sm text-gray-500">+${topping.price.toFixed(2)}</div>
										</div>
										<div class="flex gap-2">
											{#if topping.vegan}
												<span
													class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
													>Vegan</span
												>
											{/if}
											{#if topping.glutenFree}
												<span
													class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
													>GF</span
												>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else if currentStep === 3}
					<!-- Spreads selection -->
					<div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each filterOptions(spreadOptions) as spread}
								<button
									class={[
										'border rounded-lg p-4 cursor-pointer transition-all',
										{
											'border-primary': spreads.includes(spread),
											'bg-primary-5': spreads.includes(spread),
											'shadow-md': spreads.includes(spread),
										},
									]}
									onclick={() => (spreads = toggleSelection(spreads, spread))}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-medium">{spread.name}</div>
											<div class="text-sm text-gray-500">+${spread.price.toFixed(2)}</div>
										</div>
										<div class="flex gap-2">
											{#if spread.vegan}
												<span
													class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
													>Vegan</span
												>
											{/if}
											{#if spread.glutenFree}
												<span
													class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
													>GF</span
												>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else if currentStep === 4}
					<!-- Protein selection -->
					<div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each filterOptions(proteinOptions) as protein}
								<button
									class={[
										'border rounded-lg p-4 cursor-pointer transition-all',
										{
											'border-primary': proteins.includes(protein),
											'bg-primary-5': proteins.includes(protein),
											'shadow-md': proteins.includes(protein),
										},
									]}
									onclick={() => (proteins = toggleSelection(proteins, protein))}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-medium">{protein.name}</div>
											<div class="text-sm text-gray-500">+${protein.price.toFixed(2)}</div>
										</div>
										<div class="flex gap-2">
											{#if protein.vegan}
												<span
													class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
													>Vegan</span
												>
											{/if}
											{#if protein.glutenFree}
												<span
													class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
													>GF</span
												>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else if currentStep === 5}
					<!-- Vegetables selection -->
					<div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each filterOptions(vegetableOptions) as vegetable}
								<button
									class={[
										'border rounded-lg p-4 cursor-pointer transition-all',
										{
											'border-primary': vegetables.includes(vegetable),
											'bg-primary-5': vegetables.includes(vegetable),
											'shadow-md': vegetables.includes(vegetable),
										},
									]}
									onclick={() => (vegetables = toggleSelection(vegetables, vegetable))}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-medium">{vegetable.name}</div>
											<div class="text-sm text-gray-500">+${vegetable.price.toFixed(2)}</div>
										</div>
										<div class="flex gap-2">
											{#if vegetable.vegan}
												<span
													class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
													>Vegan</span
												>
											{/if}
											{#if vegetable.glutenFree}
												<span
													class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
													>GF</span
												>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else if currentStep === 6}
					<!-- Extras selection -->
					<div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each filterOptions(extraOptions) as extra}
								<button
									class={[
										'border rounded-lg p-4 cursor-pointer transition-all',
										{
											'border-primary': extras.includes(extra),
											'bg-primary-5': extras.includes(extra),
											'shadow-md': extras.includes(extra),
										},
									]}
									onclick={() => (extras = toggleSelection(extras, extra))}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-medium">{extra.name}</div>
											<div class="text-sm text-gray-500">+${extra.price.toFixed(2)}</div>
										</div>
										<div class="flex gap-2">
											{#if extra.vegan}
												<span
													class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
													>Vegan</span
												>
											{/if}
											{#if extra.glutenFree}
												<span
													class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
													>GF</span
												>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>

						<div class="mt-6">
							<Label for="special-instructions">Special Instructions</Label>
							<textarea
								id="special-instructions"
								rows="3"
								class="w-full p-2 border rounded-md mt-1"
								placeholder="Any special requests or instructions..."
								bind:value={specialInstructions}
							></textarea>
						</div>
					</div>
				{:else if currentStep === 7}
					<!-- Order review -->
					<div class="space-y-6">
						<div class="bg-gray-50 p-4 rounded-lg">
							<h3 class="font-semibold mb-2">Your Custom Sandwich</h3>

							<div class="space-y-3">
								<div class="flex justify-between">
									<div>
										<span class="font-medium">Bread:</span>
										{breadTypes.find((b) => b.id === breadType)?.name || ''} ({breadSizes.find(
											(s) => s.id === breadSize,
										)?.name || ''})
									</div>
									<div>
										${(breadTypes.find((b) => b.id === breadType)?.price || 0) *
											(breadSizes.find((s) => s.id === breadSize)?.multiplier || 1)}
									</div>
								</div>

								{#if toppings.length > 0}
									<div>
										<span class="font-medium">Toppings:</span>
										<ul class="ml-4 list-disc">
											{#each toppings as toppingId}
												{@const topping = toppingOptions.find((t) => t.id === toppingId.id)}
												{#if topping}
													<li class="flex justify-between">
														<span>{topping.name}</span>
														<span>${topping.price.toFixed(2)}</span>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/if}

								{#if spreads.length > 0}
									<div>
										<span class="font-medium">Spreads:</span>
										<ul class="ml-4 list-disc">
											{#each spreads as spreadId}
												{@const spread = spreadOptions.find((s) => s.id === spreadId.id)}
												{#if spread}
													<li class="flex justify-between">
														<span>{spread.name}</span>
														<span>${spread.price.toFixed(2)}</span>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/if}

								{#if proteins.length > 0}
									<div>
										<span class="font-medium">Proteins:</span>
										<ul class="ml-4 list-disc">
											{#each proteins as proteinId}
												{@const protein = proteinOptions.find((p) => p.id === proteinId.id)}
												{#if protein}
													<li class="flex justify-between">
														<span>{protein.name}</span>
														<span>${protein.price.toFixed(2)}</span>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/if}

								{#if vegetables.length > 0}
									<div>
										<span class="font-medium">Vegetables:</span>
										<ul class="ml-4 list-disc">
											{#each vegetables as vegetableId}
												{@const vegetable = vegetableOptions.find((v) => v.id === vegetableId.id)}
												{#if vegetable}
													<li class="flex justify-between">
														<span>{vegetable.name}</span>
														<span>${vegetable.price.toFixed(2)}</span>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/if}

								{#if extras.length > 0}
									<div>
										<span class="font-medium">Extras:</span>
										<ul class="ml-4 list-disc">
											{#each extras as extraId}
												{@const extra = extraOptions.find(
													(extraItem) => extraItem.id === extraId.id,
												)}
												{#if extra}
													<li class="flex justify-between">
														<span>{extra.name}</span>
														<span>${extra.price.toFixed(2)}</span>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/if}

								{#if specialInstructions}
									<div>
										<span class="font-medium">Special Instructions:</span>
										<p class="ml-4 text-gray-700">{specialInstructions}</p>
									</div>
								{/if}

								<div class="border-t pt-3 flex justify-between font-bold">
									<span>Total:</span>
									<span>${calculateTotal()}</span>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-semibold mb-2">Contact Information</h3>
							<div class="space-y-3">
								<div>
									<Label for="name">Name</Label>
									<Input id="name" bind:value={name} placeholder="Your name" />
								</div>

								<div>
									<Label for="email">Email</Label>
									<Input id="email" type="email" bind:value={email} placeholder="Your email" />
								</div>

								<div>
									<Label for="phone">Phone (optional)</Label>
									<Input id="phone" bind:value={phone} placeholder="Your phone number" />
								</div>
							</div>
						</div>
					</div>
				{/if}
			</Card.Content>

			<Card.Footer class="flex justify-between">
				<Button variant="outline" onclick={previousStep} disabled={currentStep === 1}>Back</Button>

				{#if currentStep < 7}
					<Button onclick={nextStep}>Next</Button>
				{:else}
					<Button onclick={submitOrder}>Add to Cart</Button>
				{/if}
			</Card.Footer>
		</Card.Root>
	</div>
</div>
