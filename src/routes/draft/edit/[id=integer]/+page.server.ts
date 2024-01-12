import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const DRAFTS = (await (await fetch('/api/drafts')).json()) as Draft[];
	if (DRAFTS == null) {
		error(404, 'Not found');
	}

	const PROJECTS = (await (await fetch('/api/projects')).json()) as Project[];
	if (PROJECTS == null) {
		error(404, 'Not found');
	}

	return {
		draft: DRAFTS.filter((draft) => draft.id == parseInt(params.id))[0],
		projects: PROJECTS
	};
};
