<script>
	import {
		Box,
		Button,
		Center,
		Code,
		Grid,
		Group,
		Paper,
		Text,
		TextInput,
	} from '@svelteuidev/core';
	import { botUser, notification, tgUserData, notificationText } from '../stores.js';
	import { onMount } from 'svelte';
	import { getUserData } from '../../cybersport/data.js';
	import {goto} from '$app/navigation';

	export let data;

	function showNotification(state) {
		$notification = state;
		setTimeout(() => {
			$notification = 'none';
		}, 5000);
	}



	onMount(async () => {
		let telegram = await window.Telegram.WebApp;
		telegram.expand();

		const obj = await window.Telegram.WebApp.initDataUnsafe;

		if (obj.user) {
			$tgUserData = obj;
			// console.log(obj);

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
		}
	})

	async function getNames(){
		const names =  await fetch(
			`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/stats/names`,
			{
				method: "GET",
				headers: {
					'x-api-token': `${data.env.BOTAPI_TOKEN}`,
					'Content-Type': "application/json"
				}
			}
		)
		const res = await names.json()
		return res
	}
	async function sendName() {
		let reqData = {
			name: value,
			addedBy: $botUser.userid
		}
		console.log(reqData)
		await fetch(`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/phrases/names`,
					{
						method: "POST",
						headers: {
							'x-api-token': `${data.env.BOTAPI_TOKEN}`,
							'Content-Type': "application/json"
						},
						body: JSON.stringify(reqData)
					}).then(async (res) => {
						if (res.ok) {
							$notificationText = 'The name has been added!'
							showNotification('success')
							value = ''
						} else {
							$notificationText = 'Error! Is this name already exists?'
							showNotification('fail')
						}
		}).finally(() => {
			goto('/user/names')
		})
	}

	function getRandomSize() {
		return (Math.random() * (40 - 0.1 + 1) + 0.1).toFixed(3);
	}

	let previewText = 'Add new name'

	$: if (value !== '') {
		previewText = 'Preview: '+ value + ' у меня ' + getRandomSize()
	} else {
		previewText = 'Add new name'
	}

	let value = ''

</script>
<Button variant="default" color="gray" href="./">Go back</Button>
<h1>Names List</h1>

{#await getNames()}
	Loading names...
{:then names}
	<Grid align="flex-end">

		<Grid.Col span={8}>

				<TextInput
					placeholder="Think of your mom..."
					label={previewText}
					required={false}
					bind:value
				/>



		</Grid.Col>

		<Grid.Col span={4}>
			<Center>
				{#if value===''}
					<Button variant="default" color="gray" fullSize disabled>Add name</Button>
				{:else}
					<Button on:click={() => {
                sendName()
            }}
							variant="default" color="gray" fullSize ripple>Add name</Button>
				{/if}

			</Center>
		</Grid.Col>
	</Grid>
	<br>
	<br>

	<Grid justify="center" spacing="xs" >

		<Grid.Col span={12}>
				<Box css={{
					backgroundColor: '$dark400',
					padding	: '$7',
        			borderRadius: '$md',
				}}>
					<Group position="apart">
						<Text color="whitesmoke">Name</Text>
						<Box root={Code}>Times used</Box>
					</Group>
				</Box>
		</Grid.Col>


	{#each names.names as name}
		<Grid.Col span={12}>
			<Paper shadow="md" radius="md" withBorder>
				<Group position="apart">
					<Text color="whitesmoke">{name._id}</Text>
					<Box root={Code}>{name.count}</Box>
				</Group>

			</Paper>
		</Grid.Col>
	{/each}

	</Grid>
{:catch error}
	{error}
{/await}

<style>
	h1 {
		font-family: 'Segoe UI', sans-serif;
		color: whitesmoke;
		text-align: center;
	}
</style>