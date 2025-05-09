<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_STRIPE_API_KEY } from '$env/static/public';
	import { cart } from '$lib/cart';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { fancyConfirm } from '$lib/confirm';
	import Metadata from '$lib/Metadata.svelte';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { loadStripe, type StripeCheckout, type StripeCheckoutSession } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import defaultTheme from 'tailwindcss/defaultTheme';
	import type { PageData } from './$types';
	import { selectedLocation } from './state.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let name = $state('');
	let email = $state('');

	const locations = [
		{
			value: 'downtown',
			label: 'Downtown (Greenwich, CT)',
		},
		{
			value: 'midtown',
			label: 'Midtown (Greenwich, UK)',
		},
	];

	let locationTriggerContent = $derived(
		locations.find((location) => location.value === selectedLocation.current)?.label ??
			'Select a location',
	);

	let promoCode = $state('');
	let appliedPromoCode = $state('');

	let emailErrors = $state('');
	let submitErrors = $state('');
	let promoCodeErrors = $state('');

	let checkoutContainer = $state<HTMLDivElement>();

	let checkout: StripeCheckout;
	let session = $state<StripeCheckoutSession>();

	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	const fetchClientSecret = async (): Promise<string> => {
		const response = await fetch('/create-checkout-session', {
			method: 'POST',
			body: JSON.stringify(
				$cart
					// .filter((item) => !('isSandwich' in item))
					.map((item) => ({
						price_id: data.products.find((product) => product.id === item.id)?.price_id,
						quantity: item.quantity,
					})),
			),
		});
		const { client_secret } = await response.json();
		return client_secret as string;
	};

	onMount(async () => {
		if ($cart.length === 0) {
			goto('/cart');
			return;
		}
		const stripe = await loadStripe(PUBLIC_STRIPE_API_KEY, {
			betas: ['custom_checkout_beta_5'],
		});
		if (!stripe) return;

		checkout = await stripe.initCheckout({
			clientSecret: await fetchClientSecret(),
			elementsOptions: {
				appearance: {
					variables: {
						fontFamily: defaultTheme.fontFamily.sans.join(', '),
						fontWeightBold: defaultTheme.fontWeight.bold,
						focusBoxShadow: 'none',
					},

					rules: {
						'.p-FieldLabel': {
							'font-weight': defaultTheme.fontWeight.medium,
						},
					},
				},
			},
		});

		session = checkout.session();

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		checkout.createElement('payment').mount(checkoutContainer!);
	});
</script>

