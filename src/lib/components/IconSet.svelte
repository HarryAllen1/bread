<script lang="ts">
	import SandwichIcon from '$lib/icons/SandwichIcon.svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		animated?: boolean;
	}

	let { size = 'md', animated = false }: Props = $props();
</script>

<div class="grid grid-cols-3 gap-4">
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="classic" {size} {animated} />
		<span class="text-sm text-muted-foreground">Classic</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="wrap" {size} {animated} />
		<span class="text-sm text-muted-foreground">Wrap</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="veggie" {size} {animated} />
		<span class="text-sm text-muted-foreground">Veggie</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="avocado" {size} {animated} />
		<span class="text-sm text-muted-foreground">Avocado</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="club" {size} {animated} />
		<span class="text-sm text-muted-foreground">Club</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<SandwichIcon type="sub" {size} {animated} />
		<span class="text-sm text-muted-foreground">Sub</span>
	</div>
</div>
