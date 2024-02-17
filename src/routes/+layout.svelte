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
	import {getCookie, setCookie} from 'svelte-cookie'

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
	import { tgUser, botUser, cookieSet } from '../stores/userStores';
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
			setCookie('userid', $tgUser.user.id)

			// console.log($botUser);
		}
		// if (data.env.ENV === 'dev') {
		// 	$tgUser = devUser
		// 	console.log($tgUser);
		// 	let res = await fetch(
		// 		`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${$tgUser.user.id}`,
		// 		{
		// 			headers: {
		// 				'x-api-token': `${data.env.BOTAPI_TOKEN}`
		// 			}
		// 		}
		// 	);
		// 	$botUser = await res.json();
		// 	setCookie('userid', $tgUser.user.id)
		// 	// exp = $botUser.lvl.exp
		// 	console.log($botUser);
		// }
		if (getCookie('userid')) {
			cookiePresent = true
			$cookieSet.userid = true
			let res = await fetch(
				`${data.env.BOTAPI_HOST}:${data.env.BOTAPI_PORT}/user/${getCookie('userid')}`,
				{
					headers: {
						'x-api-token': `${data.env.BOTAPI_TOKEN}`
					}
				}
			);
			$botUser = await res.json();
		}
 	})
	let cookiePresent = false
	let menu = '/icons/menu-grid-svgrepo-com.svg'

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
					{#if $botUser.userName !== undefined}
						<div class="flex justify-center">
							{$botUser.userName}
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
						{#if !$cookieSet.userid}
							<a href="/auth" data-sveltekit-preload-data="hover"><button>Auth</button></a>
						{/if}
						<a href="/" data-sveltekit-preload-data="hover"><button>Inventory</button></a>
						<a href="/stats" data-sveltekit-preload-data="hover"><button>Stats</button></a>
						<a href="/3d" data-sveltekit-preload-data="hover"><button>Test 3D</button></a>

					</div>
					<div class="arrow variant-filled" />
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
