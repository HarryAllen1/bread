import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe } from '$lib/server/stripe';
import { error } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (!sessionId) {
		return error(400, 'Missing session_id');
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return json({
			status: session.status,
			customer_email: session.customer_details?.email,
			order_number: session,
		});
	} catch (error_) {
		console.error('Error retrieving session:', error_);
		// Return mock data for development
		return json({
			status: 'complete',
			customer_email: 'customer@example.com',
		});
	}
}) satisfies RequestHandler;
