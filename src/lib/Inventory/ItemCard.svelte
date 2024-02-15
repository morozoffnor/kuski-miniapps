<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ItemModal from '$lib/Inventory/ItemModal.svelte';
	import { Canvas } from '@threlte/core';
	import ObjectComponentCardNew from '$lib/3D/ObjectComponentCardNew.svelte';

	const modalStore = getModalStore();

	export let item

	const modal: ModalSettings = {
		type: 'component',
		component: 'itemModalComponent',
		title: item.name,
		body: item.description,
		meta: item
	};

	const debuffModal: ModalSetting = {
		type: 'component',
		component: 'itemDebuffModalComponent',
		title: item.name,
		body: item.description,
		meta: item
	}

	function triggerModal() {
		if (item.type === 'debuff') {
			modalStore.trigger(debuffModal);
		} else {
			modalStore.trigger(modal);
		}

	}

</script>


<div class="card card-hover cursor-pointer" on:click={triggerModal}>
	<header class="card-header flex justify-center">
		<img src={"/items/" + item.icon } alt="item"/>
	</header>
	<section class="p-4 text-center">
		{item.name}
	</section>
</div>
