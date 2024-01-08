<script>
// @ts-nocheck
	export let data;
	import { onMount } from 'svelte';
	import {getUserData} from './data.js'
	

	onMount(() => {
		window.Telegram.WebApp.ready();
		const app = window.Telegram.WebApp;

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
	let userData = getUserData() // = app.initData;
</script>

<p>
	{JSON.stringify(userData.user)}




	
	
</p>

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

</style>
