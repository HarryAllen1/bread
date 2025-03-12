<script lang="ts">
	import { Salad, Leaf, Utensils } from 'lucide-svelte';
</script>

<div class="max-w-5xl mx-auto px-4 py-12">
	<div class="text-center mb-12 relative z-20">
		<h2
			class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-primary p-6 rounded-lg inline-block backdrop-blur-xs border-2 border-primary/70 relative text-white shadow-lg"
		>
			<span class="relative z-10">Why Choose Greenwich</span>
			<div class="absolute -top-6 -left-6 animate-spin-slow opacity-20">
				<Leaf class="size-12 text-white" />
			</div>
			<div
				class="absolute -bottom-6 -right-6 animate-spin-slow opacity-20"
				style="animation-duration: 15s; animation-direction: reverse;"
			>
				<Salad class="size-12 text-white" />
			</div>
		</h2>
		<p
			class="text-lg text-foreground max-w-2xl mx-auto leading-relaxed bg-background/90 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-primary/70 shadow-lg font-medium"
		>
			Our culinary approach combines traditional techniques with innovative flavor profiles to
			create exceptional vegetarian sandwiches that satisfy discerning palates.
		</p>
	</div>

	<div class="grid sm:grid-cols-3 gap-8">
		<div
			class="bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl animate-card-1"
		>
			<div class="relative">
				<Salad class="size-12 text-primary my-2 transform rotate-12 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Premium Ingredients</h3>
			<p class="text-foreground font-medium">
				We source organic, locally-grown produce daily to ensure optimal freshness and flavor in
				every creation.
			</p>
		</div>
		<div
			class="bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl animate-card-2"
		>
			<div class="relative">
				<Leaf class="size-12 text-primary my-2 transform -rotate-12 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Plant-Forward Cuisine</h3>
			<p class="text-foreground font-medium">
				Our vegetarian menu features nutrient-dense, protein-rich options crafted to satisfy even
				the most discerning palates.
			</p>
		</div>
		<div
			class="bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl animate-card-3"
		>
			<div class="relative">
				<Utensils class="size-12 text-primary my-2 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Artisanal Preparation</h3>
			<p class="text-foreground font-medium">
				Each sandwich is meticulously crafted to order, ensuring perfect texture, balance, and
				presentation with every serving.
			</p>
		</div>
	</div>
</div>

<style>
	@keyframes spin-slow {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes card-pop {
		0% {
			opacity: 0;
			transform: scale(0.8) translateY(20px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.animate-card-1 {
		animation: card-pop 0.6s ease-out forwards;
		animation-delay: 0.2s;
		opacity: 0;
	}

	.animate-card-2 {
		animation: card-pop 0.6s ease-out forwards;
		animation-delay: 0.4s;
		opacity: 0;
	}

	.animate-card-3 {
		animation: card-pop 0.6s ease-out forwards;
		animation-delay: 0.6s;
		opacity: 0;
	}
</style>
