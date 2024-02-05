<script>
	import { Grid, Loader, Center, Button } from '@svelteuidev/core';
	import ItemName from '$lib/items/gallery/ItemName.svelte';
	import GalleryItemCard from '$lib/items/gallery/GalleryItemCard.svelte';

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

<Button variant="default" color="gray" href="./user">Go back</Button>

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
					<GalleryItemCard itemObj={item} />
				</Grid.Col>
			{/each}
			<Grid.Col span={8}>
				{#each value as item}
					<p>{item.rarity}: {item.effect.descriptions}</p>
				{/each}
			</Grid.Col>
			<Grid.Col span={12}>
				<p>{items.get(key)[0].description}</p>
			</Grid.Col>
		</Grid>
	{/each}

{:catch error}
	{error}
{/await}

<style>
	p {
		font-family: 'Segoe UI', sans-serif;
	}
</style>