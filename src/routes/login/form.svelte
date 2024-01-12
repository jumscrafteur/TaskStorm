<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import type { SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';
	export let form: SuperValidated<FormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<h1 class="text-3xl font-bold">LogIn</h1>
	</Card.Header>
	<Card.Content>
		<Form.Root method="POST" {form} schema={formSchema} let:config>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input type="email" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="password">
				<Form.Item>
					<Form.Label>Password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
