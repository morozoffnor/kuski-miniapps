<script async>

	import {setCookie} from 'svelte-cookie'
	import { botUser, cookieSet } from '../../stores/userStores.ts';

	export let data
	let authCompleted = false
	let code = ""

	async function auth() {
		console.log(code)
		console.log(atob(code))
		let userid = atob(code)
		const res = await fetch(
			`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${userid}`,
			{
				headers: {
					'x-api-token': `${data.env.BOTAPI_TOKEN}`
				}
			}
		)
		let info = await res.json()
		console.log(info)
		if (info.userid) {
			setCookie('userid', userid)
			$botUser = info
			$botUser = $botUser
			$cookieSet.userid = true
			authCompleted = true
		}

	}
</script>


{#if authCompleted}
	<div class="block items-center">
		<div class="flex justify-center">
			<h1 class="h1 pt-1">
				Успешно!
			</h1>

		</div>
		<div class="flex justify-center mt-3">
			<a href="/" data-sveltekit-preload-data="hover"><button class="btn variant-filled w-auto">Перейти в инвентарь</button></a>

		</div>

	</div>
{:else}
	<div class="block items-center">
		<div class="flex justify-center">
			<h1 class="h1 pt-1">
				Авторизация
			</h1>

		</div>
		<div class="flex justify-center mt-3">
			<input class="input w-auto" placeholder="Код из бота" bind:value={code}/>
			{#if code !== ""}
				<button class="btn variant-filled ml-1" on:click={auth}>Войти</button>
			{:else}
				<button class="btn variant-soft ml-1">Войти</button>
			{/if}
		</div>
		<div class="flex justify-center mt-3">
			<h4 class="h4 text-center p-5 text-surface">
				Для авторизации на сайте нужно перейти в личные сообщения бота и отправить команду <code class="code size-auto">/auth</code>
			</h4>
		</div>

	</div>
{/if}




