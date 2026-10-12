'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { Partner } from "@/types/partner";


export async function GetAllPartner() {
    const apiUrl = `${baseApi}/Partners/GetAll`
    const result = await tryFetch<Partner[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}