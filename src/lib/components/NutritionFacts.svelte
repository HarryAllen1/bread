<script lang="ts">
	interface Props {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
		fiber: number;
		sugar: number;
		sodium: number;
		servingSize: string;
		healthScore?: number; // 60-100 range
	}

	let {
		calories,
		protein,
		carbs,
		fat,
		fiber,
		sugar,
		sodium,
		servingSize,
		healthScore = Math.floor(Math.random() * 41) + 60,
	}: Props = $props();

	// Calculate macronutrient percentages
	const totalCals = protein * 4 + carbs * 4 + fat * 9;
	const proteinPercentage = Math.round(((protein * 4) / totalCals) * 100);
	const carbsPercentage = Math.round(((carbs * 4) / totalCals) * 100);
	const fatPercentage = Math.round(((fat * 9) / totalCals) * 100);

	// Health score color
	let healthScoreColor = $state('');
	if (healthScore >= 80) {
		healthScoreColor = 'text-green-500';
	} else if (healthScore >= 60) {
		healthScoreColor = 'text-yellow-500';
	} else {
		healthScoreColor = 'text-red-500';
	}
</script>

<div class="nutrition-facts bg-white rounded-lg shadow-md p-6 border border-gray-200">
	<h3 class="text-xl font-bold mb-4 border-b pb-2">Nutrition Facts</h3>

	<div class="mb-4">
		<p class="text-sm text-gray-600">Serving Size: {servingSize}</p>
	</div>

	<div class="flex justify-between items-center mb-6">
		<div class="text-center">
			<div class="text-3xl font-bold">{calories}</div>
			<div class="text-sm text-gray-600">Calories</div>
		</div>

		<div class="text-center">
			<div class="text-3xl font-bold {healthScoreColor}">{healthScore}</div>
			<div class="text-sm text-gray-600">Health Score</div>
		</div>
	</div>

	<div class="space-y-4">
		<!-- Macronutrient breakdown -->
		<div>
			<h4 class="font-semibold mb-2">Macronutrients</h4>

			<div class="flex items-center mb-2">
				<div class="w-24">Protein</div>
				<div class="flex-1 mx-2">
					<div class="h-2 bg-gray-200 rounded-full">
						<div class="h-2 bg-blue-500 rounded-full" style="width: {proteinPercentage}%"></div>
					</div>
				</div>
				<div class="w-16 text-right">{protein}g ({proteinPercentage}%)</div>
			</div>

			<div class="flex items-center mb-2">
				<div class="w-24">Carbs</div>
				<div class="flex-1 mx-2">
					<div class="h-2 bg-gray-200 rounded-full">
						<div class="h-2 bg-green-500 rounded-full" style="width: {carbsPercentage}%"></div>
					</div>
				</div>
				<div class="w-16 text-right">{carbs}g ({carbsPercentage}%)</div>
			</div>

			<div class="flex items-center">
				<div class="w-24">Fat</div>
				<div class="flex-1 mx-2">
					<div class="h-2 bg-gray-200 rounded-full">
						<div class="h-2 bg-yellow-500 rounded-full" style="width: {fatPercentage}%"></div>
					</div>
				</div>
				<div class="w-16 text-right">{fat}g ({fatPercentage}%)</div>
			</div>
		</div>

		<!-- Additional nutrients -->
		<div class="grid grid-cols-2 gap-4 pt-4 border-t">
			<div>
				<div class="text-sm text-gray-600">Dietary Fiber</div>
				<div class="font-semibold">{fiber}g</div>
			</div>

			<div>
				<div class="text-sm text-gray-600">Sugars</div>
				<div class="font-semibold">{sugar}g</div>
			</div>

			<div>
				<div class="text-sm text-gray-600">Sodium</div>
				<div class="font-semibold">{sodium}mg</div>
			</div>
		</div>
	</div>
</div>
