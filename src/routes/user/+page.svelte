<script>
	import { tgUserData } from './stores.js';
	export let data;
	import UserCard from '$lib/UserCard.svelte';
	import { onMount } from 'svelte';

	let user = {};
	let userFetched = false;
	let openedFromTelegram = null

	onMount(async () => {
		const obj = await window.Telegram.WebApp.initDataUnsafe;
		if (obj.user) {
			user = obj;
			$tgUserData = obj
			console.log(obj);
			userFetched = true;
			openedFromTelegram = true;
			console.log($tgUserData)
		}
	});

</script>



<h1>Stats:</h1>

<ul>
	{#await data}
		Loading users...
	{:then data}
		{#each data.users as { id, name, lowest }}
			<li><UserCard {id} {name} {lowest} /></li>
		{/each}
	{/await}
</ul>

<style>
	li {
		list-style-type: none;
	}

	h1 {
		color: whitesmoke;
		font-family: 'Ubuntu', monospace;
		text-align: center;
        text-shadow: 2px 2px #1917175a;
	}

	ul {
		padding-left: unset;
	}

	::marker {
		content: '';
	}
	:global(html) {
		background-color: #191717;
	}
	:global(body) {
		background-color: #191717;
		background-image: unset;
	}
	
</style>

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>