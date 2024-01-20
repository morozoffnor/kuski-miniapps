<script>

// @ts-nocheck

	import ItemModalUI from './../../lib/items/ItemModalUI.svelte';
	import ItemCard from './../../lib/items/ItemCard.svelte';
	import { tgUserData, botUser, modalButtonState, notification } from './stores.js';
	// @ts-ignore
	export let data;
	import UserCard from '$lib/UserCard.svelte';
	import { getUserData } from '../cybersport/data.js';
	import { onMount } from 'svelte';
	import { SimpleGrid, Modal, useSvelteUITheme, Flex, Overlay, Notification } from '@svelteuidev/core';
	import { Check, Cross2 } from 'radix-icons-svelte';
	// import { config} from '$lib/server/config.js'

	// @ts-ignore
	let user = {};
	let userFetched = false;
	// @ts-ignore
	let openedFromTelegram = null;
	const theme = useSvelteUITheme();
	/**
	 * @param {Number} id
	 */
	// @ts-ignore
	async function getUserSv(id) {
		const user = await fetch(`user/${id}`);
		// console.log(user)
		return user;
	}

	onMount(async () => {
		let telegram = await window.Telegram.WebApp;
		telegram.expand();
		// @ts-ignore
		const obj = await window.Telegram.WebApp.initDataUnsafe;
		if (obj.user) {
			user = obj;
			$tgUserData = obj;
			// console.log(obj);

			openedFromTelegram = true;
			console.log($tgUserData);
			// @ts-ignore

			let res = await fetch(
				`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUserData.user.id}`,
				{
					headers: {
						'x-api-token': `${data.env.BOTAPI_TOKEN}`
					}
				}
			);

			$botUser = await res.json();
			console.log($botUser);
			userFetched = true;
			$modalButtonState = 'none';
		}
		if (data.env.ENV === 'dev') {
			$tgUserData = getUserData();

			console.log($tgUserData);

			let res = await fetch(
				`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUserData.user.id}`,
				{
					headers: {
						'x-api-token': `${data.env.BOTAPI_TOKEN}`
					}
				}
			);

			$botUser = await res.json();
			console.log($botUser);
			userFetched = true;
			$modalButtonState = 'none';
		}
	});

	// @ts-ignore
	async function handleMessage(event) {
		if (event.detail.type === 'useItem') {
			console.log('using item ' + event.detail.text)
			modalButtonState.set('loading');
			setTimeout(async () => {
				let itemObj = $botUser.items.find((item) => item._id == event.detail.text);
				for (var i =0; i < $botUser.items.length; i++) {
					if ($botUser.items[i]._id == event.detail.text) {
						let reqData = {
							userId: String($botUser.userid),
							itemId: $botUser.items[i]._id
						}
						await fetch(
							`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/items/use`,
							{
								method: "POST",
								headers: {
									'x-api-token': `${data.env.BOTAPI_TOKEN}`,
									'Content-Type': "application/json"
								},
								body: JSON.stringify(reqData)
							}
						).then(res => {
							if (res.status == 200) {
								$botUser.items.splice(i, 1);
								showNotification('success');
								$botUser = $botUser;
								modalButtonState.set('none');
								opened = false;
								return
							}
						}).catch(err => {
							modalButtonState.set('none');
							opened = false;
							showNotification('fail');
						})
					} else {
						// show error notification
						modalButtonState.set('none');
						opened = false;
					}
				}
			}, 1000);
			return;
		}
		
		if (event.detail.text === 'closeModal') {
			opened = false;
		} else {
			presentItemModal(event.detail.text);
		}
	}
	let notificationShown = false;
	let failedNotificationShown = false;
	function showNotification(state) {
		$notification = state;
		setTimeout(() => {
			$notification = 'none';
		}, 5000);
	}
	// @ts-ignore

	// @ts-ignore
	function presentItemModal(id) {
		let itemObj = $botUser.items.find((item) => item._id === id);

		// @ts-ignore
		$botUser.selectedItem = itemObj;
		// @ts-ignore
		console.log($botUser.selectedItem);

		opened = true;
	}
	let opened = false;

	function closeModal() {
		opened = false;
	}


</script>


{#if $botUser.selectedItem}
	<Modal
		{opened}
		on:close={closeModal}
		title={$botUser.selectedItem.name}
		overlayColor={theme.colorScheme === 'dark' ? 'black' : 'black'}
		overlayOpacity={0.55}
		overlayBlur={3}
		on:message={handleMessage}
	>
		<!-- Modal Content -->
		<ItemModalUI item={$botUser.selectedItem} on:message={handleMessage}/>
	</Modal>
{/if}
<h1>Inventory</h1>
{#if userFetched && $botUser.items.length > 0}
	<SimpleGrid
		
		cols={3}
		spacing={2}
	>
		{#if $botUser.items.length > 0}
			{#each $botUser.items as itemObj}
				<ItemCard itemObj={itemObj} on:message={handleMessage} />
			{/each}
		{/if}
	</SimpleGrid>
{:else}
	<Flex justify="space-around"><p>You have no items :(</p></Flex>
{/if}

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

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

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
</style>
