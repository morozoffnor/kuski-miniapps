<script lang="ts">
	import { Canvas } from '@threlte/core'
	import ObjectComponentCard from '$lib/3D/ObjectComponentCard.svelte'

	let xcord = ""
	let y = ""
	let z = ""
	let color = "#fff2cc"
	let intensity = "4"
	 let xx = ""
	 let yy = ""
	 let zz = ""
	 let intensity2 = "4"

	 let xxx = ""
	 let yyy = ""
	 let zzz = ""
	 let intensity3 = "4"
</script>


<div class="container h-full flex justify-center p-20">

	<div class="h-80 pt-10">
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
		Color
		<br>
		<input bind:value={color} class="input" type="text" />
		<br>
		Intensity
		<br>
		<input bind:value={intensity} class="input" type="text" />
		<br>
		<input bind:value={intensity2} class="input" type="text" />
		<br>
		<input bind:value={intensity3} class="input" type="text" />
	</div>
</div>

