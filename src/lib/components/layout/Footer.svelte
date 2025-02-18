<script>
	import { SITE_NAME } from '$lib/config';
	import { DiscordLogo, Heart, TwitterLogo } from 'phosphor-svelte';
</script>

<div class="flex bg-secondary">
	<div class="container flex flex-col place-content-evenly py-4 mx-auto h-28 text-subtext0">
		<div class="flex gap-3 mx-auto divide-x-2 divide-overlay0">
			<div class="flex gap-2">
				<img class="h-9 grayscale" src="/img/ReviliumCatCropped.png" alt="" />
				<p class="my-auto text-2xl font-bold tracking-widest">{SITE_NAME}</p>
			</div>
			<!-- socials -->
			<div class="flex gap-3 pl-3">
				<a
					class="flex transition-all hover:text-overlay0"
					href="https://x.com/reviliumxyz"
					target="_blank"
				>
					<TwitterLogo class="my-auto" size="20" />
				</a>
				<a class="flex transition-all hover:text-overlay0" href="/discord" target="_blank">
					<DiscordLogo class="my-auto" size="20" />
				</a>
			</div>
		</div>
		<div class="flex gap-4 mx-auto">
			<a class="underline transition-all hover:text-overlay0" href="/legal/terms">
				Terms of Service
			</a>
			<a class="underline transition-all hover:text-overlay0" href="/legal/privacy">
				Privacy Policy
			</a>
			<a class="underline transition-all hover:text-overlay0" href="/legal/dmca">DMCA</a>
		</div>
	</div>
</div>
