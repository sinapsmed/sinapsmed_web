'use server'
import { decryptValue } from "@/libs/crypto"
import { tryFetch } from "@/libs/fetch"
import { baseApi } from "@/libs/keys"
import { createUrl } from "@/libs/query"
import { auth } from "@/next-auth/auth"
import { Analysis, AnalysisCategory, Clinic, Place } from "@/types/analysis"
import { WithPage } from "@/types/pagination"
import { SearchParams } from "@/types/query"
import { Attachment } from "@/types/user"
import { cookies } from "next/headers"

export async function GetAnalyses(searchParams: SearchParams) {
    let clinicId: string | null = null
    const clinicCookie = cookies().get('clinic')?.value
    if (clinicCookie) {
        const decryptedState = decryptValue(clinicCookie)
        if (decryptedState) clinicId = JSON.parse(decryptedState) as string
    }
    const { cat, page, s } = searchParams

    const apiUrl = createUrl(`${baseApi}/Analyses/GetAll`, { categoryIds: cat, page, search: s, clinicId })

    const result = await tryFetch<WithPage<Analysis>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    
    return result
}

export async function GetAnalysisCats() {
    let id: string | null = null
    const clinicCookie = cookies().get('clinic')?.value
    if (clinicCookie) {
        const decryptedState = decryptValue(clinicCookie)
        if (decryptedState) id = JSON.parse(decryptedState) as string
    } 
    const apiUrl = createUrl(`${baseApi}/Analyses/GetCats`, { id })
    
    const result = await tryFetch<AnalysisCategory[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetClinics(page?: number, location?: string, partnerId?: string, cityId?: string, regionId?: string, villageId?: string) {
    const apiUrl = createUrl(`${baseApi}/Locations/Clinics`, { location, cityId, regionId, villageId, page, partnerId })

    const result = await tryFetch<WithPage<Clinic>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetCities(page: number = 1) {
    const apiUrl = createUrl(`${baseApi}/Locations/Cities`, { page })
    const result = await tryFetch<WithPage<Place>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetRegions(page: number = 1, id?: string) {
    const apiUrl = createUrl(`${baseApi}/Locations/Regions`, { page, id })
    const result = await tryFetch<WithPage<Place>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetVillages(page: number = 1, cityId?: string, regionId?: string) {
    const apiUrl = createUrl(`${baseApi}/Locations/Villages`, { page, cityId, regionId })
    const result = await tryFetch<WithPage<Place>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetAttachments(itemId: string) {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Clinics/ItemAttachments`, { itemId })
    const result = await tryFetch<{
        attachments: Attachment[]
    }>(apiUrl, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
        cache: "no-store"
    })
    return result
}