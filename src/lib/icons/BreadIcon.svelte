<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type BreadType = 'loaf' | 'bagel' | 'croissant' | 'baguette' | 'roll' | 'pretzel';

	interface Props {
		type?: BreadType;
		size?: 'sm' | 'md' | 'lg';
		animated?: boolean;
	}

	let {
		ref = $bindable(),
		type = 'loaf',
		size = 'md',
		animated = false,
		class: className,
		...props
	}: Props & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const sizeMap = {
		sm: 'size-6',
		md: 'size-10',
		lg: 'size-16',
	};
</script>

<div
	class={cn('bread-icon', type, sizeMap[size], animated && 'animate-float', className)}
	bind:this={ref}
	{...props}
></div>

<style>
	.bread-icon {
		position: relative;
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.bread-icon:hover {
		transform: translateY(-2px);
	}

	/* Loaf bread */
	.bread-icon.loaf {
		background: #8b4513;
		border: 2px solid #5c2c0c;
		border-radius: 30% 30% 10% 10%;
		box-shadow:
			inset -5px -5px 15px rgba(0, 0, 0, 0.3),
			2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.bread-icon.loaf::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 75%;
		height: 60%;
		background:
			radial-gradient(circle at 10% 30%, #5c2c0c 1.5px, transparent 1.5px),
			radial-gradient(circle at 30% 20%, #5c2c0c 1.5px, transparent 1.5px),
			radial-gradient(circle at 50% 30%, #5c2c0c 1.5px, transparent 1.5px),
			radial-gradient(circle at 25% 40%, #5c2c0c 1.5px, transparent 1.5px),
			radial-gradient(circle at 45% 35%, #5c2c0c 1.5px, transparent 1.5px);
	}

	/* Bagel */
	.bread-icon.bagel {
		background: #c68e17;
		border: 2px solid #8b4513;
		border-radius: 50%;
		box-shadow:
			inset 0 0 15px rgba(0, 0, 0, 0.3),
			2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.bread-icon.bagel::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 45%;
		height: 45%;
		background: #8b4513;
		border-radius: 50%;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
	}

	/* Croissant */
	.bread-icon.croissant {
		background: #deb887;
		border: none;
		clip-path: path('M10,25 Q15,10 30,5 Q45,0 45,15 Q45,30 30,30 Q15,30 10,25 Z');
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.bread-icon.croissant::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			transparent 0%,
			rgba(255, 255, 255, 0.2) 50%,
			transparent 100%
		);
	}

	/* Baguette */
	.bread-icon.baguette {
		background: #e6c78c;
		border: 2px solid #b38b4d;
		border-radius: 30% / 100%;
		transform: rotate(45deg);
		box-shadow:
			inset -3px -3px 10px rgba(0, 0, 0, 0.2),
			2px 2px 5px rgba(0, 0, 0, 0.1);
	}

	.bread-icon.baguette::before {
		content: '';
		position: absolute;
		top: 20%;
		left: 10%;
		width: 80%;
		height: 60%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			#b38b4d 2%,
			transparent 4%,
			transparent 20%,
			#b38b4d 22%,
			transparent 24%,
			transparent 40%,
			#b38b4d 42%,
			transparent 44%,
			transparent 60%,
			#b38b4d 62%,
			transparent 64%,
			transparent 80%,
			#b38b4d 82%,
			transparent 84%
		);
	}

	/* Roll */
	.bread-icon.roll {
		background: #e6c78c;
		border: 2px solid #b38b4d;
		border-radius: 50%;
		box-shadow:
			inset -3px -3px 10px rgba(0, 0, 0, 0.2),
			2px 2px 5px rgba(0, 0, 0, 0.1);
	}

	.bread-icon.roll::before {
		content: '';
		position: absolute;
		top: 30%;
		left: 30%;
		width: 40%;
		height: 40%;
		background: radial-gradient(circle, #b38b4d 0%, transparent 70%);
	}

	/* Pretzel */
	.bread-icon.pretzel {
		background: #b38b4d;
		border: 2px solid #8b4513;
		clip-path: path(
			'M25,10 C35,10 35,20 25,20 C15,20 15,30 25,30 C35,30 35,40 25,40 C15,40 15,30 25,30 C35,30 35,20 25,20 C15,20 15,10 25,10 Z'
		);
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.bread-icon.pretzel::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 30%);
	}

	.animate-float {
		animation: breadFloat 6s ease-in-out infinite;
	}

	@keyframes breadFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
