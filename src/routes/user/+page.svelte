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
	import { SimpleGrid, Modal, useSvelteUITheme, Flex, Grid, Paper } from '@svelteuidev/core';
	import { Check, Cross2 } from 'radix-icons-svelte';
	import UserStatPaper from '$lib/profile/UserStatPaper.svelte';
	import LowestEverStatPaper from '$lib/profile/LowestEverStatPaper.svelte';
	import UserComponent from '$lib/profile/UserComponent.svelte';
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
								$botUser.activatedItem = itemObj;
								$botUser = $botUser;
								modalButtonState.set('none');
								opened = false;
								showNotification('success');
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
		if (event.detail.type === 'debuff') {
			const target = event.detail.selectedUser
			const itemId = event.detail.text
			console.log('using debuff item ' + event.detail.text)

			setTimeout(async () => {
				for (let i=0; i < $botUser.items.length; i++) {
					if ($botUser.items[i]._id == itemId) {
						let reqData = {
							userId: String($botUser.userid),
							itemId: $botUser.items[i]._id,
							target: String(target)
						}
						await fetch(
							`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/items/use/debuff`,
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
								$botUser = $botUser;
								modalButtonState.set('none');
								opened = false;
								showNotification('success');
								return
							}
						}).catch(err => {
							modalButtonState.set('none');
							opened = false;
							showNotification('fail');
						})

					}
				}
			})

		}
		
		if (event.detail.text === 'closeModal') {
			opened = false;
		} else {
			presentItemModal(event.detail.text);
		}
	}
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
		<ItemModalUI item={$botUser.selectedItem} data={data} on:message={handleMessage}/>
	</Modal>
{/if}
{#if userFetched}
	<UserComponent />
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

<h1>Stats</h1>

{#if userFetched}
<Grid spacing="xs" justify="center">
    <Grid.Col span={12}><LowestEverStatPaper name="Lowest size ever" value={$botUser.cockStats.lowestSize}/></Grid.Col>
    <Grid.Col span={6}><UserStatPaper name="Highest size" value={$botUser.cockStats.highestSize} /></Grid.Col>
    <Grid.Col span={6}><UserStatPaper name="Current size" value={$botUser.cockStats.currentSize}/></Grid.Col>
    <Grid.Col span={12}><UserStatPaper name="Wins overall" value={$botUser.cockStats.wins} /></Grid.Col>
    
	<Grid.Col span={4}><UserStatPaper name="Messages" value={$botUser.stats.messagesSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Images" value={$botUser.stats.imagesSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Videos" value={$botUser.stats.videosSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Krujki" value={$botUser.stats.circlesSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Polls" value={$botUser.stats.pollsSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Voices" value={$botUser.stats.voicesSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Stickers" value={$botUser.stats.stickersSent} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Bot uses" value={$botUser.stats.botUses} /></Grid.Col>
	<Grid.Col span={4}><UserStatPaper name="Itemы" value={$botUser.stats.itemsUsed} /></Grid.Col>
	<Grid.Col span={12}><UserStatPaper name="Yaкудzа" value={$botUser.stats.yakuza} /></Grid.Col>
</Grid>
{:else}
 <h1> Couldn't fetch user data</h1>

{/if}

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

<style>

	h1 {
		color: whitesmoke;
		font-family: 'Segoe UI', sans-serif;
		text-align: center;
		text-shadow: 2px 2px #1917175a;
	}

	::marker {
		content: '';
	}
</style>
