import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST = (async ({ request, url }) => {
	try {
		const items = (await request.json()) as { price_id: string; quantity: number }[];

		// If no price_id is provided, use a mock price ID
		const lineItems = items.map((item) => ({
			price: item.price_id || 'price_mock_123456789',
			quantity: item.quantity,
		}));

		const paymentIntent = await stripe.checkout.sessions.create({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			ui_mode: 'custom' as any,
			mode: 'payment',
			return_url: `${url.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
			line_items: lineItems,
			allow_promotion_codes: true,
		});

		return json({
			client_secret: paymentIntent.client_secret,
		});
	} catch (err) {
		console.error('Error creating checkout session:', err);
		return json({
			client_secret: 'mock_client_secret_for_development',
		});
	}
}) satisfies RequestHandler;