<Metadata title="Checkout - Greenwich" />

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight mb-4 lg:text-5xl">Checkout</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div>
			{#snippet itemSummary()}
				{#each $cart as cartItem}
					{#if 'isSandwich' in cartItem}
						<div class="flex items-center justify-center flex-row">
							<div class="flex items-center min-w-16">
								<enhanced:img
									src="$lib/images/custom-sandwich.jpeg"
									alt="Custom sandwich"
									class="size-16 aspect-square object-cover rounded-lg"
								/>
							</div>
							<div class="flex flex-row md:items-center w-full ml-4 gap-2">
								<div class="w-full">
									{cartItem.description}
									<p class="text-sm text-gray-500">{cartItem.quantity} at ${cartItem.price} each</p>
								</div>

								<div class="grow"></div>

								<p class="ml-4 text-lg font-semibold">${cartItem.price * cartItem.quantity}</p>
							</div>
						</div>
					{:else}
						{@const item = data.products.find((currentItem) => currentItem.id === cartItem.id)}
						{#if item}
							<div class="flex items-center justify-center flex-row">
								<div class="flex items-center min-w-16">
									<img
										src={item.image_url}
										alt={item.name}
										class="size-16 aspect-square object-cover rounded-lg"
									/>
								</div>
								<div class="flex flex-row md:items-center w-full ml-4 gap-2">
									<div class="w-full">
										{item.name}
										<p class="text-sm text-gray-500">{cartItem.quantity} at ${item.price} each</p>
									</div>

									<div class="grow"></div>

									<p class="ml-4 text-lg font-semibold">${item.price * cartItem.quantity}</p>
								</div>
							</div>
						{/if}
					{/if}
				{/each}
			{/snippet}
			<Card.Root>
				<Card.Header>
					<Card.Title>Order summary</Card.Title>
				</Card.Header>
				<Card.Content>
					<Collapsible.Root class="md:hidden">
						<Collapsible.Trigger
							class={buttonVariants({
								variant: 'ghost',
								size: 'sm',
								class: 'flex w-full items-center p-2',
							})}
						>
							Items
							<div class="grow"></div>
							<ChevronsUpDown />
						</Collapsible.Trigger>
						<Collapsible.Content class="px-2 pt-4 space-y-4">
							{@render itemSummary()}
						</Collapsible.Content>
					</Collapsible.Root>
					<div class="hidden md:block space-y-4">
						{@render itemSummary()}
					</div>
				</Card.Content>
				{#if session}
					<Card.Footer class="flex flex-col gap-2 items-start">
						<div class="flex flex-row justify-between w-full">
							<b class="font-semibold">Subtotal</b>
							<p>
								{currencyFormatter.format(
									session.total.subtotal / 100 +
										$cart
											.filter((item) => 'isSandwich' in item)
											.reduce((accum, item) => accum + item.price * item.quantity, 0),
								)}
							</p>
						</div>
						{#if session.total.discount > 0}
							<div class="flex flex-row justify-between w-full">
								<b class="font-semibold">Discount</b>
								<p>
									-{currencyFormatter.format(
										session.total.discount / 100 +
											$cart
												.filter((item) => 'isSandwich' in item)
												.reduce((accum, item) => accum + item.price * item.quantity, 0),
									)}
								</p>
							</div>
						{/if}
						<div class="flex flex-row justify-between w-full">
							<b class="font-semibold">Tax</b>
							<p>{currencyFormatter.format(session.total.taxExclusive / 100)}</p>
						</div>
						<hr class="w-full" />
						<div class="flex flex-row justify-between w-full">
							<h4 class="scroll-m-20 text-xl font-bold tracking-tight">Total</h4>
							<strong>
								{currencyFormatter.format(
									session.total.total / 100 +
										(appliedPromoCode === 'TSA'
											? 0
											: $cart
													.filter((item) => 'isSandwich' in item)
													.reduce((accum, item) => accum + item.price * item.quantity, 0)),
								)}
							</strong>
						</div>
					</Card.Footer>
				{/if}
			</Card.Root>
		</div>
		<div class="space-y-4">
			<div>
				<Label for="name">Name</Label>
				<Input id="name" placeholder="Julius Caesar" type="text" bind:value={name} />
			</div>
			<div>
				<Label for="email">Email</Label>
				<Input
					id="email"
					placeholder="email@example.com"
					type="email"
					bind:value={email}
					onchange={() => {
						emailErrors = '';
					}}
					onblur={async () => {
						const result = await checkout.updateEmail(email);
						if (result.type === 'error') {
							emailErrors = result.error.message;
						}
					}}
				/>
				<div class="text-destructive">
					{emailErrors}
				</div>
				<strong>Note:</strong> If you want to see the receipt, use an email address you have access
				to (or a temporary account). If you just want to bypass this screen, use
				<strong>bread@jhstsa.org</strong>
			</div>

			<div class="mb-4">
				<Label>Location</Label>
				<Select.Root type="single" bind:value={selectedLocation.current}>
					<Select.Trigger>
						{locationTriggerContent}
					</Select.Trigger>
					<Select.Content>
						{#each locations as location}
							<Select.Item value={location.value} label={location.label}>
								{location.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div bind:this={checkoutContainer}></div>

			<div>
				<Label for="promoCode">Promo Code</Label>
				<div class="flex items-center space-x-2">
					<Input type="text" bind:value={promoCode} placeholder="TSA" />
					{#if appliedPromoCode.length > 0}
						<Button
							variant="outline"
							onclick={async () => {
								promoCodeErrors = '';
								const result = await checkout.removePromotionCode();
								if (result.type === 'error') {
									promoCodeErrors = result.error.message;
								} else {
									appliedPromoCode = '';
									session = checkout.session();
								}
							}}
						>
							remove
						</Button>
					{:else}
						<Button
							onclick={async () => {
								promoCodeErrors = '';
								const result = await checkout.applyPromotionCode(promoCode);
								if (result.type === 'error') {
									promoCodeErrors = result.error.message;
								} else {
									appliedPromoCode = promoCode;
									session = checkout.session();
								}
							}}
						>
							Apply
						</Button>
					{/if}
				</div>
				<div class="text-red-500">{promoCodeErrors}</div>
				<strong>Note:</strong> Please use the promo code "<strong>TSA</strong>" for a 100% discount.
				This site will actually charge you otherwise. Use Cash App Pay or Amazon Pay to bypass the
				actual payment requirements.
			</div>
			<div>
				<Button
					id="submit"
					onclick={async () => {
						submitErrors = '';
						if (!email) {
							emailErrors = 'Email is required';
							submitErrors = 'Please fix the errors above';
							return;
						}
						if (!selectedLocation.current) {
							submitErrors = 'Location is required';
							return;
						}
						if (
							!(await fancyConfirm(
								'Are you sure?',
								'By continuing, you understand that you will not be getting any bread or anything purchased on this site. If you put in actual payment information without a coupon code, you will actually be charged money.',
							))
						) {
							return;
						}
						const result = await checkout.confirm();
						if (result.type === 'error') {
							submitErrors = result.error.message;
						}
					}}
				>
					Submit
				</Button>
				<div class="text-destructive">{submitErrors}</div>
			</div>
		</div>
	</div>
</div>
