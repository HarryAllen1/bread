import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data: products } = await supabase.from('products').select('*').order('name');

	return {
		products:
			products?.map((product) => ({
				...product,
				image_url:
					product.image_bucket_id && product.image_name
						? supabase.storage.from(product.image_bucket_id).getPublicUrl(product.image_name).data
								.publicUrl
						: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2070&auto=format&fit=crop',
			})) ?? [],
	};
}) satisfies PageServerLoad;
