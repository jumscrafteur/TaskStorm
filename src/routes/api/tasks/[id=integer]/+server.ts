// import { redirect } from '@sveltejs/kit';
import { API_ROUTE } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
    const formTask = await request.json() as Task;
    // db.tasks = db.tasks.map(task =>
    //     task.id == reqTask.id ? reqTask : task
    // )

    const res = await fetch(API_ROUTE + "/project/" + formTask.id);
    const reqTask = await res.json() as API_ProjectInfo;

    const statusMap: { [key: string]: API_ProjectStatus } = {
        'in progress': 'WIP',
        'on hold': 'PENDING',
        'done': 'COMPLETED',
        'canceled': 'FROZEN'
    }

    reqTask.status = statusMap[formTask.state]

    fetch(API_ROUTE + "/task/" + formTask.id, {
        method: 'POST',
        body: JSON.stringify({
            task: reqTask
        })
    })


    return json({})
    // throw redirect(303, `/project/${reqTask.project_id}`)
};


