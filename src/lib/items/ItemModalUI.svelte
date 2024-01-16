<script>
	import MathItemType from './types/MathItemType.svelte';
    import { Button, Flex, Paper } from '@svelteuidev/core';
    export let item;
</script>
<p>
    {item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}
</p>

{#if item.type === 'math'}
    <MathItemType />
{:else}
    нихуя
{/if}
<br>

<Flex justify="space-around" gap="xs">
	<Button variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}} ripple>
        Use item
    </Button>
	<Button variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}} ripple>
        Cancel
    </Button>
</Flex>