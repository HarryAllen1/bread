<script lang="ts">
	import { Sandwich, Salad } from 'lucide-svelte';
</script>

<div
	class="w-full bg-gradient-to-r from-primary/10 to-primary/20 py-16 md:py-24 relative mt-16 md:mt-24 overflow-hidden"
>
	<!-- Animated sandwich icons floating in background -->
	<div class="absolute inset-0 z-0 opacity-10">
		<div class="absolute top-1/4 left-1/4 animate-float" style="animation-duration: 18s;">
			<Sandwich class="size-32 text-primary" />
		</div>
		<div
			class="absolute bottom-1/4 right-1/4 animate-float"
			style="animation-duration: 22s; animation-delay: 3s;"
		>
			<Salad class="size-32 text-primary" />
		</div>
		<div
			class="absolute top-3/4 left-2/3 animate-float"
			style="animation-duration: 20s; animation-delay: 1.5s;"
		>
			<Sandwich class="size-32 text-primary" />
		</div>
	</div>

	<div class="container max-w-5xl mx-auto px-4 relative z-10">
		<div class="text-center mb-12 md:mb-16 relative z-20">
			<h2
				class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary/80 to-primary p-6 rounded-lg inline-block backdrop-blur-xs border-2 border-primary/50 relative text-white"
			>
				<span class="relative z-10">Culinary Offerings</span>
				<div
					class="absolute -top-6 -right-6 animate-spin-slow opacity-20"
					style="animation-duration: 20s;"
				>
					<Sandwich class="size-12 text-white" />
				</div>
			</h2>
			<p
				class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-primary/50"
			>
				From signature vegetarian creations to innovative seasonal specialties, we're dedicated to
				providing an exceptional plant-based dining experience.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 gap-8 md:gap-12">
			<div
				class="bg-white rounded-lg shadow-xl p-6 hover:bg-white/80 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl animate-in fade-in-50 slide-in-from-left-8 duration-700"
			>
				<Sandwich class="size-16 text-primary mb-6 animate-bounce-slow" />
				<h3 class="text-2xl font-bold mb-4">Signature Sandwiches</h3>
				<p class="text-muted-foreground text-lg leading-relaxed">
					Explore our collection of meticulously crafted vegetarian sandwiches, featuring
					Mediterranean-inspired creations and contemporary interpretations of classic favorites.
				</p>
			</div>
			<div
				class="bg-white rounded-lg shadow-xl p-6 hover:bg-white/80 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl animate-in fade-in-50 slide-in-from-right-8 duration-700"
			>
				<Salad
					class="size-16 text-primary mb-6 animate-bounce-slow"
					style="animation-delay: 0.5s;"
				/>
				<h3 class="text-2xl font-bold mb-4">Artisanal Accompaniments</h3>
				<p class="text-muted-foreground text-lg leading-relaxed">
					Complement your meal with our selection of seasonal salads, house-made chips, and other
					thoughtfully prepared accompaniments.
				</p>
			</div>
		</div>

		<div class="mt-12 text-center">
			<a href="/menu" class="text-lg text-white bg-primary p-4 rounded-lg inline-block shadow-lg">
				Now accepting online orders
			</a>
		</div>
	</div>
</div>
