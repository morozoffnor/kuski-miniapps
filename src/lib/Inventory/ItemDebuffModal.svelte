<script lang="ts" async>
	import type { SvelteComponent } from 'svelte';

	import {config, type Config} from '../../stores/config'


	// Stores
	import { getModalStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { botUser } from '../../stores/userStores';

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
	// function onFormSubmit(): void {
	// 	if ($modalStore[0].response) $modalStore[0].response(formData);
	// 	modalStore.close();
	// }

	async function getActiveUsers() {
		const res = await fetch(
			`${$config.BOTAPI_HOST}:${$config.BOTAPI_PORT}/items/activeUsers`,
			{
				method: "GET",
				headers: {
					'x-api-token': `${$config.BOTAPI_TOKEN}`,
					'Content-Type': "application/json"
				}
			}
		)
		const resData = await res.json()

		console.log(resData)
		return createLabels(resData.users)
	}

	async function createLabels(resData) {
		console.log(resData)
		let arr = []
		for (let i=0; i < resData.length; i++) {
			let user = resData[i]
			// this is in case I want to disable self use
			// if (user.userid !== $botUser.userid) {
			// 	arr.push({
			// 		label: user.userName,
			// 		value: user.userid
			// 	})
			// }
			console.log(user)
			arr.push({
				label: user.userName,
				value: user.userid
			})
		}
		console.log(arr)
		return arr
	}

	async function useItem() {

		const reqData = {
			userId: String($botUser.userid),
			itemId: $modalStore[0].meta._id,
			target: selectedTarget
		}
		console.log(reqData)
		await fetch(
			`${$config.BOTAPI_HOST}:${$config.BOTAPI_PORT}/items/use/debuff`,
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
	let selectedTarget = "тетс"

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
			<article>{$modalStore[0].body ?? '(body missing)'}</article>
		</div>


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
<!--		<label class="label">-->
<!--			<span>Выбери жертву</span>-->
<!--			<select class="select" bind:value={selectedTarget}>-->
<!--				<option value="1">Option 1</option>-->
<!--				<option value="2">Option 2</option>-->
<!--				<option value="3">Option 3</option>-->
<!--				<option value="4">Option 4</option>-->
<!--				<option value="5">Option 5</option>-->
				{#await getActiveUsers()}
					Загружаем активных пользователей...
				{:then users}
					{#if users.length < 1}
						Никто не производил замеров сегодня
					{:else}
						<label class="label">
							<span>Выбери жертву</span>
							<select class="select" bind:value={selectedTarget}>
						{#each users as user}
							<option value={user.value}>{user.label}</option>
						{/each}
							</select>
						</label>
					{/if}
				{/await}
<!--			</select>-->

<!--		</label>-->
		<!-- prettiesr-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Назад</button>
			<button class="btn {parent.buttonPositive}" on:click={useItem} data-sveltekit-reload>Использовать</button>
		</footer>
	</div>
{/if}