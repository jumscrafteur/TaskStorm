import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const DRAFTS = (await (await fetch('/api/drafts')).json()) as Draft[];
	if (DRAFTS == null) {
		error(404, 'Not found');
	}

	const PROJECTS = (await (await fetch('/api/projects')).json()) as Project[];
	if (PROJECTS == null) {
		error(404, 'Not found');
	}

	const TASKS = (await (await fetch('/api/tasks')).json()) as Task[];
	if (TASKS == null) {
		error(404, 'Not found');
	}
	return {
		drafts: DRAFTS,
		projects: PROJECTS,
		tasks: TASKS
	};
};
