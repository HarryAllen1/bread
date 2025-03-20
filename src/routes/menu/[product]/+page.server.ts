import type { PageServerLoad } from './$types';

export const prerender = false;

export const load = (async ({ locals: { supabase }, params }) => {
	const { data: preProducts } = await supabase.from('products').select('*').order('name');
	const products =
		preProducts?.map((product) => ({
			...product,
			image_url:
				product.image_bucket_id && product.image_name
					? supabase.storage.from(product.image_bucket_id).getPublicUrl(product.image_name).data
							.publicUrl
					: 'https://images.pexels.com/photos/1630309/pexels-photo-1630309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		})) ?? [];
	const productDetails = products.find((product) => product.slug === params.product);

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
					'https://images.pexels.com/photos/1630309/pexels-photo-1630309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
				allergens: 'None',
			},
		};
	}

	return {
		products,
		productDetails,
	};
}) satisfies PageServerLoad;
