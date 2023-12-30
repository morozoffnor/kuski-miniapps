<script>
	import UserDetailsView from "./UserDetailsView.svelte";

    export let data;

</script>

{#await data}
    Fetching user data...
{:then data} 
    <UserDetailsView user={data.user} />
{:catch e}
    {e}
{/await}