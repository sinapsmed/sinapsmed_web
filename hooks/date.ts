'use client'

import { useTranslations } from "next-intl"

export default function useFormatDate(local: boolean = false) {
    const t = useTranslations('')
    const format = (dateStr: string) => {
        const months = t.raw('date.months')
        const date = new Date(dateStr)

        const day = local ? date.getDate() : date.getUTCDate()
        const month = local ? date.getMonth() : date.getUTCMonth()
        const year = local ? date.getFullYear() : date.getUTCFullYear()
        const hours = String(local ? date.getHours() : date.getUTCHours()).padStart(2, '0')
        const minutes = String(local ? date.getMinutes() : date.getUTCMinutes()).padStart(2, '0')

        return `${day} ${months[month]} ${year} [${hours}:${minutes}]`
    }

    return format
}
