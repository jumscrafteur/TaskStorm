import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const PROJECTS = (await (await fetch('/api/projects')).json()) as Project[];
	if (PROJECTS == null) {
		error(404, 'Not found');
	}

	const TASKS = (await (await fetch('/api/tasks')).json()) as Task[];
	if (TASKS == null) {
		error(404, 'Not found');
	}

	return {
		project: PROJECTS.filter((project) => project.id == parseInt(params.id))[0],
		tasks : TASKS.filter((task) => task.project_id == parseInt(params.id))
	};
};
