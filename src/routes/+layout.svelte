<script>
	import { page } from '$app/stores';
	import BottomPart from '$lib/BottomPart.svelte';
	import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap" rel="stylesheet">
</svelte:head>


<SvelteUIProvider withGlobalStyles themeObserver={'dark'}>
<slot />
</SvelteUIProvider>
{#if $page.url.pathname == "/user" || $page.url.pathname == "/user/" + $page.params.slug}
	<BottomPart />
{/if}

<style>
	::global {
		font-family: 'Segoe UI', sans-serif;
	}

</style>
