<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { cart } from '$lib/cart';
	import { selectedLocation } from '../checkout/state.svelte';
	import Metadata from '$lib/Metadata.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	onMount(() => {
		$cart = [];
	});
</script>

<Metadata title="Thank you - Greenwich" />

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Thank you!</h1>
	<p class="leading-7 not-first:mt-6">
		Thank you for your purchase! A receipt has been sent to your email at {data.email}. If you
		actually paid for something on this site, first off, why, and also, we'll refund you shortly
		because you aren't getting anything.
	</p>
	{#if selectedLocation.current}
		<p class="leading-7 not-first:mt-6">
			Your order will be ready for pickup at our <b>{selectedLocation.current}</b> location in roughly
			20 minutes.
		</p>
	{/if}
	<p class="leading-7 not-first:mt-6">
		Please note that we cannot refund the Stripe transaction fee, which is roughly $0.50.
	</p>
</div>
