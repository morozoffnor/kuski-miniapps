<script>
// @ts-nocheck

import { Button, Flex } from '@svelteuidev/core';

/**
 * @type {Object} itemName
 */
export let itemObj;


function useClicked(id) {
    console.log('use' + id)
    dispatch('message', {
        text: id
    })
    
}

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

</script>


<div>
    <Flex justify="center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img src={"/items/" + itemObj.icon } alt="item" on:click={useClicked(itemObj._id)} />
    </Flex>
    {#if itemObj.rarity === "Common"}
    <Button on:click={useClicked(itemObj._id)} variant='gradient' gradient={{ from: 'gray', to: 'cyan', deg: 23 }} ripple>
        {itemObj.name}
    </Button>
    {:else if itemObj.rarity === "Uncommon"}
    <Button on:click={useClicked(itemObj._id)} variant='gradient' gradient={{ from: 'cyan', to: 'lime', deg: 23 }} ripple>
        {itemObj.name}
    </Button>
    {:else if itemObj.rarity === "Rare"}
    <Button on:click={useClicked(itemObj._id)} variant='gradient' gradient={{ from: 'lime', to: 'orange', deg: 23 }} ripple>
        {itemObj.name}
    </Button>
    {:else if itemObj.rarity === "Legendary"}
    <Button on:click={useClicked(itemObj._id)} variant='gradient' gradient={{ from: 'yellow', to: 'red', deg: 23 }} ripple>
        {itemObj.name}
    </Button>
    {/if}
</div>


<style>
    div {
        align-self: center;
        margin: auto;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        align-self: center;
    }
</style>
