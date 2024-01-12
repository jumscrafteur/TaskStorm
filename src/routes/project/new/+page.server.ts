import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const PROJECTS = (await (await fetch('/api/projects')).json()) as Project[];
	if (PROJECTS == null) {
		error(404, 'Not found');
	}


	return {
		projects: PROJECTS
	};
};
