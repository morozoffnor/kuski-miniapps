<script>
	import UserDetailsView from '$lib/UserDetailsView.svelte';

	export let data;
</script>

{#await data}
	Fetching user data...
{:then data}
	<UserDetailsView user={data.user} />
{:catch e}
	{e}
{/await}
