<script lang="ts">
	import { onMount } from 'svelte';

	let elm: HTMLImageElement;

	onMount(() => {
		const images = ['/img/AdSkyscraper1.png', '/img/AdSkyscraper2.png', '/img/AdSkyscraper3.png'];
		const image = images[Math.floor(Math.random() * images.length)];
		elm.src = image;
	});
</script>

<div class="float-left px-6 py-32">
	<img class="" src="/img/AdSkyscraperTemplate.png" alt="" bind:this={elm} />
</div>
