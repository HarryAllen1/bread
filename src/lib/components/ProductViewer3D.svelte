<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Scene,
		PerspectiveCamera,
		WebGLRenderer,
		Mesh,
		MeshStandardMaterial,
		AmbientLight,
		DirectionalLight,
		TextureLoader,
		SphereGeometry,
		CylinderGeometry,
		TorusGeometry,
		Group,
		Vector2,
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	export let productType: 'loaf' | 'bagel' | 'croissant' | 'baguette' | 'roll' | 'pretzel' = 'loaf';
	export let productName: string;
	export let textureUrl: string = '';

	let container: HTMLDivElement;
	let renderer: WebGLRenderer;
	let scene: Scene;
	let camera: PerspectiveCamera;
	let controls: OrbitControls;
	let bread: Group;
	let isZoomed = false;
	let isDragging = false;
	let mousePosition = { x: 0, y: 0 };

	const createBreadModel = () => {
		bread = new Group();
		const textureLoader = new TextureLoader();
		let breadGeometry;
		let breadMaterial;

		if (textureUrl) {
			const texture = textureLoader.load(textureUrl);
			breadMaterial = new MeshStandardMaterial({
				map: texture,
				roughness: 0.8,
				metalness: 0.1,
			});
		} else {
			breadMaterial = new MeshStandardMaterial({
				color: 0xe3c397,
				roughness: 0.8,
				metalness: 0.1,
			});
		}

		switch (productType) {
			case 'loaf':
				breadGeometry = new CylinderGeometry(1, 1, 2, 16);
				breadGeometry.scale(1, 0.6, 0.8);
				break;
			case 'bagel':
				breadGeometry = new TorusGeometry(0.8, 0.4, 16, 32);
				break;
			case 'croissant':
				// Create a more complex shape for croissant
				const crescent = new Group();
				const base = new CylinderGeometry(0.2, 0.2, 2, 8);
				base.rotateZ(Math.PI / 2);
				const baseMesh = new Mesh(base, breadMaterial);
				baseMesh.position.set(0, 0, 0);
				crescent.add(baseMesh);

				// Bend the croissant
				baseMesh.rotation.z = Math.PI / 4;
				baseMesh.scale.set(1, 0.5, 0.3);

				bread.add(crescent);
				return bread;
			case 'baguette':
				breadGeometry = new CylinderGeometry(0.3, 0.3, 3, 16);
				break;
			case 'roll':
				breadGeometry = new SphereGeometry(0.8, 32, 32);
				breadGeometry.scale(1, 0.7, 1);
				break;
			case 'pretzel':
				// Create a more complex shape for pretzel
				const pretzel = new Group();

				// Create the main loops
				const loop1 = new TorusGeometry(0.6, 0.15, 8, 24);
				const loop1Mesh = new Mesh(loop1, breadMaterial);
				loop1Mesh.position.set(-0.6, 0, 0);
				loop1Mesh.rotation.y = Math.PI / 2;

				const loop2 = new TorusGeometry(0.6, 0.15, 8, 24);
				const loop2Mesh = new Mesh(loop2, breadMaterial);
				loop2Mesh.position.set(0.6, 0, 0);
				loop2Mesh.rotation.y = Math.PI / 2;

				// Create the center piece
				const center = new CylinderGeometry(0.15, 0.15, 1.2, 8);
				center.rotateX(Math.PI / 2);
				const centerMesh = new Mesh(center, breadMaterial);

				pretzel.add(loop1Mesh, loop2Mesh, centerMesh);
				bread.add(pretzel);
				return bread;
			default:
				breadGeometry = new SphereGeometry(1, 32, 32);
		}

		const breadMesh = new Mesh(breadGeometry, breadMaterial);
		bread.add(breadMesh);
		return bread;
	};

	const handleZoom = () => {
		isZoomed = !isZoomed;

		if (isZoomed) {
			camera.position.z = 2;
		} else {
			camera.position.z = 5;
		}
	};

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true;
		mousePosition = { x: event.clientX, y: event.clientY };
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isDragging) return;

		const deltaX = event.clientX - mousePosition.x;
		const deltaY = event.clientY - mousePosition.y;

		bread.rotation.y += deltaX * 0.01;
		bread.rotation.x += deltaY * 0.01;

		mousePosition = { x: event.clientX, y: event.clientY };
	};

	const handleMouseUp = () => {
		isDragging = false;
	};

	onMount(() => {
		// Setup scene
		scene = new Scene();
		camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
		camera.position.z = 5;

		// Setup renderer
		renderer = new WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Add lights
		const ambientLight = new AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const directionalLight = new DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		const backLight = new DirectionalLight(0xffffff, 0.5);
		backLight.position.set(-5, 5, -5);
		scene.add(backLight);

		// Add bread model
		bread = createBreadModel();
		scene.add(bread);

		// Add controls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.maxDistance = 10;
		controls.minDistance = 2;

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);

			// Gentle rotation if not being controlled
			if (!controls.enabled) {
				bread.rotation.y += 0.005;
			}

			controls.update();
			renderer.render(scene, camera);
		};

		animate();

		// Handle resize
		const handleResize = () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	});

	onDestroy(() => {
		if (renderer) {
			renderer.dispose();
		}
	});
</script>

<div class="product-viewer">
	<div class="viewer-container" bind:this={container}></div>

	<div class="controls">
		<button
			class="control-btn"
			on:click={handleZoom}
			aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
		>
			{isZoomed ? 'Zoom Out' : 'Zoom In'}
		</button>

		<div class="view-info">
			<span>Drag to rotate • Scroll to zoom</span>
		</div>
	</div>

	<div class="product-name">
		{productName}
	</div>
</div>

<style>
	.product-viewer {
		position: relative;
		width: 100%;
		height: 400px;
		border-radius: 0.75rem;
		overflow: hidden;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.05));
		box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);
	}

	.viewer-container {
		width: 100%;
		height: 100%;
		cursor: grab;
	}

	.viewer-container:active {
		cursor: grabbing;
	}

	.controls {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 10;
	}

	.control-btn {
		background: rgba(255, 255, 255, 0.8);
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.view-info {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		color: rgba(0, 0, 0, 0.7);
	}

	.product-name {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-weight: 600;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
