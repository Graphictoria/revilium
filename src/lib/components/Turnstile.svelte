<script>
	import { env } from '$env/dynamic/public';
	import { Turnstile } from 'svelte-turnstile';
</script>

<div class="h-[65px] overflow-clip">
	{#if env.PUBLIC_TURNSTILE_KEY}
		<Turnstile siteKey={env.PUBLIC_TURNSTILE_KEY} theme="dark" size="flexible" />
	{:else}
		<p>Turnstile is not enabled! Please specify site key!</p>
	{/if}
</div>
