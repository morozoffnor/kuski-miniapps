<script>
// @ts-nocheck

	import ItemRarityText from './ItemRarityText.svelte';
	import { modalButtonState } from './../../routes/user/stores.js';
	import MathItemType from './types/MathItemType.svelte';
    import { Button, Flex, Group, SimpleGrid } from '@svelteuidev/core';
    export let item;
    import { createEventDispatcher } from 'svelte';

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