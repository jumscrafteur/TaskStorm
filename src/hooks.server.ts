
export async function handle({ event, resolve }) {
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
