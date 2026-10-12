'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { Banner } from "@/types/banner";


export async function GetAllBanner() {
    const apiUrl = `${baseApi}/Banners/GetAll`
    const result = await tryFetch<Banner[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}