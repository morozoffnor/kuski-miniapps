<script>
	import UserDetailsCard from "./UserDetailsCard.svelte";

    export let data;

</script>

{#await data}
    Fetching user data...
{:then data} 
    <UserDetailsCard user={data.user} />
{:catch e}
    {e}
{/await}