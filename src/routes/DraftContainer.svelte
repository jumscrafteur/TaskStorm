<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Pagination from '$lib/components/ui/pagination';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let drafts: { id: Number; name: String }[];

	$: perPage = 8;
	$: siblingCount = 1;
</script>

<Pagination.Root
	count={drafts.length}
	perPage={4}
	{siblingCount}
	let:pages
	let:currentPage
	let:range
>
	<div class="flex w-full flex-col gap-4 py-4">
		<form method="post" action="/api/drafts" class="grid grid-cols-8 gap-2">
			<Input type="text" placeholder="Draft Name" class="col-span-6" name="name" />
			<Button class="col-span-2" type="submit">New Draft</Button>
		</form>
		{#each drafts.slice(range.start, range.end) as { id, name }}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center justify-between"
						>{name} <Button href="/draft/edit/{id}">Edit</Button></Card.Title
					>
					<!-- <Card.Description>Card Description</Card.Description> -->
				</Card.Header>
				<!-- <Card.Content>
				<Button>Edit</Button>
			</Card.Content> -->
				<!-- <Card.Footer>
				<Button>Edit</Button>
			</Card.Footer> -->
			</Card.Root>
		{/each}
	</div>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton>
				<ChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">Previous</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link {page} isActive={currentPage == page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
