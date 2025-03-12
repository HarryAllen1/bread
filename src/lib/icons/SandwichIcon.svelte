<script lang="ts">
	import type { SandwichType } from '$lib/types';
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props {
		type?: SandwichType;
		size?: 'sm' | 'md' | 'lg';
		animated?: boolean;
	}

	let {
		ref = $bindable(),
		type = 'classic',
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
	class={cn('sandwich-icon', type, sizeMap[size], animated && 'animate-float', className)}
	bind:this={ref}
	{...props}
></div>

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

	/* Classic sandwich */
	.sandwich-icon.classic {
		background: #f8e3a3;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.sandwich-icon.classic::before {
		content: '';
		position: absolute;
		top: 25%;
		left: 10%;
		width: 80%;
		height: 50%;
		background: linear-gradient(
			to bottom,
			#8d6e63 10%,
			#4caf50 10%,
			#4caf50 20%,
			#f44336 20%,
			#f44336 30%,
			#ffeb3b 30%,
			#ffeb3b 40%,
			#4caf50 40%,
			#4caf50 50%,
			#8d6e63 50%
		);
	}

	/* Wrap */
	.sandwich-icon.wrap {
		background: #e6c78c;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.sandwich-icon.wrap::before {
		content: '';
		position: absolute;
		top: 20%;
		left: 20%;
		width: 60%;
		height: 60%;
		background: linear-gradient(
			45deg,
			#4caf50 0%,
			#4caf50 20%,
			#f44336 20%,
			#f44336 40%,
			#ffeb3b 40%,
			#ffeb3b 60%,
			#8d6e63 60%,
			#8d6e63 100%
		);
		border-radius: 40%;
	}

	/* Veggie */
	.sandwich-icon.veggie {
		background: #f5f5dc;
		border-radius: 5px 5px 15px 15px;
		position: relative;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.sandwich-icon.veggie::before {
		content: '';
		position: absolute;
		top: 20%;
		left: 10%;
		width: 80%;
		height: 60%;
		background: linear-gradient(
			to bottom,
			#4caf50 0%,
			#4caf50 25%,
			#8bc34a 25%,
			#8bc34a 50%,
			#cddc39 50%,
			#cddc39 75%,
			#4caf50 75%,
			#4caf50 100%
		);
	}

	/* Avocado Toast */
	.sandwich-icon.avocado {
		background: #f5f5dc;
		border-radius: 5px;
		position: relative;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.sandwich-icon.avocado::before {
		content: '';
		position: absolute;
		top: 20%;
		left: 10%;
		width: 80%;
		height: 60%;
		background: linear-gradient(to bottom, #8d6e63 0%, #8d6e63 40%, #689f38 40%, #689f38 100%);
	}

	.sandwich-icon.avocado::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 30%;
		width: 40%;
		height: 20%;
		background: radial-gradient(circle, #33691e 30%, #689f38 70%);
		border-radius: 50%;
	}

	/* Club Sandwich */
	.sandwich-icon.club {
		background: #f5f5dc;
		border-radius: 5px;
		position: relative;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.sandwich-icon.club::before {
		content: '';
		position: absolute;
		top: 10%;
		left: 5%;
		width: 90%;
		height: 80%;
		background: linear-gradient(
			to bottom,
			#f5f5dc 0%,
			#f5f5dc 20%,
			#4caf50 20%,
			#4caf50 25%,
			#f44336 25%,
			#f44336 30%,
			#ffeb3b 30%,
			#ffeb3b 35%,
			#f5f5dc 35%,
			#f5f5dc 55%,
			#4caf50 55%,
			#4caf50 60%,
			#8bc34a 60%,
			#8bc34a 65%,
			#f5f5dc 65%,
			#f5f5dc 100%
		);
	}

	/* Sub Sandwich */
	.sandwich-icon.sub {
		background: #f5f5dc;
		border-radius: 30% / 100%;
		transform: rotate(-10deg);
		position: relative;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.sandwich-icon.sub::before {
		content: '';
		position: absolute;
		top: 30%;
		left: 10%;
		width: 80%;
		height: 40%;
		background: linear-gradient(
			to bottom,
			#4caf50 0%,
			#4caf50 20%,
			#f44336 20%,
			#f44336 40%,
			#ffeb3b 40%,
			#ffeb3b 60%,
			#8bc34a 60%,
			#8bc34a 80%,
			#4caf50 80%,
			#4caf50 100%
		);
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
