<script>
// @ts-nocheck
    import { botUser } from '../../routes/user/stores.js';
    import ItemRarityText from './ItemRarityText.svelte';
    import MathItemType from './types/MathItemType.svelte';
    import { Button, Flex, Group, NativeSelect, Alert } from '@svelteuidev/core';
    export let item;
    export let data;
    import { createEventDispatcher } from 'svelte';
    import { InfoCircled } from 'radix-icons-svelte';
    import DebuffItemType from '$lib/items/types/DebuffItemType.svelte';

    const dispatch = createEventDispatcher();

    function useClicked(id) {
        console.log('use ' + id)
        dispatch('message', {
            text: id
        })
    }

    function useItem(id) {
        console.log('use ' + id)
        dispatch('message', {
            text: id,
            type: 'useItem'
        })
    
    }
	function useDebuff(id) {
		console.log('use ' + id)
		dispatch('message', {
			text: id,
			type: 'debuff',
			selectedUser: value
		})

	}


    async function getActiveUsers() {
      const res = await fetch(
        `${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/items/activeUsers`,
        {
          method: "GET",
          headers: {
            'x-api-token': `${data.env.BOTAPI_TOKEN}`,
            'Content-Type': "application/json"
          }
        }
      )
      const resData = await res.json()

      console.log(resData)
      return createLabels(resData.users)
    }

	async function createLabels(resData) {
		console.log(resData)
		let arr = []
		for (let i=0; i < resData.length; i++) {
			let user = resData[i]
			// this is in case I want to disable self use
			// if (user.userid !== $botUser.userid) {
			// 	arr.push({
			// 		label: user.userName,
			// 		value: user.userid
			// 	})
			// }
			console.log(user)
			arr.push({
				label: user.userName,
				value: user.userid
			})
		}
		console.log(arr)
		return arr
	}

	let value = 0

</script>
<Group position='center'><ItemRarityText rarity={item.rarity} /></Group>
<p>
    {item.description}
</p>



{#if item.type === 'math'}
	{#if $botUser.activatedItem}
		<Alert icon={InfoCircled}  title="Внимание!" color="red" variant="outline" radius="md">
			У вас уже активирован предмет {$botUser.activatedItem.name} [{$botUser.activatedItem.rarity}]!
			<br>
			Использование этого предмета приведёт к замене предыдущего!
		</Alert>
	{/if}
	<br>
    <MathItemType item={item}/>
{:else if item.type === 'debuff'}
    <DebuffItemType item={item} />
{:else}
    нихуя
{/if}

<br>

{#if item.type === 'debuff'}
	{#await getActiveUsers()}
		Loading...
	{:then activeUsers}
		{#if activeUsers.length === 0}
			<NativeSelect
				data={activeUsers}
				bind:value
				placeholder="Никто ещё не мерял хуй сегодня :("
				label="На кого положишь в этот раз?"
				disabled
			/>
			<br>
		{:else}

			{#if value == $botUser.userid}
				<NativeSelect
					data={activeUsers}
					bind:value
					placeholder="Выбери жертву"
					label="На кого положишь в этот раз?"
					error="Ну можно и на себя, конечно... но..."
				/>
			{:else}
				<NativeSelect
					data={activeUsers}
					bind:value
					placeholder="Выбери жертву"
					label="На кого положишь в этот раз?"

				/>
			{/if}
			<br>
		{/if}

	{:catch someError}
		{someError.message}
	{/await}
{/if}

<Flex justify="space-around" gap="xs">
    {#if item.type === 'debuff'}
		{#if value === 0}
			<Button

				variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} disabled
			>
				Use item
			</Button>
		{:else}
			<Button
				on:click={() => {
                useDebuff(item._id)
            }}
				variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} ripple
			>
				Use item
			</Button>
		{/if}
	{:else}
		<Button
			on:click={() => {
                useItem(item._id)
            }}
			variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} ripple
		>
			Use item
		</Button>
    {/if}

	<Button 
        on:click={() => {
            useClicked('closeModal')
        }}
        variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}} ripple>
        Cancel
    </Button>
</Flex>

<style>
    p {
        font-family: 'Segoe UI', sans-serif;
    }
</style>