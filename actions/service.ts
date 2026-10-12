'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { createUrl } from "@/libs/query";
import { SearchQuery } from "@/types/query";
import { Route } from "@/types/route";
import { Service, ServicePair } from "@/types/service";


export async function GetServiceRoutes() {
    const apiUrl = `${baseApi}/Services/Header`
    const result = await tryFetch<Route[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetServiceDetail(id:SearchQuery) {
    const apiUrl = createUrl(`${baseApi}/Services/Detail`, {id})
    const result = await tryFetch<Service>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetServiceAll() {
    const apiUrl = `${baseApi}/Services/AllServices`
    const result = await tryFetch<ServicePair[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}