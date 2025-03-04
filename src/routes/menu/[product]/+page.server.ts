import type { PageServerLoad } from './$types';

export const prerender = false;

export const load = (async ({ locals: { supabase }, params }) => {
	const { data: productDetails } = await supabase
		.from('products')
		.select('*')
		.eq('slug', params.product)
		.single();

	if (!productDetails) {
		// Return a default product if not found
		return {
			productDetails: {
				id: 1,
				name: 'Product Not Found',
				description: 'This product could not be found.',
				price: 0,
				slug: params.product,
				image_url:
					'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
				allergens: 'None',
			},
		};
	}

	return {
		productDetails: {
			...productDetails,
			image_url:
				productDetails.image_bucket_id && productDetails.image_name
					? supabase.storage
							.from(productDetails.image_bucket_id)
							.getPublicUrl(productDetails.image_name).data.publicUrl
					: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
		},
	};
}) satisfies PageServerLoad;
