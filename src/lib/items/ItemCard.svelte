<script>
import { Button, Flex } from '@svelteuidev/core';

/**
 * @type {String} itemName
 */
export let itemName;


function useClicked(name) {
    console.log('use' + name)
    dispatch('message', {
        text: name
    })
    
}

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();    

</script>


<div>
    <Flex justify="center">
        <img src="items/1.png" alt="random image" />
    </Flex>
    <Button on:click={useClicked(itemName)} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}} ripple>
        {itemName}
    </Button>
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
