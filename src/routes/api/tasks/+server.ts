import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import db from '../db';

export const GET: RequestHandler = () => {
	return json(db.tasks);
};

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	console.log(formData)
	const name = formData.get("name") as string | null

	if (name == null || name == '') {
		throw error(400, "invalid request body")
	}

	const description = formData.get("description") as string | null

	if (description == null) {
		throw error(400, "invalid request body")
	}

	const state = formData.get("state") as string | null

	if (state == null) {
		throw error(400, "invalid request body")
	}

	const project = formData.get("project") as string | null

	if (project == null) {
		throw error(400, "invalid request body")
	}

	const draftId = formData.get("draft_id") as string | null

	if (draftId == null) {
		throw error(400, "invalid request body")
	}

	let id = 0;
	for (const project of db.projects) {
		id = Math.max(id, project.id)
	}
	id = id + 1



	db.drafts = db.drafts.filter(draft => draft.id != parseInt(draftId))
	console.log(project)
	db.tasks.push({ id, name, state, project_id: Number.isInteger(project) ? parseInt(project) : undefined, description })

	console.log(db.tasks)

	throw redirect(303, '/')

};
