<script>
	export let data;
    import {page} from '$app/stores';
	import UserCard from '$lib/UserCard.svelte';
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
	h2 {
        color: whitesmoke;
        margin-left: 115px;

    }
    ::marker {
        content: ''
    }

    ul {
        margin-left: auto;
        margin-right: auto;
        place-self: center;
    }
    li {
        margin-top: 5px
    }

    aside {
        place-self: center;
    }
</style>