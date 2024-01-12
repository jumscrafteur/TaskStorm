<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Command from '$lib/components/ui/command';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Textarea } from '$lib/components/ui/textarea';
	import StateSelector from '$lib/stateSelector.svelte';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { draft, projects } = data;

	let linkProject = false;

	const projectList = projects.map((project) => ({
		value: project.id.toString(),
		label: project.name
	}));

	let open = false;
	let selectedProject = '';

	$: selectedValue =
		projectList.find((f) => f.value === selectedProject)?.label ?? 'Select a framework...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<h1 class="border-b-2 border-black text-3xl">Modification of : {draft.name}</h1>
<form method="post" action="/api/tasks">
	<input type="text" value={draft.id} class="hidden" name="draft_id" />
	<Card.Root class="mt-4 py-4">
		<Card.Content class="flex flex-col gap-4">
			<Input type="text" value={draft.name} class="max-w text-lg font-bold" name="name" />
			<Textarea rows={10} value="" name="description"></Textarea>
			<StateSelector></StateSelector>
			<Card.Root class="py-4">
				<Card.Content class="flex flex-col gap-4">
					<div class="flex items-center space-x-2">
						<Checkbox id="link" bind:checked={linkProject} />
						<Label for="link" class="text-lg">Link To a project</Label>
					</div>

					<Popover.Root bind:open let:ids>
						<Popover.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								role="combobox"
								aria-expanded={open}
								class="w-full justify-between"
								disabled={!linkProject}
							>
								{selectedValue}
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-full max-w-4xl p-0">
							<Command.Root>
								<Command.Input placeholder="Search framework..." />
								<Command.Empty>No framework found.</Command.Empty>
								<Command.Group>
									{#each projectList as framework}
										<Command.Item
											value={framework.value}
											onSelect={(currentValue) => {
												selectedProject = currentValue;
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											<Check
												class={cn(
													'mr-2 h-4 w-4',
													selectedProject !== framework.value && 'text-transparent'
												)}
											/>
											{framework.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</Card.Content>
			</Card.Root>
			<div class="hidden">
				<input type="text" name="project" value={selectedProject} />
			</div>
			<Button type="submit">Update</Button>
		</Card.Content>
	</Card.Root>
</form>
