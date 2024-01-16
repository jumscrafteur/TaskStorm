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

        if (form.data.email == "hsansane@gmail.com") {
            event.cookies.set("jwt", "ok", { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict' });
            throw redirect(300, "/");
        }
        else
            return fail(400, {
                form
            });


        return {
            form
        };
    }
};