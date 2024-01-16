import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ cookies }) => {
    return { isLogged: cookies.get("jwt") != null };
};