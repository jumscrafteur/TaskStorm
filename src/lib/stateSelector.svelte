<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import { CheckSquare2, MinusSquare, Square, XSquare } from 'lucide-svelte';

	let selectedState = 'in_progress';
</script>

<RadioGroup.Root bind:value={selectedState} class="rounded border p-3" orientation="horizontal">
	<p class="text-lg">State :</p>
	<ul class="grid grid-cols-4 gap-4">
		<!-- In progress -->
		<li>
			<RadioGroup.Item value="in_progress" id="state_in_progress" class="peer absolute opacity-0" />
			<Label
				for="state_in_progress"
				class="flex w-full items-center gap-1 rounded border-2 border-white bg-black/5 p-2 peer-data-[state=checked]:border-black"
			>
				<Square></Square>
				<p class="text-center">In Progress</p>
			</Label>
		</li>

		<!-- On Hold -->
		<li>
			<RadioGroup.Item value="on_hold" id="state_on_hold" class="peer absolute opacity-0" />
			<Label
				for="state_on_hold"
				class="flex w-full items-center gap-1 rounded border-2 border-white bg-amber-500/5 p-2 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-500/10"
			>
				<MinusSquare class="text-amber-500"></MinusSquare>
				<p class="text-center text-amber-500">On Hold</p>
			</Label>
		</li>

		<!-- Done -->
		<li>
			<RadioGroup.Item value="state_done" id="state_done" class="peer absolute opacity-0" />
			<Label
				for="state_done"
				class="flex w-full items-center gap-1 rounded border-2 border-white bg-emerald-500/5 p-2 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10"
			>
				<CheckSquare2 class="text-emerald-500"></CheckSquare2>
				<p class="text-center text-emerald-500">Done</p>
			</Label>
		</li>

		<!-- Canceled -->
		<li>
			<RadioGroup.Item value="canceled" id="state_canceled" class="peer absolute opacity-0" />
			<Label
				for="state_canceled"
				class="flex w-full items-center gap-1 rounded border-2 border-white bg-red-500/5 p-2 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-500/10"
			>
				<XSquare class="text-red-500"></XSquare>
				<p class="text-center text-red-500">Canceled</p>
			</Label>
		</li>
	</ul>
	<input type="text" name="state" id="" value={selectedState} class="hidden" />
</RadioGroup.Root>
