<script>
	import { page } from '$app/stores';
	import BottomPart from '$lib/BottomPart.svelte';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
</svelte:head>


<slot />
{#if $page.url.pathname == "/user" || $page.url.pathname == "/user/" + $page.params.slug}
	<BottomPart />
{/if}

<style>

</style>
