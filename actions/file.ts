'use server'

import { tryFetch } from "@/libs/fetch"
import { baseApi } from "@/libs/keys"
import { createUrl } from "@/libs/query"
import { auth } from "@/next-auth/auth"
import { FileType } from "@/types/enum"
import { Result } from "@/types/result"

export async function UploadFile(formData: FormData, category: FileType) {
    const apiUrl = createUrl(`${baseApi}/Files/Create`, { category, type: 0 })
    const result = await tryFetch<string>(apiUrl, {
        method: "POST",
        body: formData
    })
    return result
}

export async function UpdateFile(formData: FormData, category: FileType, url: string) {
    const apiUrl = createUrl(`${baseApi}/Files/Update`, { category, url })
    const result = await tryFetch<string>(apiUrl, {
        method: "PUT",
        body: formData
    })
    return result
}

export async function RemoveFile(url: string) {
    const apiUrl = createUrl(`${baseApi}/Files/Delete`, { url })
    const result = await tryFetch<string>(apiUrl, {
        method: "DELETE"
    })
    return result
}

export async function AddAttachmentFile(formData: FormData) {
    const title = formData.get('title')
    formData.delete('title')
    const id = formData.get('id')
    formData.delete('id')
    const apiUrl = createUrl(`${baseApi}/Appointments/AddFile`, { title, appointmentId: id })
    const session = await auth()
    const result = await tryFetch(apiUrl, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${session?.token}`,
        },
        body: formData
    })
    return result
}
