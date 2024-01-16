import { API_ROUTE } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { formSchema } from "./schema";
export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(formSchema)
    };
};
export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, formSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const res = await event.fetch(API_ROUTE + "/login", {
            method: 'POST',
            body: JSON.stringify({
                email: form.data.email,
                password: form.data.password
            })
        })

        const data = await res.json();

        if (data["accessToken"]) {
            event.cookies.set("jwt", data.accessToken, { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict' });
            throw redirect(300, "/");
        }


        return {
            form
        };
    }
};