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

	type API_ProjectStatus = 'WIP' | 'PENDING' | 'COMPLETED' | 'FROZEN';
	type API_TaskStatus = 'WIP' | 'PENDING' | 'DONE' | 'FROZEN';


	type API_Draft = {
		id: number
		created: string
		content: string
	}

	class API_ProjectInfo {
		id: number;
		creationDate: Date;
		name: string;
		color: Color;
		description: string;
		status: API_ProjectStatus;
	}

	class API_ProjectCreation {
		name: string;
		description: string;
		color: "Black";
		status: API_ProjectStatus;
	}

	class API_TaskInfo {
		id: number;
		creationDate: Date;
		scheduledDate: Date;
		name: string;
		description: string;
		status: API_TaskStatus;
		project: API_ProjectInfo;
	}
}

export { };

