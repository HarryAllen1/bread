import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params }) => {
	// If supabase is not available, return a default product
	if (!supabase) {
		return {
			productDetails: {
				id: 1,
				name: 'Sample Product',
				description: 'This is a sample product description.',
				price: 9.99,
				slug: params.product,
				image_url:
					'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
				allergens: 'None',
			},
		};
	}

	try {
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
	} catch (error) {
		console.error('Error fetching product details:', error);
		return {
			productDetails: {
				id: 1,
				name: 'Error Loading Product',
				description: 'There was an error loading this product.',
				price: 0,
				slug: params.product,
				image_url:
					'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
				allergens: 'None',
			},
		};
	}
}) satisfies PageServerLoad;
