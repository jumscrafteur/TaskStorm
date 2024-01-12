<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import DraftContainer from './DraftContainer.svelte';
	import ProjectContainer from './ProjectContainer.svelte';

	export let data: PageData;
	let { drafts, projects, tasks } = data;
</script>

<h1 class="select2-dropdown border-b-2 border-black text-3xl">My Drafts</h1>
<DraftContainer {drafts}></DraftContainer>

<!-- <div class="grid grid-cols-2 gap-4"> -->
<div class="flex flex-col gap-4 py-4">
	<h1 class="select2-dropdown border-b-2 border-black p-3 text-3xl">My Projects</h1>
	<Button href="/project/new">New Project</Button>
	<ProjectContainer {projects}></ProjectContainer>
</div>
<!-- <div class="flex flex-col gap-4 py-4">
		<h1 class="select2-dropdown border-b-2 border-black p-3 text-3xl">My Tasks</h1>
		<TaskContainer {tasks} {projects}></TaskContainer>
	</div> -->
<!-- </div> -->
