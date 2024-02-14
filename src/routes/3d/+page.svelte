<script lang="ts">
	import { Canvas } from '@threlte/core'
	import ObjectComponentCard from '$lib/3D/ObjectComponentCard.svelte'

	let xcord = ""
	let y = ""
	let z = ""
	let color = "#fff2cc"
	let intensity = "4"
</script>


<div class="container h-full flex justify-center p-20">

	<div class="h-80 pt-10">
		Direct light controls for Kirich
		<br>
		<input bind:value={xcord} class="input w-16" type="text" placeholder="x"/>
		<input bind:value={y} class="input w-16" type="text" placeholder="y" />
		<input bind:value={z} class="input w-16" type="text" placeholder="z" />
		<Canvas>
			<ObjectComponentCard x={xcord} y={y} z={z} color={color} intensity={intensity}/>
		</Canvas>
		Color
		<br>
		<input bind:value={color} class="input" type="text" />
		<br>
		Intensity
		<br>
		<input bind:value={intensity} class="input" type="text" />
	</div>
</div>

