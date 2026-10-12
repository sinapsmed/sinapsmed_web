'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { FAQ } from "@/types/faq";


export async function GetAllFAQ() {
    const apiUrl = `${baseApi}/Questions/GetAll`
    const result = await tryFetch<FAQ[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}