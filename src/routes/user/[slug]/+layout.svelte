<script>
	export let data;
	import { page } from '$app/stores';
	import UserCard from '$lib/UserCard.svelte';
</script>

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
