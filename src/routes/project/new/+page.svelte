<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import TagSelector from '$lib/tagSelector.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const { projects } = data;

	let availableTags: string[] = [];
	for (const project of projects) {
		for (const tag of project.labels) {
			if (!availableTags.includes(tag)) availableTags.push(tag);
		}
	}

	let selectedTags: string[] = [];
</script>

<h1 class="border-b-2 border-black text-3xl">New Project</h1>
<form method="post" action="/api/projects">
	<Card.Root class="mt-4 py-4">
		<Card.Content class="flex flex-col gap-4">
			<Input type="text" placeholder="Name" class="max-w text-lg font-bold" name="name" />
			<TagSelector {availableTags} bind:selectedTags></TagSelector>
			<Button type="submit">Create Project</Button>
		</Card.Content>
	</Card.Root>
	<input type="text" name="tags" value={selectedTags.join('~')} class="hidden" />
</form>
