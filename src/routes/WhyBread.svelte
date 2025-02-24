<script lang="ts">
	import { CakeSlice, Croissant, Wheat } from 'lucide-svelte';
</script>

<div class="mt-32 max-w-4xl mx-auto">
	<div class="text-center mb-20 relative z-20">
		<h2
			class="scroll-m-20 text-4xl font-bold tracking-tight sm:text-5xl mb-8 bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
		>
			Why Choose Bread?
		</h2>
		<p
			class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
		>
			Bread Transcends Cultures And Brings People Together. Our Mission Is To Make This Timeless
			Staple Accessible To Everyone Through Thoughtful, Vegetarian-Friendly Options.
		</p>
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
		<div class="modern-card hover:bg-primary/5">
			<div class="relative">
				<CakeSlice class="size-12 text-primary mb-4 transform rotate-12 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Artisanal Quality</h3>
			<p class="text-muted-foreground text-lg">
				Handcrafted With Care Using Traditional Techniques And Premium Ingredients.
			</p>
		</div>
		<div class="modern-card hover:bg-primary/5">
			<div class="relative">
				<Croissant class="size-12 text-primary mb-4 transform -rotate-12 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Vegetarian Focus</h3>
			<p class="text-muted-foreground text-lg">
				Thoughtfully Created Meat-Free Options That Don't Compromise On Taste.
			</p>
		</div>
		<div class="modern-card hover:bg-primary/5">
			<div class="relative">
				<Wheat class="size-12 text-primary mb-4 animate-float" />
			</div>
			<h3 class="text-xl font-bold mb-3">Fresh Daily</h3>
			<p class="text-muted-foreground text-lg">
				Baked Fresh Every Morning For The Best Possible Quality And Taste.
			</p>
		</div>
	</div>
</div>
