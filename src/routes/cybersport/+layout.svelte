<script>
// @ts-nocheck
	export let data;
	import { onMount } from 'svelte';
	

	onMount(() => {
		window.Telegram.WebApp.ready();
		const app = window.Telegram.WebApp;

		$: {
		console.log(data);
		console.log(app.initData)
		console.log({
			str: "initDataUnsafe",
			initData: app.initData,
		})
		}
		
		let test = sendInitData(data);
		

		async function sendInitData(data) {
			const tgData = await fetch(
			`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/api/telegram`+"/validate-init",
			{ method: "POST", body: app.initData, headers: { "x-api-token": data.env.BOTAPI_TOKEN } },
			).then(res => res.json());
			return tgData;
		}
		
		// (async (data) => {
		// 	const tgData = await fetch(
		// 	`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/api/telegram`+"/validate-init",
		// 		{ method: "POST", body: app.initData, headers: { "x-api-token": data.env.BOTAPI_TOKEN } },
		// 	).then(
		// 		res => res.json()
		// 		);
		// 	console.log("init" + window.Telegram.WebApp.initData)
		// })();
	});

	

	// const app = window.Telegram.WebApp;

	// async function sendInitData() {
	// 	const data = await fetch(
	// 	`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/api/telegram`+"/validate-init",
	// 	{ method: "POST", body: app.initData, headers: { "x-api-token": data.env.BOTAPI_TOKEN } },
	// 	).then(res => res.json());
	// }

	// window.addEventListener("ready", async function () {
		
	// });
</script>

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

<slot />
