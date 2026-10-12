import { VerifyEmail } from '@/actions/auth'
import VerifyEmailSection from '@/containers/auth/verify-email/VerifyEmailSection'
import { SearchParams } from '@/types/query'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    searchParams: SearchParams
}

export default async function VerifyEmailPage({ searchParams }: Props) {
    const { user, setPassword } = searchParams
    if (!user) notFound()
    if (!setPassword) await VerifyEmail(user as string)
    return (
        <main>
            <VerifyEmailSection user={user as string} />
        </main>
    )
}
