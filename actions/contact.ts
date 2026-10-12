'use server'
import { tryFetch } from "@/libs/fetch";
import { formDataToObject } from "@/libs/form";
import { baseApi } from "@/libs/keys";
import { Result } from "@/types/result";


export async function SendMessage(formData: FormData) {
    const apiUrl = `${baseApi}/custom/sendOffer`
    const result = await tryFetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToObject(formData))
    })
    
    return result
}