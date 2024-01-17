<script>
	import { modalButtonState } from './../../routes/user/stores.js';
	import MathItemType from './types/MathItemType.svelte';
    import { Button, Flex, Text } from '@svelteuidev/core';
    export let item;
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function useClicked(name) {
        console.log('use ' + name)
        dispatch('message', {
            text: name
        })
    }

    function useItem(name) {
        console.log('use ' + name)
        dispatch('message', {
            text: name,
            type: 'useItem'
        })
    
    }

</script>

<Text
        component='span'
        align='center'
        variant='gradient'
        size='xl'
        weight='bold'
        gradient={{ from: 'red', to: 'yellow', deg: 75 }} 
    >
        Предметы можно тыкать, они пока ни на что не влияют 
        <br>
        (после обновления страницы всё вернётся)
    </Text>
<p>
    {item.description}
</p>

{#if item.type === 'math'}
    <MathItemType />
{:else}
    нихуя
{/if}
<br>

<Flex justify="space-around" gap="xs">
	{#if $modalButtonState === 'none'}
        <Button 
            on:click={() => {
                useItem(item.name)
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