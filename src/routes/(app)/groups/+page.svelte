<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import Tab from '$lib/components/TabbedContainer/Tab.svelte';
	import { writable, type Writable } from 'svelte/store';
	import Friend from '$lib/components/users/Circle.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	const tab: Writable<'members' | 'games' | 'store' | 'allies'> = writable('members');
</script>

<PageMeta title="Groups" />

<div class="flex gap-3 w-full">
	<div class="flex flex-col w-[25%]">
		<div class="flex flex-col w-full">
			<div class="flex flex-col gap-3 w-full">
				<button
					class="flex gap-2 p-2 w-full rounded-md transition-all bg-secondary hover:bg-overlay0"
				>
					<img class="w-12 h-12" src="/img/ReviliumCat.png" alt="" />
					<p class="my-auto text-clip">ReviliumCat</p>
				</button>

				<div class="flex flex-col w-full rounded-md bg-secondary">
					<div class="flex flex-col p-3 w-full">
						<TextInput type="text" name="search" placeholder="Search Groups" />
					</div>
					<div class="flex flex-col rounded-md">
						{#each Array(5) as _}
							<button
								class="flex gap-2 p-2 w-full transition-all hover:bg-overlay0 last:rounded-b-md"
							>
								<img class="w-12 h-12" src="/img/ReviliumCat.png" alt="" />
								<p class="my-auto text-clip">ReviliumCat</p>
							</button>
						{/each}
					</div>
				</div>
			</div>
			<div>
				<!-- create group button -->
			</div>
		</div>
	</div>

	<div class="flex flex-col w-[75%]">
		<div class="flex flex-col gap-2 w-full">
			<div class="p-4 w-full rounded-md shadow-lg bg-secondary">
				<div class="flex w-full">
					<img class="w-32 h-32" src="/img/ReviliumCat.png" alt="" />
					<div class="flex flex-col place-content-between ml-4">
						<div>
							<p class="text-3xl font-bold">ReviliumCat</p>
							<p class="text-lg">
								By <a class="font-bold hover:underline" href="/user/1/profile">cirro</a>
							</p>
						</div>
						<div class="flex gap-6 text-sm">
							<div class="flex gap-2">
								<p class="text-lg font-bold">5M+</p>
								<p class="my-auto text-subtext0">Members</p>
							</div>
							<div class="flex gap-2">
								<p class="text-lg font-bold">Bill clinton</p>
								<p class="my-auto text-subtext0">Rank</p>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-1 w-full">
					<p class="text-xl font-bold">Description</p>
					<p class="w-full whitespace-pre-line text-subtext0">
						hello everybody my name is markiplier
					</p>
				</div>
			</div>

			<div class="p-4 w-full rounded-md shadow-lg bg-secondary">
				<div class="flex flex-col gap-1 w-full">
					<p class="text-xl font-bold">Shout</p>
					<p class="w-full whitespace-pre-line text-subtext0">
						Hello friend this part of the page is not finished
					</p>
				</div>
			</div>

			<div class="flex w-full rounded-md shadow-lg bg-secondary">
				<Tab store={tab} tabName={'members'}>Members</Tab>
				<Tab store={tab} tabName={'games'}>Games</Tab>
				<Tab store={tab} tabName={'store'}>Store</Tab>
				<Tab store={tab} tabName={'allies'}>Allies</Tab>
			</div>

			<div class="flex gap-2 p-2.5 w-full h-40 rounded-md shadow-lg bg-secondary">
				<Friend username="cirro" id="1" render="null" />
			</div>

			<div class="p-4 w-full rounded-md shadow-lg bg-secondary">
				<div class="flex flex-col gap-1 w-full">
					<p class="text-xl font-bold">Wall</p>
					<p class="w-full whitespace-pre-line text-subtext0">
						Hello friend this part of the page is not finished
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
