<script>
	import ItemModalUI from './../../lib/items/ItemModalUI.svelte';
	import ItemCard from './../../lib/items/ItemCard.svelte';
	import { tgUserData, botUser } from './stores.js';
	// @ts-ignore
	export let data;
	import UserCard from '$lib/UserCard.svelte';
	import {getUserData} from '../cybersport/data.js'
	import { onMount } from 'svelte';
	import { SimpleGrid, Modal, useSvelteUITheme, Flex, Grid } from '@svelteuidev/core';
	// import { config} from '$lib/server/config.js'
	

	// @ts-ignore
	let user = {};
	let userFetched = false;
	// @ts-ignore
	let openedFromTelegram = null
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
		let telegram = await window.Telegram.WebApp
		telegram.expand()
		// @ts-ignore
		const obj = await window.Telegram.WebApp.initDataUnsafe;
		if (obj.user) {
			user = obj;
			$tgUserData = obj
			// console.log(obj);
			
			openedFromTelegram = true;
			console.log($tgUserData)
			// @ts-ignore

			let res = await fetch(`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUserData.user.id}`, {
				
				headers: {
					'x-api-token': `${data.env.BOTAPI_TOKEN}`
				}
			})

			$botUser = await res.json()
			console.log($botUser)
			userFetched = true;
		}
		if (data.env.ENV === 'dev') {
			$tgUserData = getUserData()
			
			console.log($tgUserData)
			// console.log($tgUserData.user.id)
			
			// $botUser = await fetch(`${config.BOTAPI_HOST}:${config.BOTAPI_PORT}/user/${$tgUserData.user.id}`)
			
			// @ts-ignore
			let res = await fetch(`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUserData.user.id}`, {
				
				headers: {
					'x-api-token': `${data.env.BOTAPI_TOKEN}`
				}
			})

			$botUser = await res.json()
			console.log($botUser)
			userFetched = true;
		}

		

		
	});

	// @ts-ignore
	function handleMessage(event) {
		// alert(event.detail.text);
		presentItemModal(event.detail.text)
	}
	// @ts-ignore
	let modalPresented = false

	// @ts-ignore
	function presentItemModal(itemName) {
		let itemObj = $botUser.items.find(item => item.name === itemName);

		// find item by name in $botUser.items[]
		
		// @ts-ignore
		$botUser.selectedItem = itemObj
		// @ts-ignore
		console.log($botUser.selectedItem)

		opened = true
	}
	let opened = false

	function closeModal() {
		opened = false
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
>
<!-- Modal Content -->
<ItemModalUI item={$botUser.selectedItem} />
</Modal>
{/if}
<h1>Inventory</h1>
{#if userFetched && $botUser.items.length > 0}
<SimpleGrid breakpoints={[
	{ maxWidth: 100, cols: 3, spacing: 'xs', minWidth: 100 },
	{ maxWidth: 100, cols: 2, spacing: 'xs', minWidth: 100 },
	{ maxWidth: 100, cols: 1, spacing: 'xs', minWidth: 100 }
	]}
	cols={3}
>
{#if $botUser.items.length > 0}
	{#each $botUser.items as item}
		<ItemCard itemName={item.name} on:message={handleMessage}/>
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

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>