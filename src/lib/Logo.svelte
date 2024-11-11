<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from './utils';
	import Icon from './images/icon.svg';

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

<div class={cn('flex flex-col items-center', className)} bind:this={ref} {...props}>
	<img src={Icon} class={iconClass} alt="bread" />
	<span class={cn('font-bold no-underline', textClass)}>bread</span>
</div>
