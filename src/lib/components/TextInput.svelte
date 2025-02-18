<script lang="ts">
	export let type: 'username' | 'email' | 'password' | '2fa' | 'text',
		name: string,
		placeholder: string,
		value: string | undefined = undefined;
</script>

{#if type === 'username'}
	<input
		class="p-1 rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
		type="username"
		id={name}
		{name}
		{placeholder}
		bind:value
	/>
{:else if type === 'email'}
	<input
		class="p-1 rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
		type="email"
		id={name}
		{name}
		{placeholder}
		bind:value
	/>
{:else if type === 'password'}
	<input
		class="p-1 rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
		type="password"
		id={name}
		{name}
		{placeholder}
		bind:value
	/>
{:else if type === '2fa'}
	<input
		class="p-1 rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
		type="number"
		id={name}
		{name}
		{placeholder}
		bind:value
	/>
{:else if type === 'text'}
	<input
		class="p-1 rounded-md border-2 border-overlay0 bg-surface0 placeholder:text-overlay0 peer"
		type="text"
		id={name}
		{name}
		{placeholder}
		bind:value
	/>
{/if}
