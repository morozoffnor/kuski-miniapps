<script>
// @ts-nocheck
	export let data;
	export const ssr = false
	import { onMount } from 'svelte';
	import {getUserData} from './data.js'
	import {userData} from './stores.js'
	import Menu from '$lib/game/ui/Menu.svelte';
	// import {Telegram} from '/scripts/telegram.js?url'
	import { browser } from '$app/environment'

	/** @type {userData} */

	if (data.env.ENV == "test") {
		$userData = getUserData()
	}

	$: testvar = initDataUnsafe
	console.log(`test var = ${testvar}`)

	let initDataUnsafe; 
	if (browser) {
		testvar2 = 3
		initDataUnsafe = window.Telegram.WebApp.initDataUnsafe
	}

	let testvar2 = 1


	onMount(() => {
		

		testar = 1
		testvar = testvar
		console.log(`test var = ${testvar}`)

		function change(i) {
			return i++
		}
		// $: {
		// console.log(data);
		// console.log(app.initData)
		// console.log({
		// 	str: "initDataUnsafe",
		// 	initData: app.initData,
		// })
		// }
		
		// let test = sendInitData(data);
		

		// async function sendInitData(data) {
		// 	const tgData = await fetch(
		// 	`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/api/telegram`+"/validate-init",
		// 	{ method: "POST", body: app.initData, headers: { "x-api-token": data.env.BOTAPI_TOKEN } },
		// 	).then(res => res.json());
		// 	return tgData;
		// }		
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
	/** @type {userData} */
	 // = app.initData;
</script>

{#await $userData}
	Loading...
{:then $userData} 
	<Menu user={$userData.user}/>
	<p>{testvar}</p>
{/await}
 {@debug testvar}
 {@debug initDataUnsafe}

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
		background-image: unset
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
