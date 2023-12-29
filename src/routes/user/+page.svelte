<script>
    export let data;
</script>

<h1>Users</h1>

<ul>
    {#await data}
        Loading users...
    {:then data} 
        {#each data.users as { id, name}}
        <li><a href="/user/{id}">{name}</a></li>
        {/each}
    {/await}
</ul>

<style>
    li {
        list-style-type: none;
    }

    ::marker {
        content: ''
    }
</style>