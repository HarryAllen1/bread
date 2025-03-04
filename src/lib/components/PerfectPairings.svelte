<script lang="ts">
	interface Props {
		productId: number;
		productName: string;
	}

	let { productId, productName }: Props = $props();

	// Sample pairings data
	const pairings = [
		{
			id: 1,
			type: 'bread',
			name: 'Sourdough Loaf',
			description: 'The tangy flavor of sourdough complements the sweetness of our banana bread.',
			image:
				'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		},
		{
			id: 2,
			type: 'meal',
			name: 'Avocado Toast',
			description: 'Create the perfect breakfast with our multigrain bread and fresh avocado.',
			image:
				'https://images.unsplash.com/photo-1603046891744-76e6300f82ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		},
		{
			id: 3,
			type: 'beverage',
			name: 'French Press Coffee',
			description: 'The rich flavor of French press coffee pairs beautifully with our pastries.',
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		},
	];

	// Filter pairings based on product
	const getRelevantPairings = (): typeof pairings => {
		// In a real app, this would filter based on the actual product
		return pairings;
	};

	const relevantPairings = getRelevantPairings();
</script>

<div class="perfect-pairings bg-white rounded-lg shadow-md p-6 border border-gray-200">
	<h3 class="text-xl font-bold mb-4 border-b pb-2">Perfect Pairings</h3>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		{#each relevantPairings as pairing}
			<div class="pairing-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
				<div class="relative h-40">
					<img src={pairing.image} alt={pairing.name} class="w-full h-full object-cover" />
					<div
						class={[
							'absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded',
							{
								'bg-blue-100 text-blue-800': pairing.type === 'bread',
								'bg-green-100 text-green-800': pairing.type === 'meal',
								'bg-purple-100 text-purple-800': pairing.type === 'beverage',
							},
						]}
					>
						{pairing.type}
					</div>
				</div>

				<div class="p-4">
					<h4 class="font-semibold">{pairing.name}</h4>
					<p class="text-sm text-gray-600 mt-1">{pairing.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
