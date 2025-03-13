<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from './utils';
	import SandwichIcon from './icons/SandwichIcon.svelte';

	interface Props {
		textClass?: string;
		iconClass?: string;
		bg?: 'green' | 'white';
	}
	let {
		ref = $bindable(),
		class: className,
		textClass,
		iconClass,
		...props
	}: Props & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div class={cn('flex items-center gap-3 w-fit', className)} bind:this={ref} {...props}>
	<SandwichIcon class={cn('size-10', iconClass)} animated={false} />
	<span
		class={cn(
			'font-bold text-2xl no-underline bg-gradient-to-r from-white to-white/80 bg-clip-text',
			textClass,
		)}>Greenwich</span
	>
</div>
