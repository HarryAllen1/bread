<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { toast } from 'svelte-sonner';
	import Settings from 'lucide-svelte/icons/settings';
	import { browser } from '$app/environment';
	import { userPreferences } from '$lib/stores/userPreferences';
	import { get } from 'svelte/store';

	let open = $state(false);
	let currentPrefs = $state({
		dietaryRestrictions: {
			glutenFree: false,
			vegan: false,
			vegetarian: false,
			dairyFree: false,
			nutFree: false,
		},
		favorites: [],
		customizations: {
			preferredBreadType: '',
			preferredSliceThickness: 'medium',
			toasted: false,
		},
	});

	// Initialize preferences safely
	$effect(() => {
		if (browser) {
			currentPrefs = get(userPreferences);
		}
	});

	const savePreferences = () => {
		userPreferences.set(currentPrefs);
		toast.success('Preferences saved successfully');
		open = false;
	};

	const resetPreferences = () => {
		currentPrefs = {
			dietaryRestrictions: {
				glutenFree: false,
				vegan: false,
				vegetarian: false,
				dairyFree: false,
				nutFree: false,
			},
			favorites: [],
			customizations: {
				preferredBreadType: '',
				preferredSliceThickness: 'medium',
				toasted: false,
			},
		};
	};
</script>

<div>
	<Button
		variant="ghost"
		class="flex items-center gap-2 text-lg py-3 px-5"
		onclick={() => (open = true)}
	>
		<Settings class="size-5" />
		<span class="hidden md:inline">Preferences</span>
	</Button>

	<Sheet.Root bind:open>
		<Sheet.Content class="w-[90%] sm:max-w-md">
			<Sheet.Header>
				<Sheet.Title class="text-2xl">Your Preferences</Sheet.Title>
				<Sheet.Description class="text-lg">
					Customize your sandwich experience. These settings will be saved for future visits.
				</Sheet.Description>
			</Sheet.Header>

			<div class="py-6 space-y-6">
				<div>
					<h3 class="text-xl font-medium mb-3">Dietary Restrictions</h3>
					<div class="space-y-3">
						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.dietaryRestrictions.glutenFree}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Gluten Free</span>
						</label>

						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.dietaryRestrictions.vegan}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Vegan</span>
						</label>

						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.dietaryRestrictions.vegetarian}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Vegetarian</span>
						</label>

						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.dietaryRestrictions.dairyFree}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Dairy Free</span>
						</label>

						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.dietaryRestrictions.nutFree}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Nut Free</span>
						</label>
					</div>
				</div>

				<div>
					<h3 class="text-xl font-medium mb-3">Sandwich Customizations</h3>

					<div class="space-y-4">
						<div>
							<label for="bread-type" class="block text-lg font-medium mb-1"
								>Preferred Bread Type</label
							>
							<select
								id="bread-type"
								class="w-full p-3 border rounded-md text-lg"
								bind:value={currentPrefs.customizations.preferredBreadType}
							>
								<option value="">No Preference</option>
								<option value="sourdough">Sourdough</option>
								<option value="whole-wheat">Whole Wheat</option>
								<option value="rye">Rye</option>
								<option value="wrap">Tortilla Wrap</option>
								<option value="ciabatta">Ciabatta</option>
								<option value="gluten-free">Gluten-Free</option>
							</select>
						</div>

						<div>
							<label class="block text-lg font-medium mb-1">Preferred Slice Thickness</label>
							<div class="flex space-x-4">
								<label class="flex items-center space-x-2 text-lg">
									<input
										type="radio"
										name="slice-thickness"
										value="thin"
										bind:group={currentPrefs.customizations.preferredSliceThickness}
										class="text-primary focus:ring-primary size-5"
									/>
									<span>Thin</span>
								</label>

								<label class="flex items-center space-x-2 text-lg">
									<input
										type="radio"
										name="slice-thickness"
										value="medium"
										bind:group={currentPrefs.customizations.preferredSliceThickness}
										class="text-primary focus:ring-primary size-5"
									/>
									<span>Medium</span>
								</label>

								<label class="flex items-center space-x-2 text-lg">
									<input
										type="radio"
										name="slice-thickness"
										value="thick"
										bind:group={currentPrefs.customizations.preferredSliceThickness}
										class="text-primary focus:ring-primary size-5"
									/>
									<span>Thick</span>
								</label>
							</div>
						</div>

						<label class="flex items-center space-x-3 text-lg">
							<input
								type="checkbox"
								bind:checked={currentPrefs.customizations.toasted}
								class="rounded text-primary focus:ring-primary size-5"
							/>
							<span>Toasted (when applicable)</span>
						</label>
					</div>
				</div>
			</div>

			<Sheet.Footer>
				<div class="flex justify-between w-full">
					<Button variant="outline" onclick={resetPreferences} class="text-lg py-6">Reset</Button>
					<div class="flex space-x-2">
						<Sheet.Close asChild>
							<Button variant="outline" class="text-lg py-6">Cancel</Button>
						</Sheet.Close>
						<Button onclick={savePreferences} class="text-lg py-6">Save Preferences</Button>
					</div>
				</div>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</div>
