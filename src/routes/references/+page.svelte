<svelte:head>
	<title>references - bread</title>
</svelte:head>

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">reference page</h1>

	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4"
	>
		statement of originality
	</h2>

	<p>
		This site was built using <a href="https://svelte.dev" target="_blank">Svelte</a> and
		<a href="https://svelte.dev/docs/kit/introduction" target="_blank">SvelteKit</a>. We used UI
		components from <a href="https://www.shadcn-svelte.com/">shadcn-svelte</a> which were modified and
		themed for this site.
	</p>

	<p class="leading-7 [&:not(:first-child)]:mt-6">
		<a href="/copyright-checklist.pdf" target="_blank">Student Copyright Checklist</a>
	</p>
	<p class="leading-7 [&:not(:first-child)]:mt-6">
		<a href="/work-log.pdf" target="_blank">Work Log</a>
	</p>

	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4"
	>
		sources
	</h2>

	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">site-wide</h3>

	<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
		<li>
			Icons: <a href="https://phosphoricons.com/" target="_blank">Phosphor Icons</a>
		</li>
	</ul>

	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">home</h3>

	<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
		<li>
			<a href="https://www.pexels.com/photo/brown-bread-on-wooden-tray-6605301/">Challah bread</a>
		</li>
		<li>
			<a href="https://www.pexels.com/photo/a-flatlay-of-a-freshly-baked-banana-bread-6829493/"
				>Banana bread</a
			>
		</li>
	</ul>
</div>

<style>
	a {
		@apply text-primary font-medium underline underline-offset-4;
	}
</style>
