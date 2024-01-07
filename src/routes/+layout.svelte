<script>
	import BottomPart from '$lib/BottomPart.svelte';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
</svelte:head>


<slot />

<BottomPart />

<style>
	:global(body) {
		background-color: black;
	}
</style>
