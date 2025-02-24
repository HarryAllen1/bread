<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Build Your Own Sandwich
	</h1>

	<div class="mt-8 max-w-2xl">
		<Card.Root>
			<Card.Header>
				<Card.Title>Coming Soon</Card.Title>
				<Card.Description>
					Our custom sandwich builder is still in development. Check back soon!
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="text-muted-foreground">
					In the meantime, check out our pre-made sandwiches and other delicious bread options in
					our menu.
				</p>
			</Card.Content>
			<Card.Footer>
				<Button href="/menu">Browse Menu</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
