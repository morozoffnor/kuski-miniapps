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


<div class="container">
    <Flex justify="center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img src={"/items/" + itemObj.icon } alt="item" on:click={useClicked(itemObj._id)} />
    </Flex>
    <div class="button">
		<Button on:click={useClicked(itemObj._id)} color="gray"  ripple>
			{itemObj.rarity}
		</Button>
    </div>
    
</div>


<style>
    .container {
        align-self: center;
        margin: auto;
        display: table;
    }
    .button {
        margin-left: auto;
        margin-right: auto;
        display: table;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        align-self: center;
		width: 80px;
    }
</style>
