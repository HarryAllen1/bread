<script lang="ts">
	interface Props {
		title: string;
		description?: string;
	}
	let { title, description }: Props = $props();
</script>

<svelte:head>
	<title>
		{title} - Greenwich
	</title>
	<meta property="og:title" content="{title} - Greenwich" />

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}
</svelte:head>
