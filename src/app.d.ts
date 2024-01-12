// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type State = 'in progress' | 'on hold' | 'done' | 'canceled';

	type Draft = {
		id: number;
		name: string;
	};

	type Project = {
		id: number;
		name: string;
		description: string;
		labels: string[];
		state: State;
	};

	type Task = {
		id: number;
		project_id?: number;
		name: string;
		state: State;
		description: string;
	};
}

export { };

