'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { createUrl } from "@/libs/query";
import { auth } from "@/next-auth/auth";
import { BoostedExpert, Expert, ExpertServiceList, NewAppointment } from "@/types/expert";
import { WithPage } from "@/types/pagination";
import { SearchParams, SearchQuery } from "@/types/query";


export async function GetAllBoostedExpert(page: number = 1) {
    const apiUrl = createUrl(`${baseApi}/Experts/GetBoosted`, { page })
    const result = await tryFetch<WithPage<BoostedExpert>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })

    return result
}

export async function GetAllExpert(searchParams: SearchParams) {
    const { spec, s, page } = searchParams
    const apiUrl = createUrl(`${baseApi}/Experts/GetAll`, {
        serviceId: spec,
        search: s,
        page,
        limit: 5
    })
    const result = await tryFetch<WithPage<Expert>>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetExpertServices(id: SearchQuery, spec: SearchQuery) {
    const apiUrl = createUrl(`${baseApi}/Experts/Services`, { serviceId: spec, expertId: id })
    const result = await tryFetch<ExpertServiceList>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })

    return result
}


export async function GetExpertWorkingDays(id: SearchQuery) {
    const apiUrl = createUrl(`${baseApi}/Experts/WorkingDays`, { expertId: id })
    const result = await tryFetch<string[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })

    return result
}

export async function GetExpertWorkingHours(date: string, expertId: string) {
    const apiUrl = createUrl(`${baseApi}/Experts/WorkingHours`, {date, expertId})
    const result = await tryFetch<string[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })

    return result
}


export async function CreateAppointment(newAppointment: NewAppointment) {
    const apiUrl = `${baseApi}/Appointments/Create`
    const session = await auth()

    const result = await tryFetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            ...newAppointment,
            userId: session?.user.userId
        })
    })

    return result
}

export async function GetExpertDetail( id: string) {
    const apiUrl = createUrl(`${baseApi}/Experts/Detail`, {
        id: id,
    });
    const result = await tryFetch<Expert>(apiUrl, {
    method: "GET",
    cache: "no-store",
    });
    return result;
}



import { BlogList } from "@/types/blog";
export async function GetExpertDetailBlogs(id: string, page: number = 1) {
  const apiUrl = createUrl(`${baseApi}/Blogs/GetFilterAll`, {
    expertId: id,
    page: 1,
    limit: '8'
  })

  const result = await tryFetch<BlogList>(apiUrl, {
    method: 'GET',
    cache: 'no-store'
  }) 


  return result
}

