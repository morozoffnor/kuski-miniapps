<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid, OrbitControls, TransformControls } from '@threlte/extras'
	import * as Three from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	import {useLoader} from '@threlte/core';
	import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
	import { Mesh, MeshBasicMaterial } from 'three';
	import {TextureLoader} from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
		'/3d/chest1.glb',
		// called when resource is loaded
		function ( object ) {
			console.log(object);

			let mat = new MeshBasicMaterial()

			// const material = new Three.MeshStandardMaterial({
			// 	map: new TextureLoader().load('/3d/pump/pump_uvs_initialShadingGroup_BaseColor.png'),
			// 	normalMap: new TextureLoader().load('/3d/pump/pump_uvs_initialShadingGroup_Normal.png'),
			// 	roughnessMap: new TextureLoader().load('/3d/pump/pump_uvs_initialShadingGroup_Roughness.png'),
			// 	metalnessMap: new TextureLoader().load('/3d/pump/pump_uvs_initialShadingGroup_Metallic.png'),
			// 	emissiveMap: new TextureLoader().load('/3d/pump/pump_uvs_initialShadingGroup_Emissive.png'),
			//
			// });
			// material.needsUpdate = true
			// object.traverse( function( child ) {
			// 	if ( child instanceof Three.Mesh ) {
			// 		child.material = material;
			// 	}
			// } );

			let chest = object.scene
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
<Grid cellColor="#808080" sectionSize={0} />

<!-- Camera -->
<T.PerspectiveCamera position={[20, 20, 20]} fov={50} makeDefault>
	<!-- Controls -->
	<OrbitControls enableDamping autoRotate/>
</T.PerspectiveCamera>

<!-- Lights the scene equally -->
<T.AmbientLight color="#ffffff" intensity={1.5} />

<!-- Light that casts a shadow -->
<T.DirectionalLight
	color="#ffffff"
	intensity={1}
	position={[10, 10, 0]}
	shadow.camera.top={8}
	castShadow
/>

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
