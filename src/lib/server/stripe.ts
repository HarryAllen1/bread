import { PUBLIC_STRIPE_API_KEY } from '$env/static/private';
import { Stripe } from 'stripe';

export const stripe = new Stripe(PUBLIC_STRIPE_API_KEY);
