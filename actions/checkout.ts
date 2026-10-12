'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { createUrl } from "@/libs/query";
import { auth } from "@/next-auth/auth";
import { SearchQuery } from "@/types/query";

interface Redirect {
    redirectionUrl: string
    paymentId: number
}

const statuses = [
    "BeingPrepared",
    "Cancelled",
    "Rejected",
    "Refused",
    "Expired",
    "Authorized",
    "PartiallyPaid",
    "FullyPaid",
    "Funded",
    "Declined",
    "Voided",
    "Refunded",
    "Closed",
    "Pending"
]

export async function TakeOrder(code?: string) {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Orders/CheckOutOrder`, {cupon: code})
    const result = await tryFetch<Redirect>(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })

    return result
}

export async function MakeOrderSuccess(id: SearchQuery, status: string) {
    if (id) {
        const session = await auth()
        const statusNo = statuses.findIndex(x => x === status)
        const apiUrl = createUrl(`${baseApi}/Orders/Payment`, {paymentId: id, status: statusNo})

        await tryFetch<Redirect>(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.token}`
            },
        })
    }
}