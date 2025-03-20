import type { PageServerLoad } from './$types';

export const prerender = false;

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
						: 'https://images.pexels.com/photos/1630309/pexels-photo-1630309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			})) ?? [],
	};
}) satisfies PageServerLoad;
