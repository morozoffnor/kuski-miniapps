<script>
	export let data;
    import {page} from '$app/stores';
	import UserCard from './UserCard.svelte';
</script>

<div class="layout">
	<main>
		<slot />
	</main>
</div>

<aside>
    <h2>More users</h2>
    <ul>
        {#await data}
        Loading users...
        {:then data} 
            {#each data.users as { id, name, lowest }}
                {#if   $page.params.slug == id}
                <!-- <li><a href="/user/{id}" style="color: red;">{name}</a></li> -->
                {:else}
                <li><UserCard id={id} name={name} lowest={lowest}/></li>
                {/if}
            {/each}
        {/await}
    </ul>
</aside>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>