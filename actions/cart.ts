'use server'

import { tryFetch } from "@/libs/fetch"
import { baseApi } from "@/libs/keys"
import { createUrl } from "@/libs/query"
import { auth } from "@/next-auth/auth"
import { CartItem, NewCartItem, UpdatedItem } from "@/types/cart"
import { Result } from "@/types/result"

export async function GetCartItems(couponCode?: string) {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Baskets/MyBasket`, {cupon: couponCode})
    const result = await tryFetch<CartItem[]>(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        }
    })

    return result
}


export async function AddItem(newItem: NewCartItem) {
    const session = await auth()
    const apiUrl = `${baseApi}/Baskets/AddItem`

    const result = await tryFetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify(newItem)
    })
    return result
}


export async function RemoveItem(itemId: string) {
    const session = await auth()
    const apiUrl = createUrl(`${baseApi}/Baskets/RemoveItem`, {itemId})

    const result = await tryFetch(apiUrl, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })
    return result
}

export async function RemoveAll() {
    const session = await auth()
    const apiUrl = `${baseApi}/Baskets/RemoveAll`

    const result = await tryFetch(apiUrl, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${session?.token}`
        },
    })
    return result
}

export async function GetTotalCount() {
    const session = await auth()
    const apiUrl = `${baseApi}/Baskets/ItemCount`
    if (session) {
        const result = await tryFetch<number>(apiUrl, {
            method: "GET",
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${session.token}`
            },
            next: {
                tags: ['cart']
            },
        })
        return result
    }
    else return {
        success: true,
        data: 0
    } as Result<number>
}