<script>
	export let name,
		value = '',
		change = () => {};
</script>

<select
	class="p-1 rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
	{name}
	id={name}
	bind:value
	on:change={change}
>
	<slot />
</select>
