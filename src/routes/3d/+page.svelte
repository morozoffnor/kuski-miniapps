<script lang="ts">
	import { Canvas } from '@threlte/core'
	import ObjectComponentCard from '$lib/3D/ObjectComponentCard.svelte'

	let xcord = "1"
	let y = "1"
	let z = "1"
	let color = "#fff2cc"
	let intensity = "10"
	 let xx = "4"
	 let yy = "9"
	 let zz = "6"
	 let intensity2 = "5"

	 let xxx = "2"
	 let yyy = "-5"
	 let zzz = "3"
	 let intensity3 = "6"
</script>


<div class="container h-full flex justify-center p-20">

	<div class="h-80 pt-1">
		Direct light controls for Kirich
		<br>
		<input bind:value={xcord} class="input w-16" type="text" placeholder="x"/>
		<input bind:value={y} class="input w-16" type="text" placeholder="y" />
		<input bind:value={z} class="input w-16" type="text" placeholder="z" />
		<br>
		<input bind:value={xx} class="input w-16" type="text" placeholder="x"/>
		<input bind:value={yy} class="input w-16" type="text" placeholder="y" />
		<input bind:value={zz} class="input w-16" type="text" placeholder="z" />
		<br>
		<input bind:value={xxx} class="input w-16" type="text" placeholder="x"/>
		<input bind:value={yyy} class="input w-16" type="text" placeholder="y" />
		<input bind:value={zzz} class="input w-16" type="text" placeholder="z" />
		<Canvas>
			<ObjectComponentCard x={xcord} y={y} z={z} color={color} intensity={intensity}
			xx={xx} xxx={xxx} yy={yy} yyy={yyy} zz={zz} zzz={zzz} intensity2={intensity2}
								 intensity3={intensity3}
			/>
		</Canvas>
		<br>
		Intensity
		<input bind:value={intensity} class="input w-16" type="text" />

		<input bind:value={intensity2} class="input w-16" type="text" />

		<input bind:value={intensity3} class="input w-16" type="text" />
	</div>
</div>

