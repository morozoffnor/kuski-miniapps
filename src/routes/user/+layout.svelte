<script>
	import NCFail from './../../lib/items/NCFail.svelte';
    import NC from './../../lib/items/NC.svelte';
	import { notification } from './stores.js';

    $:  setTimeout(() => {
        $notification = 'none';
    }, 3000);

</script>

<!-- <svelte:component this={$notification} /> -->

{#if $notification === 'success'}
    <NC />
{/if}
{#if $notification === 'fail'}
        <NCFail />
{/if}
<slot />
