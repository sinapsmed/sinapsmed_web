'use server'
import { tryFetch } from "@/libs/fetch";
import { formDataToObject } from "@/libs/form";
import { baseApi } from "@/libs/keys";
import { createUrl } from "@/libs/query";
import { redirect } from "@/navigation";
import { auth, signIn, signOut } from "@/next-auth/auth";
import { Result } from "@/types/result";
import { revalidateTag } from "next/cache";

import { cookies } from "next/headers";

export async function Register(formData: FormData) {
    const apiUrl = `${baseApi}/Users/Register`
    formData.set('phoneNumber', `${formData.get('code')}${formData.get('phoneNumber')}`)
    formData.delete('code')
    const formObject = formDataToObject(formData)
    const result = await tryFetch<string>(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...formObject,
            createdByClinic: false
        })
    })

    if (result.success) {
        if (result.data) cookies().set('expired', result.data)
        redirect(`/verify?user=${formObject.mail}&phone=${formObject.phoneNumber}`)
    }

    return result
}


export async function Login(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const callback = formData.get('callback')

    const result = await TrySignin(email, password)

    if (result.success) {
        revalidateTag('userInfo')
        redirect((callback as string) || '/')
    }
    return result
}

export async function Logout() {
    const result = await TryLogout()

    if (result) redirect('/login')
}

async function TrySignin(email: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<Result> {
    try {
        await signIn('credentials', {
            redirect: false,
            email,
            password
        })
        return {
            success: true,
            message: 'ok',
            statusCode: 200,
            errorMessage: null,
            exception: null
        }
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error?.cause?.err?.message ?? 'error',
            statusCode: 500,
            errorMessage: null,
            exception: null
        }
    }
}

async function TryLogout() {
    try {
        const a = await signOut({
            redirect: false
        })
        return true
    } catch (error) {
        return false
    }
}

export async function Verify(formData: FormData) {
    const otp = formData.get('otp')
    const mail = formData.get('mail')

    const apiUrl = createUrl(`${baseApi}/Auth/VerifyPhone`, { otp, mail })

    const result = await tryFetch(apiUrl, {
        method: 'GET',
        cache: "no-store",
    })
    if (result.success) redirect('/login?registered=true')

    return result
}

export async function VerifyPhone(otp: string, mail: string) {
    const apiUrl = createUrl(`${baseApi}/Auth/VerifyPhone`, { otp, mail })

    const result = await tryFetch(apiUrl, {
        method: 'GET',
        cache: "no-store",
    })

    if (result.success) revalidateTag('userInfo')
    return result
}

export async function SendAgain(phone: string, email: string) {
    const apiUrl = createUrl(`${baseApi}/Auth/PhoneOtpAgain`, { phone, email })
    const result = await tryFetch<string>(apiUrl, {
        method: 'GET',
    })

    if (result.success && result.data) cookies().set('expired', result.data)

    return result
}

export async function ChangePassword(formData: FormData) {
    const apiUrl = `${baseApi}/Auth/ChangePassword`
    const session = await auth()
    const { newPassword, oldPassword } = formDataToObject(formData)

    const result = await tryFetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${session?.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newPassword,
            oldPassword,
        })
    })

    return result
}

export async function ForgotPassword(formData: FormData) {
    const email = formData.get('email')
    const apiUrl = createUrl(`${baseApi}/Auth/ForgotPassword`, { email })

    const result = await tryFetch(apiUrl, {
        method: 'POST'
    })

    return result
}

export async function ResetPassword(formData: FormData) {
    const email = formData.get('email')
    const token = formData.get('token')
    const resetPassword = formData.get('resetPassword')
    const apiUrl = createUrl(`${baseApi}/Auth/ResetPassword`, { email, token, resetPassword })

    const result = await tryFetch(apiUrl, {
        method: 'POST'
    })

    return result
}

export async function VerifyEmail(userId: string, newPassword?: string) {
    const apiUrl = createUrl(`${baseApi}/Users/CompleteRegistration`)

    const result = await tryFetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            newPassword
        })
    })

    if (result.success) redirect('/verified')

    return result
}