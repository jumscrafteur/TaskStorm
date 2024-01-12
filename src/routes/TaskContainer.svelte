<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';

	import { ChevronDown } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';

	export let projects: Project[];
	export let tasks: Task[];

	const sections: { [nuproject_name: string]: Task[] } = {
		'Standalone tasks': tasks.filter((task) => task.project_id == null)
	};
	projects.map(
		(project) => (sections[project.name] = tasks.filter((task) => task.project_id == project.id))
	);
</script>

{#each Object.entries(sections) as [key, value]}
	<Collapsible.Root class="space-y-2" open={false}>
		<div class="flex items-center justify-between space-x-4 border-b px-4">
			<h4 class="text-sm font-semibold">{key}</h4>
			<Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm" class=" w-9 p-0">
					<ChevronDown
						class={twMerge('h-4 w-4', builder['data-state'] == 'open' && 'rotate-180')}
					/>
					<span class="sr-only">Toggle</span>
				</Button>
			</Collapsible.Trigger>
		</div>
		<Collapsible.Content class="space-y-2">
			{#each value as task}
				<div class="rounded-md border px-4 py-3 font-mono text-sm">{task.name}</div>
			{/each}
		</Collapsible.Content>
	</Collapsible.Root>
{/each}
