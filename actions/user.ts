'use server'

import { DataEvent } from "@/components/commons/EventCalendar"
import { tryFetch } from "@/libs/fetch"
import { formDataToObject } from "@/libs/form"
import { baseApi } from "@/libs/keys"
import { createUrl } from "@/libs/query"
import { auth } from "@/next-auth/auth"
import { UserInfo } from "@/types/auth"
import { WithPage } from "@/types/pagination"
import { SearchParams } from "@/types/query"
import { UserAnalysis, UserAppointment, UserAppointmentDetail } from "@/types/user"
import { revalidateTag } from "next/cache"

export async function GetUserInfo() {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Users/UserInfo`, { userId: session?.user.userId })
    const result = await tryFetch<UserInfo>(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
        next: {
            tags: ['userInfo']
        },
        cache: 'force-cache'
    })

    return result
}

export async function UpdateUserInfo(formData: FormData) {
    const apiUrl = `${baseApi}/Users/Update`
    const session = await auth()

    const formObject = formDataToObject(formData)

    const result = await tryFetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${session?.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    if (result.success) revalidateTag('userInfo')
    return result
}

export async function UpdateUser(userInfo: UserInfo) {
    const apiUrl = `${baseApi}/Users/Update`
    const session = await auth()
    const result = await tryFetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${session?.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    if (result.success) revalidateTag('userInfo')
    return result
}

export async function GetUserAnalyses(searchParams: SearchParams) {
    const { page } = searchParams
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Users/UserAnlyses`, { userId: session?.user.userId, page })
    const result = await tryFetch<WithPage<UserAnalysis>>(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })
    return result
}

export async function GetUserAppointments(searchParams: SearchParams) {
    const { page, status } = searchParams
    let modifiedStatus = status ? `${+status - 1}` : null
    if (modifiedStatus === '-1') modifiedStatus = null
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Users/UserAppointments`, { userId: session?.user.userId, page, status: modifiedStatus })
    const result = await tryFetch<WithPage<UserAppointment>>(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })

    return result
}

export async function GetUserAppointmentDetail(id: string) {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Users/ApointmentDetail`, { appointmentId: id })
    const result = await tryFetch<UserAppointmentDetail>(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })

    return result
}

export async function GetUserCalendar(date: Date = new Date(), oponentId?: string, serviceId?: string, status?: number) {
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const session = await auth()
    let modifiedStatus = status ? `${+status - 1}` : null
    if (modifiedStatus === '-1') modifiedStatus = null
    const apiUrl = createUrl(`${baseApi}/Appointments/Schedule`, { year, month, oponentId, serviceId, status: modifiedStatus })
    const result = await tryFetch<DataEvent[]>(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })

    return result
}