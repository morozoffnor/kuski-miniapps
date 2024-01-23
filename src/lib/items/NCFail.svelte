<script>
	import { Notification } from '@svelteuidev/core';
	import { Cross2 } from 'radix-icons-svelte';
    import { fade } from 'svelte/transition'
    import { circInOut } from 'svelte/easing'
    let y = 0;


</script>

<svelte:window bind:scrollY={y} />

<div class="notification-container" class:sticky={y >= 0} transition:fade={{duration: 300, easing: circInOut}}>
    <Notification class="nc" icon={Cross2} color='red'>
		Что-то пошло не так потому что Игорь не умеет программировать
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