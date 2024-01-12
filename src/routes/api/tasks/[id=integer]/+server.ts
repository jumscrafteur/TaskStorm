// import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import db from '../../db';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
    const reqTask = await request.json() as Task;
    db.tasks = db.tasks.map(task =>
        task.id == reqTask.id ? reqTask : task
    )

    console.log(reqTask.name)
    return json({})
    // throw redirect(303, `/project/${reqTask.project_id}`)
};


