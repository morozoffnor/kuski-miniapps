<script>
	import BottomPart from '$lib/BottomPart.svelte';

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
                <!-- do nothing -->
                {:else}
                <li><UserCard id={id} name={name} lowest={lowest}/></li>
                {/if}
            {/each}
        {/await}
    </ul>
</aside>

<BottomPart/>

<style>
    h2 {
        color: whitesmoke;
        text-align: center;
    }
    ::marker {
        content: '';
    }

    ul {
        padding-left: unset;
    }
    li {
        margin-top: 5px;

    }

</style>