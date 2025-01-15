import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { total } = await request.json();

	if (typeof total !== 'number') {
		return error(400, 'Invalid total');
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'usd',
	});

	return json({
		client_secret: paymentIntent.client_secret,
	});
}) satisfies RequestHandler;
