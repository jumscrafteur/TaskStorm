import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { API_ROUTE } from '$env/static/private';
import db from '../db';

export const GET: RequestHandler = async () => {

	const statusMap: { [key: string]: State } = {
		PENDING: 'on hold',
		WIP: 'in progress',
		DONE: 'done',
		FROZEN: 'canceled'
	}

	const res = await fetch(API_ROUTE + "/task");
	const data = await res.json() as API_TaskInfo[];

	const tasks: Task[] = data.map(tasktInfo => {
		return {

			id: tasktInfo.id,
			description: tasktInfo.description,
			name: tasktInfo.name,
			state: statusMap[tasktInfo.status],
			project_id: tasktInfo.project.id
		}
	})


	return json(tasks)
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

	const state = formData.get("state") as State | null

	const statusMap = {
		'in progress': 'WIP',
		'on hold': 'PENDING',
		'done': 'COMPLETED',
		'canceled': 'FROZEN'
	}



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

	fetch(API_ROUTE + "/draft/" + draftId, {
		method: 'DELETE',
	})


	fetch(API_ROUTE + "/task", {
		method: 'POST',
		body: JSON.stringify({
			project: {
				name: name,
				description: description,
				status: statusMap[state],
				projectId: Number.isInteger(project),
				labelIds: [],
				// TODO
				scheduledDate: ""
			}
		})
	})



	// db.drafts = db.drafts.filter(draft => draft.id != parseInt(draftId))
	// db.tasks.push({ id, name, state, project_id: Number.isInteger(project) ? parseInt(project) : undefined, description })

	// console.log(db.tasks)

	throw redirect(303, '/')

};
