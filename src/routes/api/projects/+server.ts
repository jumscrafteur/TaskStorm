import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import db from '../db';

export const GET: RequestHandler = () => {
	return json(db.projects);
};

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get("name") as string | null

	if (name == null || name == '') {
		throw error(400, "invalid request body")
	}

	const tagsString = formData.get("tags") as string | null

	if (tagsString == null) {
		throw error(400, "invalid request body")
	}

	const tags = tagsString.split("~")

	let id = 0;
	for (const project of db.projects) {
		id = Math.max(id, project.id)
	}
	id = id + 1


	db.projects.push({ id, name, labels: tags, description: "", state: "in progress" })

	throw redirect(303, '/')

};

