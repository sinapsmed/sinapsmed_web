'use client'
import { ResetPassword } from '@/actions/auth'
import SubmitButton from '@/components/commons/SubmitButton'
import { SearchQuery } from '@/types/query'
import { Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import useForm from '@/hooks/form'
import Error from '@/components/commons/Error'
import { PasswordInput } from '@/components/dashboard/change-password/ChangePasswordForm'

interface Props {
    email: SearchQuery,
    token: SearchQuery,
}

const ResetSection = ({ email, token }: Props) => {
    const t = useTranslations('reset')
    const { action, state, error, pending } = useForm(ResetPassword)
    const [matchError, setMatchError] = useState<string | null>(null);
    const [passwords, setPasswords] = useState(['', ''])
    const handlePasswords = (index: number, value: string) => {
        const changePassword = [...passwords]
        changePassword[index] = value
        setPasswords(changePassword)
        if (changePassword[0] !== changePassword[1]) setMatchError("Şifrələr uyğun gəlmir!")
        else setMatchError(null)
    }
    return (
        <section id='reset-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[350px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-4xl mb-8'>{t('title')}</h1>
                <form className='space-y-4' onSubmit={action}>
                    <PasswordInput fullWidth onChange={(value)=>handlePasswords(0, value)} value={passwords[0]} name='resetPassword' label={t('pass')} />
                    <PasswordInput fullWidth onChange={(value)=>handlePasswords(1, value)} value={passwords[1]} label={t('confirm-pass')} />
                    <Error error={error} />
                    <Error error={matchError} />
                    <input type="hidden" name="email" value={email} />
                    <input type="hidden" name="token" value={token} />
                    <SubmitButton state={state} pending={pending} className='w-full text-center'>{t('submit')}</SubmitButton>
                </form>
            </Paper>
        </section>
    )
}

export default ResetSection