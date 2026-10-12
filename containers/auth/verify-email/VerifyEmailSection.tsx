'use client'
import { VerifyEmail } from '@/actions/auth'
import Error from '@/components/commons/Error'
import { PasswordInput } from '@/components/dashboard/change-password/ChangePasswordForm'
import { Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

interface Props {
    user: string,
}

const VerifyEmailSection = ({ user }: Props) => {
    const t = useTranslations('verify-email')
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [matchError, setMatchError] = useState<string | null>(null);
    const [passwords, setPasswords] = useState(['', ''])
    const handlePasswords = (index: number, value: string) => {
        const changePassword = [...passwords]
        changePassword[index] = value
        setPasswords(changePassword)
        if (changePassword[0] !== changePassword[1]) setMatchError("Şifrələr uyğun gəlmir!")
        else setMatchError(null)
    }

    const submit = async () => {
        setPending(true)
        setError(null)
        const result = await VerifyEmail(user, passwords[0])
        if (!result?.success) setError(result.message ?? null)
        setPending(false)
    }
    return (
        <section id='reset-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[350px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-4xl mb-8'>{t('title')}</h1>
                <div className='space-y-4'>
                    <PasswordInput fullWidth onChange={(value) => handlePasswords(0, value)} value={passwords[0]} name='resetPassword' label={t('pass')} />
                    <PasswordInput fullWidth onChange={(value) => handlePasswords(1, value)} value={passwords[1]} label={t('confirm-pass')} />
                    <Error error={error} />
                    <Error error={matchError} />
                    <button onClick={submit} disabled={pending} className='w-full text-center bg-blue-500 p-3 text-white rounded font-semibold'>{t('submit')}</button>
                </div>
            </Paper>
        </section>
    )
}

export default VerifyEmailSection