<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import BadgeCheck from 'lucide-svelte/icons/badge-check';
	import Camera from 'lucide-svelte/icons/camera';
	import Star from 'lucide-svelte/icons/star';
	import StarHalf from 'lucide-svelte/icons/star-half';
	import { toast } from 'svelte-sonner';

	interface Props {
		productName: string;
	}
	let { productName }: Props = $props();

	// Sample reviews data
	let reviews = $state([
		{
			id: 1,
			author: 'Jane Smith',
			rating: 5,
			date: '2024-12-15',
			content:
				`This ${productName.toLowerCase()} is absolutely perfect! The crust is crispy and the inside is soft and chewy. Will definitely buy again when visiting Greenwich next time.`,
			verified: true,
			helpful: 17,
			images: [
				'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?fm=jpg&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVlbGluZyUyMGdvb2R8ZW58MHx8MHx8fDA%3D',
			],
		},
		{
			id: 2,
			author: 'Michael Johnson',
			rating: 4,
			date: '2024-11-28',
			content:
				"Great flavor and texture. The only reason I'm not giving 5 stars is because it went stale a bit quicker than expected.",
			verified: true,
			helpful: 5,
			images: [],
		},
		{
			id: 3,
			author: 'Justin Williams',
			rating: 4.5,
			date: '2024-12-02',
			content:
				`Delicious ${productName.toLowerCase()} with a perfect balance of tanginess. My family loves it for breakfast. I give it a thumbs up!`,
			verified: false,
			helpful: 3,
			images: [
				
				'https://images.unsplash.com/photo-1579047917338-a6a69144fe63?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3',
			],
		},
	]);

	let newReview = $state({
		rating: 0,
		content: '',
		images: [] as string[],
	});

	let hoveredRating = $state(0);
	let isSubmitting = $state(false);
	let showReviewForm = $state(false);
	let sortBy = $state('newest');

	const averageRating = (): string => {
		if (reviews.length === 0) return '0';
		const sum = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
		return (sum / reviews.length).toFixed(1);
	};

	const ratingDistribution = (): number[] => {
		const distribution = [0, 0, 0, 0, 0];
		for (const review of reviews) {
			const index = Math.floor(review.rating) - 1;
			if (index >= 0 && index < 5) {
				distribution[index]++;
			}
		}
		return distribution.reverse(); // 5 stars first
	};

	const handleRatingHover = (rating: number): void => {
		hoveredRating = rating;
	};

	const handleRatingLeave = (): void => {
		hoveredRating = 0;
	};

	const handleRatingClick = (rating: number): void => {
		newReview.rating = rating;
	};

	const handleImageUpload = (event: Event): void => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			// In a real app, you would upload the file to a server
			// For this demo, we'll just use a placeholder
			newReview.images.push(
				'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
			);
			toast.success('Image uploaded successfully');
		}
	};

	const submitReview = (): void => {
		if (newReview.rating === 0) {
			toast.error('Please select a rating');
			return;
		}

		if (newReview.content.trim() === '') {
			toast.error('Please write a review');
			return;
		}

		isSubmitting = true;

		// Simulate API call
		setTimeout(() => {
			const newReviewObject = {
				id: reviews.length + 1,
				author: 'You',
				rating: newReview.rating,
				date: new Date().toISOString().split('T')[0],
				content: newReview.content,
				verified: true,
				helpful: 0,
				images: newReview.images,
			};

			reviews = [newReviewObject, ...reviews];

			// Reset form
			newReview = {
				rating: 0,
				content: '',
				images: [],
			};

			isSubmitting = false;
			showReviewForm = false;

			toast.success('Review submitted successfully');
		}, 1000);
	};

	const markHelpful = (reviewId: number): void => {
		reviews = reviews.map((review) => {
			if (review.id === reviewId) {
				return { ...review, helpful: review.helpful + 1 };
			}
			return review;
		});

		toast.success('Review marked as helpful');
	};
</script>

