import { persisted } from 'svelte-persisted-store';

// Define user preferences store with safe initialization
export const userPreferences = persisted('userPreferences', {
	dietaryRestrictions: {
		glutenFree: false,
		vegan: false,
		vegetarian: false,
		dairyFree: false,
		nutFree: false,
	},
	favorites: [] as number[],
	customizations: {
		preferredBreadType: '',
		preferredSliceThickness: 'medium',
		toasted: false,
	},
});
