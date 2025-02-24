<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div class="container my-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Join Our Waitlist</h1>

	<div class="mt-8 max-w-2xl">
		<Card.Root>
			<Card.Header>
				<Card.Title>Coming Soon</Card.Title>
				<Card.Description>
					Our physical location is opening soon! Join our waitlist to be notified when we open.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="text-muted-foreground mb-4">
					We're working hard to bring you the best bread experience. In the meantime, you can order
					online!
				</p>
				<div class="space-y-4">
					<div>
						<Label for="email">Email</Label>
						<Input type="email" id="email" placeholder="bread@example.com" />
					</div>
					<Button>Join Waitlist</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
