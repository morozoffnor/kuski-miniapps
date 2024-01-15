<script>
	// @ts-nocheck
	export let data;
	import { onMount } from 'svelte';
	import { getUserData } from './data.js';
	import Menu from '$lib/game/ui/Menu.svelte';
	import { browser } from '$app/environment';
	import { userData } from './stores.js';

	if (data.env.ENV == 'dev') {
		$userData = getUserData();
	}

	let user = {};
	let userFetched = false;

	onMount(async () => {
		const obj = await window.Telegram.WebApp.initDataUnsafe;
		user = obj;
		$userData = obj
		console.log(obj);
		userFetched = true;
	});
	/**
	 * @typedef {Object} userData
	 * @property {string} auth_date - The authentication date.
	 * @property {string} chat_instance - The chat instance.
	 * @property {string} chat_type - The type of chat.
	 * @property {string} hash - The hash.
	 * @property {Object} user - The user object.
	 * @property {boolean} user.allows_write_to_pm - If the user allows writing to private messages.
	 * @property {string} user.first_name - The first name of the user.
	 * @property {number} user.id - The ID of the user.
	 * @property {boolean} user.is_premium - If the user is premium.
	 * @property {string} user.language_code - The language code of the user.
	 * @property {string} user.last_name - The last name of the user.
	 * @property {string} user.username - The username of the user.
	 */
</script>

{#if userFetched}
	// {console.log(user)}
	{console.log($userData)}

	<Menu user={$userData.user} />


{/if}

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

<slot />

<style>
	:global(html) {
		background-color: #191717;
	}
	:global(body) {
		background-color: #191717;
		background-image: unset;
	}
	p {
		width: 100%;
		text-wrap: wrap;
		color: white;
	}
	:global(p) {
		color: white;
		font-family: 'Ubuntu', monospace;
	}
</style>
