<script lang="ts">
	import { browser } from '$app/environment';
	import Missing from '$lib/img/Missing.png';

	export let src: string = '0',
		classes = '';
	let image: HTMLImageElement;

	$: (() => {
		if (browser) {
			if (src || src !== '0') {
				const source = `${origin}/api/thumbnail/${src}`;
				const preload = new Image();
				preload.addEventListener('load', () => (image.src = source));
				preload.src = source;
			}
		}
	})();
</script>

<img class="{classes} object-cover" src={Missing} alt="" bind:this={image} />
