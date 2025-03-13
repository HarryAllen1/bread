<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import iconGreen from '$lib/images/icon-green.svg';
	import iconWhite from '$lib/images/icon.svg';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		animated?: boolean;
		bg?: 'green' | 'white';
	}

	let {
		ref = $bindable(),
		size = 'md',
		animated = false,
		class: className,
		bg,
		...props
	}: Props & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const sizeMap = {
		sm: 'size-6',
		md: 'size-10',
		lg: 'size-16',
	};
</script>

<div
	class={cn('sandwich-icon', sizeMap[size], animated && 'animate-float', className)}
	bind:this={ref}
	{...props}
>
	<img src={bg === 'green' ? iconGreen : iconWhite} alt="" />
</div>

<style>
	.sandwich-icon {
		position: relative;
		display: inline-block;
		transition: transform 0.3s ease;
		filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
	}

	.sandwich-icon:hover {
		transform: translateY(-2px);
	}

	.animate-float {
		animation: sandwichFloat 6s ease-in-out infinite;
	}

	@keyframes sandwichFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
