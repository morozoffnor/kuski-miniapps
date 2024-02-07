<script>
	import { Notification } from '@svelteuidev/core';
	import { Check } from 'radix-icons-svelte';
    import { fade } from 'svelte/transition'
    import { circInOut } from 'svelte/easing'
	import {notificationText} from '../../routes/user/stores.js';

	let y = 0;


</script>

<svelte:window bind:scrollY={y} />

<div class="notification-container" class:sticky={y >= 0} transition:fade={{duration: 300, easing: circInOut}}>
    <Notification class="nc" icon={Check} color='teal'>
		{#if $notificationText}
			{$notificationText}
		{:else}
			The item fill take effect on next size
		{/if}
	</Notification>
   </div>

<style>
    .notification-container {
        z-index: 10;
        right: 0;
        left: 0;
        margin-left: auto;
		margin-right: auto;
		position: relative;
		margin-top: 5px;
		margin-bottom: 5px;
        
    }
    .sticky {
	position: fixed;
	top: 0;
	width: 100%;
    }	
</style>