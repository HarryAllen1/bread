<script lang="ts">
	import { afterNavigate, invalidate } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import Confirm from '$lib/Confirm.svelte';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';

	interface Props {
		children: Snippet;
		data: PageData;
	}

	let { children, data }: Props = $props();
	let { session, supabase } = $derived(data);

	afterNavigate(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 50);
	});

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div>
	<div class="min-h-screen flex flex-col bg-background text-foreground">
		<Navbar />

		<main class="flex-1 relative">
			{@render children()}
		</main>

		<Footer />
	</div>
</div>

<Confirm />
<Toaster theme="light" />
