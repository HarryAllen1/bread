import { STRIPE_SECRET } from '$env/static/private';
import { Stripe } from 'stripe';

// Use a fallback key for development if the environment variable is not set
const stripeKey = STRIPE_SECRET || 'sk_test_example_key_123456789';

export const stripe = new Stripe(stripeKey, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apiVersion: '2024-12-18.acacia; custom_checkout_beta=v1' as any,
});
