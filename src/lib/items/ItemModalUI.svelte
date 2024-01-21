<script>
// @ts-nocheck
    import { botUser } from '../../routes/user/stores.js';
	import ItemRarityText from './ItemRarityText.svelte';
	import { modalButtonState } from './../../routes/user/stores.js';
	import MathItemType from './types/MathItemType.svelte';
    import { Button, Flex, Group, SimpleGrid, Alert } from '@svelteuidev/core';
    export let item;
    import { createEventDispatcher } from 'svelte';
    import { InfoCircled } from 'radix-icons-svelte';

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

</script>
<Group position='center'><ItemRarityText rarity={item.rarity} /></Group>
<p>
    {item.description}
</p>

{#if $botUser.activatedItem}
        <Alert icon={InfoCircled}  title="Внимание!" color="red" variant="outline" radius="md">
            У вас уже активирован предмет {$botUser.activatedItem.name} [{$botUser.activatedItem.rarity}]! 
            <br>
            Использование этого предмета приведёт к замене предыдущего!
        </Alert>
{/if}
<br>

{#if item.type === 'math'}
    <MathItemType item={item}/>
{:else}
    нихуя
{/if}

<br>

<Flex justify="space-around" gap="xs">
	{#if $modalButtonState === 'none'}
        <Button 
            on:click={() => {
                useItem(item._id)
            }}
            variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} ripple
        >
                Use item
        </Button>
    {:else}
        <Button variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} loading>
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
        font-family: 'Alegreya Sans', sans-serif;
    }
</style>