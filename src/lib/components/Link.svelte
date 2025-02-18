<script lang="ts">
	export let href: string;
</script>

<a
	class="transition-all text-accent hover:font-bold hover:text-overlay0 hover:tracking-wide"
	{href}
>
	<slot />
</a>
