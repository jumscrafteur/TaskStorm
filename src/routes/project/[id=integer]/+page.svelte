<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import * as Table from '$lib/components/ui/table';

	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { CheckSquare2, MinusSquare, Square, XSquare } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { project, tasks } = data;

	let statePercentage = {
		'in progress': 0,
		'on hold': 0,
		done: 0,
		canceled: 0
	};

	$: {
		statePercentage = {
			'in progress': 0,
			'on hold': 0,
			done: 0,
			canceled: 0
		};

		tasks.forEach((task) => {
			statePercentage[task.state] += 100 / tasks.length;
		});
	}

	const stateColors = {
		'in progress': 'neutral-500',
		'on hold': 'amber-500',
		done: 'emerald-500',
		canceled: 'red-500'
	};

	let openPanels = tasks.map((_) => false);

	const updateTask = async (task: Task, state: State, index: number) => {
		let newTask = {
			...task,
			state
		};

		await fetch(`/api/tasks/${task.id}`, {
			method: 'PUT',
			body: JSON.stringify(newTask)
		});

		tasks = tasks.map((task) => (task.id == newTask.id ? newTask : task));

		openPanels[index] = false;
	};
</script>

<!-- {JSON.stringify(data)} -->

<h1 class=" text-3xl">{project.name}</h1>
<div class="flex h-2 w-full overflow-hidden rounded">
	<div style="width: {statePercentage['in progress']}%" class="h-full bg-neutral-500"></div>
	<div style="width: {statePercentage['on hold']}%" class="h-full bg-amber-500"></div>
	<div style="width: {statePercentage['done']}%" class="h-full bg-emerald-500"></div>
	<div style="width: {statePercentage['canceled']}%" class="h-full bg-red-500"></div>
</div>

<p>{project.description}</p>

<Table.Root class="mt-3">
	<Table.Header>
		<Table.Row class="border-l-2 border-white">
			<Table.Head class="w-[100px]">State</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Description</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each tasks as task, index (task.id)}
			<Table.Row>
				<Table.Cell
					class={cn(
						'flex items-center gap-2 border-l-2 font-medium',
						'border-' + stateColors[task.state]
					)}
				>
					<Popover.Root bind:open={openPanels[index]} let:ids>
						<Popover.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="ghost"
								role="combobox"
								aria-expanded={openPanels[index]}
								class="justify-between"
							>
								{#if task.state == 'in progress'}
									<Square></Square>
								{:else if task.state == 'on hold'}
									<MinusSquare class="text-amber-500"></MinusSquare>
								{:else if task.state == 'done'}
									<CheckSquare2 class="text-emerald-500"></CheckSquare2>
								{:else if task.state == 'canceled'}
									<XSquare class="text-red-500"></XSquare>
								{/if}
							</Button>
						</Popover.Trigger>
						<Popover.Content align="start" class="flex max-w-4xl flex-col p-2">
							<Button
								variant="ghost"
								class="flex justify-start gap-2"
								on:click={() => updateTask(task, 'in progress', index)}
							>
								<Square /> In Progress
							</Button>
							<Button
								variant="ghost"
								class="flex justify-start gap-2"
								on:click={() => updateTask(task, 'on hold', index)}
							>
								<MinusSquare class="text-amber-500" /> On Hold
							</Button>
							<Button
								variant="ghost"
								class="flex justify-start gap-2 "
								on:click={() => updateTask(task, 'done', index)}
							>
								<CheckSquare2 class="text-emerald-500" /> Done
							</Button>
							<Button
								variant="ghost"
								class="flex justify-start gap-2 "
								on:click={() => updateTask(task, 'canceled', index)}
							>
								<XSquare class="text-red-500" /> Canceled
							</Button>
						</Popover.Content>
					</Popover.Root>
				</Table.Cell>
				<Table.Cell>{task.name}</Table.Cell>
				<Table.Cell>{task.description}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
