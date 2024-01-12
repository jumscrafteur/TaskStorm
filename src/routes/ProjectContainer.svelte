<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { CheckSquare2, MinusSquare, Square, XSquare } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';

	export let projects: {
		id: number;
		name: String;
		description: String;
		labels: string[];
		state: 'in progress' | 'on hold' | 'done' | 'canceled';
	}[];

	let searchFilter = '';

	let visibilityFilter = {
		'in progress': true,
		'on hold': false,
		done: false,
		canceled: false
	};

	$: filteredProjects = projects.filter((project) => {
		let textFilter =
			searchFilter == '' ||
			project.name.includes(searchFilter) ||
			project.description.includes(searchFilter);

		let labelsFilter = false;
		for (const label of project.labels) {
			labelsFilter = labelsFilter || label.includes(searchFilter);
		}

		let stateFilter = visibilityFilter[project.state];

		return (textFilter || labelsFilter) && stateFilter;
		// return stateFilter;
	});
</script>

<div class="grid grid-cols-8 gap-2">
	<Input type="text" placeholder="🔍 Search" class="col-span-4" bind:value={searchFilter} />
	<Toggle
		variant="outline"
		aria-label="Toggle In progess"
		bind:pressed={visibilityFilter['in progress']}>In progess</Toggle
	>
	<Toggle variant="outline" aria-label="Toggle On Hold" bind:pressed={visibilityFilter['on hold']}
		>On Hold</Toggle
	>
	<Toggle variant="outline" aria-label="Toggle Done" bind:pressed={visibilityFilter['done']}
		>Done</Toggle
	>
	<Toggle variant="outline" aria-label="Toggle Canceled" bind:pressed={visibilityFilter['canceled']}
		>Canceled</Toggle
	>
</div>
{#each filteredProjects as project}
	<Card.Root
		class={twMerge(
			'border-2',
			project.state == 'in progress' && 'border-black',
			project.state == 'on hold' && 'border-amber-500',
			project.state == 'done' && 'border-emerald-500',
			project.state == 'canceled' && 'border-red-500'
		)}
	>
		<Card.Header>
			<Card.Title class={twMerge('flex justify-between')}
				>{project.name}
				<Tooltip.Root>
					<Tooltip.Trigger
						>{#if project.state == 'in progress'}
							<Square></Square>
						{:else if project.state == 'on hold'}
							<MinusSquare class="text-amber-500"></MinusSquare>
						{:else if project.state == 'done'}
							<CheckSquare2 class="text-emerald-500"></CheckSquare2>
						{:else if project.state == 'canceled'}
							<XSquare class="text-red-500"></XSquare>
						{/if}</Tooltip.Trigger
					>
					<Tooltip.Content>
						<p>{project.state}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Card.Title>
			<Card.Description class="flex gap-2">
				{#each project.labels as label}
					<Badge>{label}</Badge>
				{/each}
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{project.description}</p>
		</Card.Content>
		<Card.Footer>
			<Button variant="outline" href="project/{project.id}">Details</Button>
		</Card.Footer>
	</Card.Root>
{/each}
{#if filteredProjects.length == 0}
	no project found
{/if}
