<script lang="ts">
	interface Props {
		allergens?: string[];
		mayContain?: string[];
	}

	let { allergens = [], mayContain = [] }: Props = $props();

	const commonAllergens = [
		'Wheat',
		'Gluten',
		'Dairy',
		'Eggs',
		'Nuts',
		'Peanuts',
		'Soy',
		'Sesame',
		'Fish',
		'Shellfish',
	];

	// Check if allergen is in the list
	const hasAllergen = (allergen: string): boolean => {
		return allergens.includes(allergen);
	};

	// Check if allergen may be present
	const mayHaveAllergen = (allergen: string): boolean => {
		return mayContain.includes(allergen);
	};
</script>

<div class="allergen-info bg-white rounded-lg shadow-md p-6 border border-gray-200">
	<h3 class="text-xl font-bold mb-4 border-b pb-2">Allergen Information</h3>

	<div class="grid grid-cols-2 gap-4">
		{#each commonAllergens as allergen}
			<div
				class={[
					'flex items-center p-2 rounded-md',
					{
						'bg-red-50': hasAllergen(allergen),
						'bg-yellow-50': mayHaveAllergen(allergen),
						'bg-green-50': !hasAllergen(allergen) && !mayHaveAllergen(allergen),
					},
				]}
			>
				{#if hasAllergen(allergen)}
					<div class="w-4 h-4 rounded-full bg-red-500 mr-3 flex-shrink-0"></div>
					<div>
						<div class="font-medium">{allergen}</div>
						<div class="text-xs text-red-700">Contains</div>
					</div>
				{:else if mayHaveAllergen(allergen)}
					<div class="w-4 h-4 rounded-full bg-yellow-500 mr-3 flex-shrink-0"></div>
					<div>
						<div class="font-medium">{allergen}</div>
						<div class="text-xs text-yellow-700">May contain</div>
					</div>
				{:else}
					<div class="w-4 h-4 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
					<div>
						<div class="font-medium">{allergen}</div>
						<div class="text-xs text-green-700">Free from</div>
					</div>
				{/if}
				}
			</div>
		{/each}
	</div>

	{#if allergens.length > 0}
		<div class="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
			<p class="text-sm font-medium text-red-800">
				<span class="font-bold">Warning:</span> This product contains {allergens.join(', ')}.
			</p>
		</div>
	{/if}

	{#if mayContain.length > 0}
		<div class="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
			<p class="text-sm font-medium text-yellow-800">
				<span class="font-bold">Note:</span> This product may contain traces of {mayContain.join(
					', ',
				)}.
			</p>
		</div>
	{/if}
</div>
