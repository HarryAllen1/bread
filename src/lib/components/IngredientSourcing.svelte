<script lang="ts">
	interface Props {
		ingredients: {
			name: string;
			source: string;
			organic: boolean;
			local: boolean;
			description?: string;
		}[];
	}

	let { ingredients }: Props = $props();
</script>

<div class="ingredient-sourcing bg-white rounded-lg shadow-md p-6 border border-gray-200">
	<h3 class="text-xl font-bold mb-4 border-b pb-2">Ingredient Sourcing</h3>

	<div class="space-y-4">
		{#each ingredients as ingredient}
			<div
				class={[
					'p-3 rounded-md border',
					{
						'bg-green-50': ingredient.organic,
						'border-green-200': ingredient.organic,
						'bg-blue-50': ingredient.local && !ingredient.organic,
						'border-blue-200': ingredient.local && !ingredient.organic,
						'bg-gray-50': !ingredient.organic && !ingredient.local,
						'border-gray-200': !ingredient.organic && !ingredient.local,
					},
				]}
			>
				<div class="flex justify-between items-start">
					<h4 class="font-semibold">{ingredient.name}</h4>
					<div class="flex space-x-2">
						{#if ingredient.organic}
							<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
								>Organic</span
							>
						{/if}

						{#if ingredient.local}
							<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
								>Local</span
							>
						{/if}
					</div>
				</div>

				<p class="text-sm text-gray-600 mt-1">Source: {ingredient.source}</p>

				{#if ingredient.description}
					<p class="text-sm mt-2">{ingredient.description}</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-6 flex items-center justify-center">
		<div class="flex space-x-4">
			<div class="flex items-center">
				<div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
				<span class="text-sm">Organic</span>
			</div>
			<div class="flex items-center">
				<div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
				<span class="text-sm">Local</span>
			</div>
			<div class="flex items-center">
				<div class="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
				<span class="text-sm">Standard</span>
			</div>
		</div>
	</div>
</div>
