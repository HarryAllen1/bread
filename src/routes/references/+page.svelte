<svelte:head>
	<title>References - bread</title>
</svelte:head>

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">References</h1>

	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4"
	>
		Statement of Originality
	</h2>

	<p class="leading-7 not-first:mt-6">
		This website was developed using <a href="https://svelte.dev" target="_blank">Svelte</a> and
		<a href="https://svelte.dev/docs/kit/introduction" target="_blank">SvelteKit</a>. The user
		interface components were sourced from
		<a href="https://www.shadcn-svelte.com/">shadcn-svelte</a>
		and have been customized to match our design aesthetic. Payment processing is handled securely through
		<a href="https://stripe.com" target="_blank">Stripe</a>, with only the card input section being
		provided by their service for maximum security.
	</p>

	<p class="leading-7 not-first:mt-6">
		<a href="/copyright-checklist.pdf" target="_blank">Student Copyright Checklist</a>
	</p>
	<p class="leading-7 not-first:mt-6">
		<a href="/work-log.pdf" target="_blank">Work Log</a>
	</p>

	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4"
	>
		Sources
	</h2>

	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Site-Wide Elements</h3>

	<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
		<li>
			Icon Library: <a href="https://lucide.dev/" target="_blank">Lucide</a>
		</li>
	</ul>

	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Homepage Assets</h3>

	<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
		<li>
			<a href="https://www.pexels.com/photo/brown-bread-on-wooden-tray-6605301/"
				>Challah Bread Image</a
			>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/a-flatlay-of-a-freshly-baked-banana-bread-6829493/">
				Banana Bread Image
			</a>
		</li>
	</ul>

	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Product Photography</h3>

	<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
		<li>
			<a href="https://www.pexels.com/photo/brown-bread-on-wooden-tray-6605301/">Challah Bread</a>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/slice-of-bread-1586947/">Multigrain Bread</a>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/a-flatlay-of-a-freshly-baked-banana-bread-6829493/">
				Banana Bread
			</a>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/a-pita-bread-over-a-ceramic-tile-6419738/">
				Pita Bread
			</a>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/six-baked-breads-461060/">Baguette</a>
		</li>
		<li>
			<a
				href="https://www.pexels.com/photo/plate-with-delicious-breakfast-on-wooden-table-5490385/"
			>
				Sandwich
			</a>
		</li>
	</ul>
</div>

<style>
	@reference "../../app.css";

	a {
		@apply text-primary font-medium underline underline-offset-4;
	}
</style>
