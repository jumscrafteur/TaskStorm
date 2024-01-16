import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { API_ROUTE } from '$env/static/private';
import db from '../db';

export const GET: RequestHandler = async () => {

	const statusMap: { [key: string]: State } = {
		PENDING: 'on hold',
		WIP: 'in progress',
		COMPLETED: 'done',
		FROZEN: 'canceled'
	}

	const res = await fetch(API_ROUTE + "/project");
	const data = await res.json() as API_ProjectInfo[];

	const projects: Project[] = data.map(projectInfo => {
		return {
			id: projectInfo.id,
			description: projectInfo.description,
			labels: [],
			name: projectInfo.name,
			state: statusMap[projectInfo.status]
		}
	})


	return json(projects)


	// return json(db.projects);
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

	// const tags = tagsString.split("~")

	let id = 0;
	for (const project of db.projects) {
		id = Math.max(id, project.id)
	}
	id = id + 1

	const API_project: API_ProjectCreation = {
		color: 'Black',
		description: '',
		name: name,
		status: 'WIP'
	}

	// db.projects.push({ id, name, labels: tags, description: "", state: "in progress" })
	fetch(API_ROUTE + "/project", {
		method: 'POST',
		body: JSON.stringify(API_project)
	})

	throw redirect(303, '/')

};

