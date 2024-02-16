<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras'

	import {MeshBasicMaterial } from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	const {
		size,                    // Readable<Size>
		camera,                  // CurrentWritable<Camera>
		scene,                   // Scene
		dpr,                     // CurrentWritable<number>
		useLegacyLights,         // CurrentWritable<boolean>
		renderer,                // WebGLRenderer
		renderMode,              // CurrentWritable<'always' | 'on-demand' | 'manual'>
		autoRender,              // CurrentWritable<boolean>
		invalidate,              // () => void
		advance,                 // () => void
		scheduler,               // Scheduler
		mainStage,               // Stage
		renderStage,             // Stage
		autoRenderTask,          // Task
		shouldRender,            // () => boolean
		colorManagementEnabled,  // CurrentWritable<boolean>
		colorSpace,              // CurrentWritable<ColorSpace>
		toneMapping,             // CurrentWritable<ToneMapping>
		shadows                  // CurrentWritable<boolean | ShadowMapType>
	} = useThrelte()



	// const scene = new Three.Scene();
	// const obj = useLoader(OBJLoader).load('/3d/pump/pump_uvs.obj')

	// instantiate a loader
	const loader = new GLTFLoader();

	// load a resource
	let model;
	loader.load(
		// resource URL
		'/3d/chest2.glb',
		// called when resource is loaded
		function ( object ) {
			console.log(object);

			let chest = object.scene
			chest.scale.set(2, 2, 2);
			scene.add(chest)
			console.log(scene)

		},
		// called when loading is in progresses
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);
</script>


<!-- Grid -->
<!--<Grid cellColor="#808080" sectionSize={0} />-->

<!-- Camera -->
<T.PerspectiveCamera position={[2, 7, 6]} fov={50} makeDefault>
	<!-- Controls -->
	<OrbitControls enableDamping autoRotate enabled={false} />
</T.PerspectiveCamera>

<T.AmbientLight
	color="#cfe2f3"
	intensity={2.5}
/>
<T.DirectionalLight
	color="#fff2cc"
	intensity={4}
	position={[10, 10, 10]}
	shadow.camera.top={8}
	castShadow
/>
<!--<T.DirectionalLight-->
<!--	color="#ffffff"-->
<!--	intensity={5}-->
<!--	position={[10, 100, 50]}-->
<!--	shadow.camera.top={8}-->
<!--	castShadow-->
<!--/>-->

<!-- Sphere -->
<!--{#if loader}-->
<!--	<T is={loader} />-->
<!--{/if}-->
<T.Mesh position={[0, 4, 0]} castShadow>
<!--	<T.SphereGeometry args={[4, 64, 64]} />-->
<!--	<T.MeshStandardMaterial color="#ffffff" />-->
<!--	<TransformControls object={ref} />-->
</T.Mesh>

<!-- Floor -->
<!--<T.Mesh rotation.x={DEG2RAD * 90} receiveShadow>-->
<!--	<T.PlaneGeometry args={[20, 20]} />-->
<!--	<T.MeshStandardMaterial color="#ffffff" side={Three.DoubleSide} />-->
<!--</T.Mesh>-->
