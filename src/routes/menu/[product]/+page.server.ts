import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params }) => {
	const { data: productDetails } = await supabase
		.from('products')
		.select('*')
		.eq('slug', params.product)
		.single();

	return {
		productDetails,
	};
}) satisfies PageServerLoad;