<div class="review-system bg-white rounded-lg shadow-md p-6 border border-gray-200">
	<h3 class="text-xl font-bold mb-4 border-b pb-2">Customer Reviews</h3>

	<div class="flex flex-col md:flex-row gap-6 mb-8">
		<!-- Rating summary -->
		<div class="md:w-1/3">
			<div class="text-center mb-4">
				<div class="text-5xl font-bold">{averageRating()}</div>
				<div class="flex justify-center my-2">
					{#each { length: 5 }, i}
						{#if i < Math.floor(Number(averageRating()))}
							<Star class="text-yellow-400 fill-yellow-400 size-5" />
						{:else if i === Math.floor(Number(averageRating())) && Number(averageRating()) % 1 >= 0.5}
							<StarHalf class="text-yellow-400 fill-yellow-400 size-5" />
						{:else}
							<Star class="text-gray-300 size-5" />
						{/if}
					{/each}
				</div>
				<div class="text-sm text-gray-600">Based on {reviews.length} reviews</div>
			</div>

			<div class="space-y-2">
				{#each ratingDistribution() as count, i}
					<div class="flex items-center">
						<div class="w-12 text-right pr-2">{5 - i} stars</div>
						<div class="flex-1 mx-2">
							<div class="h-2 bg-gray-200 rounded-full">
								<div
									class="h-2 bg-yellow-400 rounded-full"
									style="width: {reviews.length > 0 ? (count / reviews.length) * 100 : 0}%"
								></div>
							</div>
						</div>
						<div class="w-8 text-xs text-gray-600">{count}</div>
					</div>
				{/each}
			</div>

			<div class="mt-6">
				<Button class="w-full" onclick={() => (showReviewForm = !showReviewForm)}>
					{showReviewForm ? 'Cancel' : 'Write a Review'}
				</Button>
			</div>
		</div>

		<!-- Review form or list -->
		<div class="md:w-2/3">
			{#if showReviewForm}
				<div class="review-form space-y-4">
					<h4 class="font-semibold">Write a Review for {productName}</h4>

					<div>
						<h3 class="block text-sm font-medium mb-1">Rating</h3>
						<div class="flex space-x-1" role="form" onmouseleave={handleRatingLeave}>
							{#each Array.from({ length: 5 }), i}
								<button
									type="button"
									class="focus:outline-none"
									onmouseover={() => handleRatingHover(i + 1)}
									onfocus={() => handleRatingHover(i + 1)}
									onclick={() => handleRatingClick(i + 1)}
								>
									<Star
										class="size-8 {i < (hoveredRating || newReview.rating)
											? 'text-yellow-400 fill-yellow-400'
											: 'text-gray-300'}"
									/>
								</button>
							{/each}
						</div>
					</div>

					<div>
						<label for="review-content" class="block text-sm font-medium mb-1">Review</label>
						<textarea
							id="review-content"
							rows="4"
							class="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
							placeholder="Share your experience with this product..."
							bind:value={newReview.content}
						></textarea>
					</div>

					<div>
						<h3 class="block text-sm font-medium mb-1">Add Photos</h3>
						<div class="flex items-center space-x-2">
							<label
								class="cursor-pointer p-2 border rounded-md flex items-center space-x-2 hover:bg-gray-50"
							>
								<Camera class="size-5 text-gray-500" />
								<span class="text-sm">Upload</span>
								<input type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
							</label>

							{#if newReview.images.length > 0}
								<div class="flex space-x-2">
									{#each newReview.images as image}
										<div class="relative w-16 h-16">
											<img src={image} alt="Review" class="w-full h-full object-cover rounded-md" />
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<div class="flex justify-end space-x-2">
						<Button variant="outline" onclick={() => (showReviewForm = false)}>Cancel</Button>
						<Button onclick={submitReview} disabled={isSubmitting}>
							{isSubmitting ? 'Submitting...' : 'Submit Review'}
						</Button>
					</div>
				</div>
			{:else}
				<div class="reviews">
					<div class="flex justify-between items-center mb-4">
						<h4 class="font-semibold">All Reviews</h4>
						<div class="flex items-center">
							<label for="sort-reviews" class="text-sm mr-2">Sort by:</label>
							<select id="sort-reviews" class="text-sm border rounded-md p-1" bind:value={sortBy}>
								<option value="newest">Newest</option>
								<option value="highest">Highest Rating</option>
								<option value="lowest">Lowest Rating</option>
								<option value="helpful">Most Helpful</option>
							</select>
						</div>
					</div>

					<div class="space-y-6">
						{#each reviews as review}
							<div class="review p-4 border rounded-md">
								<div class="flex justify-between items-start">
									<div>
										<div class="flex items-center">
											<span class="font-medium">{review.author}</span>
											{#if review.verified}
												<span class="ml-2 flex items-center text-green-600 text-xs">
													<BadgeCheck class="size-4 mr-1" />
													Verified Purchase
												</span>
											{/if}
										</div>
										<div class="flex items-center mt-1">
											<div class="flex mr-2">
												{#each { length: 5 }, i}
													{#if i < Math.floor(review.rating)}
														<Star class="text-yellow-400 fill-yellow-400 size-4" />
													{:else if i === Math.floor(review.rating) && review.rating % 1 >= 0.5}
														<StarHalf class="text-yellow-400 fill-yellow-400 size-4" />
													{:else}
														<Star class="text-gray-300 size-4" />
													{/if}
												{/each}
											</div>
											<span class="text-sm text-gray-600">{review.date}</span>
										</div>
									</div>
								</div>

								<div class="mt-2">{review.content}</div>

								{#if review.images.length > 0}
									<div class="mt-3 flex space-x-2">
										{#each review.images as image}
											<img
												src={image}
												alt="Review"
												class="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-90"
											/>
										{/each}
									</div>
								{/if}

								<div class="mt-3 flex justify-between items-center">
									<button
										class="text-sm text-gray-600 hover:text-gray-900"
										onclick={() => markHelpful(review.id)}
									>
										Helpful ({review.helpful})
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
