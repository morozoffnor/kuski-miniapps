<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		ProgressBar,
		type PopupSettings,
		Modal,
		type ModalComponent, Toast
	} from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	// modals
	import { initializeStores, getModalStore } from '@skeletonlabs/skeleton';
	initializeStores();
	const modalStore = getModalStore();
	const modalRegistry: Record<string, ModalComponent> = {
		itemModalComponent: {ref: ItemModal},
		itemDebuffModalComponent: {ref: ItemDebuffModal}
	}
	// Dev
	import { tgUser, botUser } from '../stores/userStores';
	import {config} from '../stores/config';
	import {devUser} from '$lib/dev';
	import ItemModal from '$lib/Inventory/ItemModal.svelte';
	import ItemDebuffModal from '$lib/Inventory/ItemDebuffModal.svelte';


	export let data;
	$config = data.env

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let exp = 0;
	$: if ($botUser.lvl !== undefined) {
		exp = $botUser.lvl.exp
	}

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom-end',
	};

	onMount(async () => {
		let telegram = await window.Telegram.WebApp;
		telegram.expand();
		const obj = await window.Telegram.WebApp.initDataUnsafe;
		if (obj.user) {
			$tgUser = obj;
			// console.log($tgUser);
			let res = await fetch(
				`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUser.user.id}`,
				{
					headers: {
						'x-api-token': `${data.env.BOTAPI_TOKEN}`
					}
				}
			);
			$botUser = await res.json();

			// console.log($botUser);
		}
		if (data.env.ENV === 'dev') {
			$tgUser = devUser
			console.log($tgUser);
			let res = await fetch(
				`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUser.user.id}`,
				{
					headers: {
						'x-api-token': `${data.env.BOTAPI_TOKEN}`
					}
				}
			);
			$botUser = await res.json();
			// exp = $botUser.lvl.exp
			console.log($botUser);
		}
	})

</script>
<Modal components={modalRegistry}/>
<Toast />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">
					{#if $tgUser.user !== undefined}
						<div class="flex justify-center">
							{$tgUser.user.username}
							<span class="badge variant-filled ml-1 pl-2 pr-2">{Math.floor(exp/1000)}</span>
						</div>
					{:else}
						Kuski
					{/if}
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">

				<button class="btn variant-filled" use:popup={popupFeatured}>Menu</button>


				<div data-popup="popupFeatured">
					<div class="btn-group-vertical variant-filled">
						<a href="/" class="btn variant-filled" data-sveltekit-preload-data="hover">Inventory</a>
						<a href="/stats" class="btn variant-filled" data-sveltekit-preload-data="hover">Stats</a>
					</div>

				</div>

			</svelte:fragment>
		</AppBar>
		<ProgressBar label="Progress Bar" value={(exp % 1000)} max={1000} />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<svelte:head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
</svelte:head>
