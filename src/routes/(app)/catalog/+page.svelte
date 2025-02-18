<script lang="ts">
	import { goto } from '$app/navigation';
	import Asset from '$lib/components/catalog/Asset.svelte';
	import CategoryButton from '$lib/components/catalog/CategoryButton.svelte';
	import CategoryDropdown from '$lib/components/catalog/CategoryDropdown.svelte';
	import CategoryDropdownButton from '$lib/components/catalog/CategoryDropdownButton.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { CaretRight, CaretLeft, Spinner } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import { page } from '$app/stores';

	export let data;

	let queryIndex = Number(get(page).url.searchParams.get('page'));
	if (isNaN(queryIndex) || !isFinite(queryIndex)) queryIndex = 0;

	let catalogIndex = writable(queryIndex);
	let category = writable(get(page).url.searchParams.get('category') || 'all');
	let expandedCat = 'all';

	onMount(() => {
		category.subscribe((value) => {
			goto(`/catalog?category=${value}&page=0`);
			catalogIndex.set(0);
		});

		catalogIndex.subscribe((value) => {
			goto(`/catalog?category=${get(category)}&page=${value}`);
		});
	});
</script>

<PageMeta title="Catalog" description="Browse avatar items created by the community." />

<div class="flex gap-2 w-full">
	<div class="flex flex-col w-48">
		<p class="px-3 py-1.5 mb-1.5 text-lg font-bold rounded-md bg-secondary">Categories</p>
		<div class="rounded-md bg-secondary">
			<button
				class="px-3 py-1.5 w-full rounded-t-md transition-all {$category === 'all'
					? 'bg-overlay0'
					: 'hover:bg-zinc-500/30'}"
				on:click={() => {
					expandedCat = 'all';
					$category = 'all';
				}}
			>
				<p class="text-left">All Items</p>
			</button>

			<CategoryButton
				selected={expandedCat}
				id="clothing"
				on:click={() => (expandedCat = 'clothing')}
			>
				Clothing
			</CategoryButton>
			<CategoryDropdown selected={expandedCat} id="clothing">
				<CategoryDropdownButton
					selected={$category}
					id="shirts"
					on:click={() => ($category = 'shirts')}
				>
					Shirts
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="tshirts"
					on:click={() => ($category = 'tshirts')}
				>
					T-Shirts
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="pants"
					on:click={() => ($category = 'pants')}
				>
					Pants
				</CategoryDropdownButton>
			</CategoryDropdown>

			<CategoryButton
				selected={expandedCat}
				id="accessories"
				on:click={() => (expandedCat = 'accessories')}
			>
				Accessories
			</CategoryButton>
			<CategoryDropdown selected={expandedCat} id="accessories">
				<CategoryDropdownButton
					selected={$category}
					id="accessories_head"
					on:click={() => ($category = 'accessories_head')}
				>
					Head
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_face"
					on:click={() => ($category = 'accessories_face')}
				>
					Face
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_neck"
					on:click={() => ($category = 'accessories_neck')}
				>
					Neck
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_shoulder"
					on:click={() => ($category = 'accessories_shoulder')}
				>
					Shoulder
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_front"
					on:click={() => ($category = 'accessories_front')}
				>
					Front
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_back"
					on:click={() => ($category = 'accessories_back')}
				>
					Back
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="accessories_waist"
					on:click={() => ($category = 'accessories_waist')}
				>
					Waist
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="gear"
					on:click={() => ($category = 'gear')}
				>
					Gear
				</CategoryDropdownButton>
			</CategoryDropdown>

			<CategoryButton selected={expandedCat} id="other" on:click={() => (expandedCat = 'other')}>
				Other
			</CategoryButton>
			<CategoryDropdown selected={expandedCat} id="other">
				<CategoryDropdownButton
					selected={$category}
					id="models"
					on:click={() => ($category = 'models')}
				>
					Models
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="decals"
					on:click={() => ($category = 'decals')}
				>
					Decals
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="images"
					on:click={() => ($category = 'images')}
				>
					Images
				</CategoryDropdownButton>
				<CategoryDropdownButton
					selected={$category}
					id="meshes"
					on:click={() => ($category = 'meshes')}
				>
					Meshes
				</CategoryDropdownButton>
			</CategoryDropdown>
		</div>
	</div>
	<div class="flex flex-col p-3 w-full rounded-md bg-secondary">
		<div class="flex place-content-between text-2xl">
			<div class="flex">
				<p class="font-bold">Catalog</p>
				<p class="px-2 text-subtext0">-</p>
				<p class="text-subtext0">{$category}</p>
			</div>
			<div class="flex h-9 text-lg">
				<TextInput type="text" name="search" placeholder="Search" />
			</div>
		</div>

		<div class="flex my-1">
			<HorizontalRule />
		</div>

		<div class="min-h-[36rem] grid grid-cols-8 gap-0.5 grid-rows-3">
			{#each data.assets as asset}
				<Asset {asset} />
			{/each}

			<!-- <Spinner class="col-span-8 row-span-3 m-auto animate-spin text-overlay0" size="40" /> -->
		</div>

		<div class="flex my-1">
			<HorizontalRule />
		</div>

		<div class="flex place-content-center">
			<button
				class="p-2 my-auto rounded-md transition-colors hover:bg-overlay0"
				on:click={() => {
					if ($catalogIndex <= 0) return;
					$catalogIndex -= 1;
				}}
			>
				<CaretLeft />
			</button>
			<p class="p-2 my-auto">{$catalogIndex + 1} / {Math.ceil(data.totalAssets / 24)}</p>
			<button
				class="p-2 my-auto rounded-md transition-colors hover:bg-overlay0"
				on:click={() => {
					if ($catalogIndex >= Math.ceil(data.totalAssets / 24) - 1) return;
					$catalogIndex += 1;
				}}
			>
				<CaretRight />
			</button>
		</div>
	</div>
</div>
