import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import db from '../db';

export const GET: RequestHandler = () => {

	return json(db.drafts);
};

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	console.log(formData)
	const name = formData.get("name") as string | null

	if (name == null || name == '') {
		throw error(400, "invalid request body")
	}

	let id = 0;
	for (const draft of db.drafts) {
		id = Math.max(id, draft.id)
	}
	id = id + 1


	db.drafts.push({ id, name })

	throw redirect(303, '/')

};
