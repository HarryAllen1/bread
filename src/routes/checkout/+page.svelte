<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { cart } from '$lib/cart';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_API_KEY } from '$env/static/public';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let checkoutContainer = $state<HTMLDivElement>();

	const fetchClientSecret = async (): Promise<string> => {
		const response = await fetch('/create-checkout-session', {
			method: 'POST',
			body: JSON.stringify(
				$cart.map((item) => ({
					price_id: data.products.find((product) => product.id === item.id)?.price_id,
					quantity: item.quantity,
				})),
			),
		});
		const { client_secret } = await response.json();
		return client_secret as string;
	};

	onMount(async () => {
		const stripe = await loadStripe(PUBLIC_STRIPE_API_KEY);
		if (!stripe) return;
		const checkout = await stripe.initEmbeddedCheckout({
			fetchClientSecret,
		});
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		checkout.mount(checkoutContainer!);
	});
</script>

<div class="container">
	<div bind:this={checkoutContainer}></div>
</div>
