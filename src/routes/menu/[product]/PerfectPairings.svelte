<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageProps } from './$types';

	interface Props {
		products: PageProps['data']['products'];
	}

	let { products }: Props = $props();

	// three random indicies
	const nums: number[] = [];
	while (nums.length < 3) {
		// eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-non-null-assertion
		const num = Math.floor(Math.random() * products!.length);
		if (!nums.includes(num)) {
			nums.push(num);
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, unicorn/prevent-abbreviations
	const pairings = nums.map((num) => products![num]);

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
			<div class="border h-fit rounded-lg overflow-hidden hover:shadow-md transition-shadow">
				<div class="relative h-40">
					<a href="/menu/{pairing.slug}">
						<img src={pairing.image_url} alt={pairing.name} class="w-full h-full object-cover" />
					</a>
					<div
						class={[
							'absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded',
							{
								'bg-blue-100 text-blue-800': pairing.category === 'bread',
								'bg-green-100 text-green-800': pairing.category === 'sandwich',
							},
						]}
					>
						{pairing.category.slice(0, 1).toUpperCase() + pairing.category.slice(1)}
					</div>
				</div>

				<div class="p-4">
					<h4 class="font-semibold">{pairing.name}</h4>
					<p class="text-sm text-gray-600 mt-1">{pairing.description}</p>
				</div>
				<div class="m-4 mt-0">
					<Button href="/menu/{pairing.slug}" class="w-fit">View Details</Button>
				</div>
			</div>
		{/each}
	</div>
</div>
