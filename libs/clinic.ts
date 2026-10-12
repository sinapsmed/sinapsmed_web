'use server'
import { cookies } from "next/headers";
import { encryptValue } from "./crypto";

export async function updateClinic(state: string) {
    const encryptedState = encryptValue(JSON.stringify(state))
    if (encryptedState) {
        const now = new Date()
        const expires = new Date(now.getTime() + 15*60*1000 )
        cookies().set('clinic', encryptedState, {expires})
    }
}