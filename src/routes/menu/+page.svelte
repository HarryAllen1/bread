<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import ProductCard from './ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import {
		Scene,
		PerspectiveCamera,
		WebGLRenderer,
		TorusGeometry,
		Mesh,
		MeshPhongMaterial,
		CapsuleGeometry,
		SphereGeometry,
		AmbientLight,
		DirectionalLight,
		Material,
	} from 'three';
	import { Croissant } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let container: HTMLDivElement;

	onMount(() => {
		if (!container) return;

		const scene = new Scene();
		const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new WebGLRenderer({
			alpha: true,
			antialias: true,
			canvas: document.createElement('canvas'),
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Create bread-like shapes
		const breadGeometries = [
			new TorusGeometry(1, 0.3, 16, 32), // Bagel
			new CapsuleGeometry(0.3, 1.5, 8, 16), // Baguette
			new SphereGeometry(0.8, 32, 16), // Round bread
		];

		const breadMaterial = new MeshPhongMaterial({
			color: 0xe3c397,
			shininess: 30,
			specular: 0x555555,
		});

		const objects: Mesh[] = [];

		// Create multiple bread objects
		for (let i = 0; i < 15; i++) {
			const geometry = breadGeometries[Math.floor(Math.random() * breadGeometries.length)];
			const bread = new Mesh(geometry, breadMaterial);

			bread.position.set(
				Math.random() * 30 - 15,
				Math.random() * 30 - 15,
				Math.random() * -20 - 10,
			);

			const scale = 1.5 + Math.random();
			bread.scale.set(scale, scale, scale);

			bread.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

			scene.add(bread);
			objects.push(bread);
		}

		// Lighting setup
		const ambientLight = new AmbientLight(0xffffff, 0.7);
		scene.add(ambientLight);

		const directionalLight = new DirectionalLight(0xffd700, 0.8);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		camera.position.z = 20;

		let animationFrameId: number;

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);

			objects.forEach((obj, index) => {
				// Gentle floating motion
				obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;

				// Slow rotation
				obj.rotation.x += 0.001;
				obj.rotation.y += 0.002;
			});

			renderer.render(scene, camera);
		};

		animate();

		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
			renderer.dispose();
			objects.forEach((obj) => {
				obj.geometry.dispose();
				if (obj.material instanceof Material) {
					obj.material.dispose();
				}
			});
			scene.clear();
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div bind:this={container} class="fixed inset-0 -z-10 opacity-30 pointer-events-none"></div>

<div class="container my-8 relative z-10 bread-pattern">
	<h1 class="scroll-m-20 mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">Menu</h1>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<Card.Root class="card-3d">
			<Card.Header>
				<a href="/create">
					<Card.Title>Create A Sandwich</Card.Title>
				</a>
				<Card.Description>Variable Price</Card.Description>
			</Card.Header>
			<Card.Content>
				<a href="/create" class="block relative overflow-hidden rounded-lg">
					<enhanced:img
						src="./sandwich.jpg"
						alt="A Sandwich"
						class="transform transition-transform hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
					<Croissant class="absolute bottom-4 right-4 size-8 text-white animate-float" />
				</a>
			</Card.Content>
			<Card.Footer class="gap-4">
				<Button href="/create" class="hover-lift">Start Creating</Button>
			</Card.Footer>
		</Card.Root>

		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</div>
