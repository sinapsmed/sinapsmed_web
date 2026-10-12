'use client'

import { usePathname } from "@/navigation"
import { useSearchParams } from "next/navigation"

export default function usePath(){
    const pathname = usePathname()
    const searchParams = useSearchParams()
    return `${pathname}?${searchParams.toString()}`
}