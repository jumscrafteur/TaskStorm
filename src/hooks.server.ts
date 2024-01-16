import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get('jwt');

    if (!authToken && !event.url.pathname.startsWith('/login') && !event.url.pathname.startsWith('/register')) {
        return new Response("Redirect", {
            status: 303,
            headers: { Location: "/login" },
        });
    }


    const response = await resolve(event);
    return response;

};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
    const authToken = event.cookies.get('jwt');

    if (authToken) {
        request.headers.set("Authorization", `Bearer ${authToken}`)
    }

    return fetch(request);
};