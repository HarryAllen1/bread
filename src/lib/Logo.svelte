<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from './utils';
	import SandwichIcon from './icons/SandwichIcon.svelte';

	interface Props {
		textClass?: string;
		iconClass?: string;
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
	<SandwichIcon type="classic" class={cn('size-10', iconClass)} animated={true} />
	<span
		class={cn(
			'font-bold text-2xl no-underline bg-gradient-to-r from-white to-white/80 bg-clip-text',
			textClass,
		)}>Greens</span
	>
</div>
