<script>
	export let data;
	import { page } from '$app/stores';
	import UserCard from '$lib/UserCard.svelte';
	import { Button } from '@svelteuidev/core';
</script>

<Button variant="default" color="gray" href="./">Go back</Button>

<div class="layout">
	<main>
		<slot />
	</main>
</div>

<aside>
	<h2>More users:</h2>
	<ul>
		{#await data}
			Loading users...
		{:then data}
			{#each data.users as { id, name, lowest }}
				{#if $page.params.slug == id}
					<!-- do nothing -->
				{:else}
					<li><UserCard {id} {name} {lowest} /></li>
				{/if}
			{/each}
		{/await}
	</ul>
</aside>

<style>
	h2 {
		color: whitesmoke;
		text-align: center;
		font-family: 'Ubuntu', monospace;
        text-shadow: 2px 2px #1917175a;
	}
	::marker {
		content: '';
	}

	ul {
		padding-left: unset;
	}
	li {
		list-style-type: none;
	}
</style>
