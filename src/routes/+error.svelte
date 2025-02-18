<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title="Error" description="There's an error on this page." />

<div class="flex w-screen h-screen">
	<div class="m-auto">
		<div
			class="flex flex-col gap-1 p-3 w-96 rounded-md shadow-lg bg-secondary outline outline-1 outline-overlay0"
		>
			<div class="flex flex-col mx-auto">
				<div class="flex gap-2 mx-auto">
					<img class="h-12" src="/img/ReviliumCatCropped.png" alt="Revilium cat" />
					<p class="my-auto text-3xl font-bold tracking-wider">Revilium</p>
				</div>
			</div>
			<HorizontalRule />
			<img class="mb-1 aspect-square" src="https://snep.lol/download/WmSFpeUBGd" alt="" />
			<div>
				<Button
					style="primary"
					on:click={() => {
						window.history.back();
					}}
				>
					Go Back
				</Button>
			</div>
		</div>
	</div>
</div>

<!-- <div class="bg-black">
	<!-- svelte-ignore a11y-media-has-caption 
	<video
		class="object-cover absolute top-0 w-screen h-screen filter blur-lg -z-10"
		src={VIDEOS[Math.floor(Math.random() * VIDEOS.length)]}
		disablePictureInPicture={true}
		autoplay={true}
		loop={true}
		muted={true}
	>
		<script>
			document.currentScript.parentElement.volume = 0.05;
		</script>
	</video>
</div> -->
