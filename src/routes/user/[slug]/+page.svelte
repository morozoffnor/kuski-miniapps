<script>
    export let data;

</script>

{#await data}
    Fetching user data...
{:then data} 
    {data.userName}
{:catch e}
    {e}
{/await}