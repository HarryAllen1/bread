<script lang="ts">
	import { Heading as Bread, Sandwich } from 'lucide-svelte';
</script>

<div class="w-full bg-primary/5 py-40 relative mt-32">
	<div class="container max-w-5xl mx-auto">
		<div class="text-center mb-20 relative z-20">
			<h2
				class="scroll-m-20 text-4xl font-bold tracking-tight sm:text-5xl mb-8 bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
			>
				Our Offerings
			</h2>
			<p
				class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed bg-background/95 px-6 py-4 rounded-lg inline-block backdrop-blur-xs border-2 border-blue-500/50"
			>
				From Classic Sourdough To Innovative Sandwich Creations, We're Dedicated To Bringing You The
				Finest Bread Experience.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 gap-12">
			<div class="modern-card hover:bg-white/80">
				<Bread class="size-16 text-primary mb-6" />
				<h3 class="text-2xl font-bold mb-4">Artisanal Breads</h3>
				<p class="text-muted-foreground text-lg leading-relaxed">
					Discover Our Selection Of Traditionally Crafted Breads, From Crusty Baguettes To Soft
					Challah.
				</p>
			</div>
			<div class="modern-card hover:bg-white/80">
				<Sandwich class="size-16 text-primary mb-6" />
				<h3 class="text-2xl font-bold mb-4">Custom Sandwiches</h3>
				<p class="text-muted-foreground text-lg leading-relaxed">
					Create Your Perfect Vegetarian Sandwich With Our Fresh Ingredients And Signature Breads.
				</p>
			</div>
		</div>

		<div class="mt-16 text-center">
			<p class="text-lg text-muted-foreground">
				Currently Accepting Online Orders While Our Physical Location Is Being Prepared.
			</p>
		</div>
	</div>
</div>
