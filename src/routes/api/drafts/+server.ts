import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { API_ROUTE } from '$env/static/private';

import db from '../db';

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch(API_ROUTE + "/draft");
	const data = await res.json() as API_Draft[];

	const drafts: Draft[] = data.map(apiDraft => {
		return {
			id: apiDraft.id,
			name: apiDraft.content,
		}
	})

	return json(drafts)
	// return json(db.drafts);
};

export const POST: RequestHandler = async ({ request, fetch }) => {
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

	fetch(API_ROUTE + "/draft", {
		method: 'POST',
		body: JSON.stringify({
			content: name
		})
	})
	// db.drafts.push({ id, name })

	throw redirect(303, '/')

};
