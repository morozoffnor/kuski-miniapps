<script>
	import BottomPart from '$lib/BottomPart.svelte';
</script>

<slot />

<BottomPart />

<style>
	:global(body) {
		background-color: black;
	}
</style>
