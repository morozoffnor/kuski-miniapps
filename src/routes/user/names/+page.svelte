<script>
	import { Box, Button, Code, Grid, Group, Paper, Text } from '@svelteuidev/core';
	export let data;

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
		console.log(res)
		return res
	}
</script>
<Button variant="default" color="gray" href="./">Go back</Button>
<h1>Names List</h1>

{#await getNames()}
	Loading names...
{:then names}
	<Grid spacing="xs">
		<Grid.Col span={12}>
			<Paper>
				<Group position="apart">
					<Text>Name</Text>
					<Box root={Code}>Times used</Box>
				</Group>
			</Paper>
		</Grid.Col>

	{#each names.names as name}
		<Grid.Col span={12}>
			<Paper shadow="md" radius="sm" withBorder>
				<Group position="apart">
					<Text size='lg'>{name._id}</Text>
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