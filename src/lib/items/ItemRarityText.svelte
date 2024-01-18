<script>
    import { Text } from '@svelteuidev/core'
    
    /**
	 * @type {string}
	 */
     export let rarity;
</script>

{#if rarity === "Common"}
<Text variant='gradient' size='xl' weight='bold' gradient={{ from: 'gray', to: 'cyan', deg: 23 }} >Common</Text>
{:else if rarity === "Uncommon"}
<Text variant='gradient' size='xl' weight='bold' gradient={{ from: 'cyan', to: 'lime', deg: 23 }} >Uncommon</Text>
{:else if rarity === "Rare"}
<Text variant='gradient' size='xl' weight='bold' gradient={{ from: 'lime', to: 'orange', deg: 23 }} >Rare</Text>
{:else if rarity === "Legendary"}
<Text variant='gradient' size='xl' weight='bold' gradient={{ from: 'yellow', to: 'red', deg: 23 }} >Legendary</Text>
{/if}