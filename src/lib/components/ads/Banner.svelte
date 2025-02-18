<script lang="ts">
	import { onMount } from 'svelte';
	import Missing from '$lib/img/Missing.png';

	let elm: HTMLImageElement;

	onMount(() => {
		const images = ['/img/AdBanner1.png', '/img/AdBanner2.png', '/img/AdBanner3.png'];
		const image = images[Math.floor(Math.random() * images.length)];
		elm.src = image;
	});
</script>

<div class="mb-4">
	<img class="mx-auto w-[728px] h-[90px] object-cover" src={Missing} alt="" bind:this={elm} />
</div>
