<script>
	import {botUser} from '../user/stores.js';
	import {Grid, Loader, Center} from '@svelteuidev/core';
	import UserStatPaper from '$lib/profile/UserStatPaper.svelte';
	import LowestEverStatPaper from '$lib/profile/LowestEverStatPaper.svelte';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import ItemName from '$lib/items/gallery/ItemName.svelte';

	export let data

	async function getAllItems() {
		const items =  await fetch(
			`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/items/list`,
			{
				method: "GET",
				headers: {
					'x-api-token': `${data.env.BOTAPI_TOKEN}`,
					'Content-Type': "application/json"
				}
			}
		)
		const res = await items.json()
		console.log(res)

		return await sortItemsIntoGroups(res.items)
	}

	async function sortItemsIntoGroups(items) {
		let sorted = new Map()
		let name = ''
		let count = 0
		for (let i = 0; i < items.length; i++) {
			const item = items[i]
			if (!sorted.has(item.name)) {
				let arr = []
				arr.push(item)
				sorted.set(item.name, arr)
			} else {
				let group = sorted.get(item.name)
				group.push(item)
				sorted.set(item.name, group)
			}
		}
		console.log(sorted)
		return sorted
	}
</script>

{#await getAllItems()}
	<Center>
		<Loader variant='bars' size="lg"/>
	</Center>
{:then items}
	{#each [...items] as [key, value]}
		<Grid spacing="xs" justify="left">
			<Grid.Col span={12}>
				<ItemName name={key} />
			</Grid.Col>
			{#each value as item}
				<Grid.Col span={4}>
					<ItemCard itemObj={item} />
				</Grid.Col>
			{/each}
		</Grid>
	{/each}

{:catch error}
	{error}
{/await}