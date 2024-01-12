import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ request }) => {
    console.log(await request.json())
    return json({});
};


