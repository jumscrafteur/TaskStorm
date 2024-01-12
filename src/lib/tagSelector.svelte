<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { X } from 'lucide-svelte';

	export let availableTags: string[];
	let search = '';
	export let selectedTags: string[];

	$: validTags = availableTags.filter((tag) => {
		return tag.includes(search) && search != '' && !selectedTags.includes(tag);
	});
</script>

<div class="relative flex flex-grow items-center gap-3 rounded-md border">
	{#if selectedTags.length != 0}
		<div class="ml-3 flex gap-3 py-3">
			{#each selectedTags as tag}
				<Badge variant="outline" class="flex gap-1 px-2 py-1">
					<p class="p-0">{tag}</p>
					<Button
						variant="ghost"
						class="h-5 w-5 p-0"
						on:click={() => {
							selectedTags = selectedTags.filter((selectedTag) => selectedTag != tag);
						}}
					>
						<X size="16" />
					</Button>
				</Badge>
			{/each}
		</div>
	{/if}

	<Input
		type="text"
		placeholder="search a tag"
		class="w-full border-0"
		bind:value={search}
		on:keydown={(e) => {
			if (e.key == 'Enter') {
				e.preventDefault();
				let tag = validTags.length > 0 ? validTags[0] : search;
				selectedTags = [...selectedTags, tag];
				search = '';
			}
		}}
	/>

	{#if search.length != 0}
		<div class="absolute top-full z-10 mt-2 flex w-full flex-col rounded-md border bg-white p-3">
			{#if validTags.length != 0}
				{#each validTags as tag}
					<p>
						{tag}
					</p>
				{/each}
			{:else}
				<p>
					add {search} tag
				</p>
			{/if}
		</div>
	{/if}
</div>
