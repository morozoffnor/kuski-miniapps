<script>
    export let data;
    import UserCard from '$lib/UserCard.svelte';
</script>

<h1>Users</h1>

<ul>
    {#await data}
        Loading users...
    {:then data} 
    {#each data.users as { id, name, lowest }}
        <li><UserCard id={id} name={name} lowest={lowest}/></li>
{/each}
    {/await}
</ul>

<style>
    li {
        list-style-type: none;
    }

    h1 {
        color: whitesmoke
    }

    ul {
        padding-left: unset;
    }

    ::marker {
        content: ''
    }
</style>