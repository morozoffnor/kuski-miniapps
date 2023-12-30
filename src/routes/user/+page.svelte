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

    ::marker {
        content: ''
    }
    /* a   {
        text-decoration: none;
        }

    a:visited {
        text-decoration: none;
        }

    a:hover {
        text-decoration: underline;
        }

    a:active {
        text-decoration: underline;
        } */

    
</style>