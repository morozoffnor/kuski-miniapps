<script lang="ts" async>
	import type { SvelteComponent } from 'svelte';

	import {config, type Config} from '../../stores/config'
	import { invalidateAll } from "$app/navigation";


	// Stores
	import { getModalStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { botUser } from '../../stores/userStores';
	import ObjectComponentCard from '$lib/3D/ObjectComponentCard.svelte';
	import { Canvas } from '@threlte/core';
	import MonolithModel from '$lib/3D/MonolithModel.svelte';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	// Form Data
	const formData = {
		name: 'Jane Doe',
		tel: '214-555-1234',
		email: 'jdoe@email.com'
	};



	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	async function useItem() {

		const reqData = {
			userId: String($botUser.userid),
			itemId: $modalStore[0].meta._id
		}
		console.log(reqData)
		await fetch(
			`${$config.BOTAPI_HOST}:${$config.BOTAPI_PORT}/items/use`,
			{
				method: "POST",
				headers: {
					'x-api-token': `${$config.BOTAPI_TOKEN}`,
					'Content-Type': "application/json"
				},
				body: JSON.stringify(reqData)
			}
		).then(async (res) => {
			if (res.ok) {
				let itemObj = $botUser.items.find((item) => item._id == $modalStore[0].meta._id);
				$botUser.items.splice(itemObj, 1);
				$botUser = $botUser
				const toast: ToastSettings = {
					background: "variant-filled-success",
					message: 'Предмет успешно использован!',
				};
				modalStore.close();
				toastStore.trigger(toast);
				await invalidateAll();
				setTimeout(() => {
					handleReload()
				}, 500);
			} else {
				const toast: ToastSettings = {
					background: "variant-filled-error",
					message: 'Ошибка! Игорь не умеет программировать',
				};
				modalStore.close();
				toastStore.trigger(toast);


			}

		})
	}
	function handleReload() {
		window.location.reload(); // Reloads page from server
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}

	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>


		<div class="max-h-[200px] overflow-auto space-y-4">
			<article>
				{$modalStore[0].body ?? '(body missing)'}
			</article>
		</div>

		{#if $modalStore[0].title === "Монолит"}
			<Canvas size={{height: 200, width: 300}}>
				<MonolithModel/>
			</Canvas>
		{/if}


		<!-- Enable for debugging: -->
		<blockquote class="blockquote mt-0">
			<p>Эффекты:</p>
			{#if $modalStore[0].meta.effect.title !== ''}

				{$modalStore[0].meta.effect.title}

				<br/>
			{/if}
			{#each $modalStore[0].meta.effect.descriptions as desc}
				・{desc}
				<br/>
			{/each}
		</blockquote>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Назад</button>
			<button class="btn {parent.buttonPositive}" on:click={useItem} data-sveltekit-reload>Использовать</button>
		</footer>
	</div>
{/if}