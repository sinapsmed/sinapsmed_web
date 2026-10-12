'use client'
import { Register } from '@/actions/auth'
import LocaleLink from '@/components/commons/LocaleLink'
import NumberField from '@/components/commons/NumberField'
import OutlinedField from '@/components/commons/OutlinedField'
import RequiredInput from '@/components/commons/RequiredInput'
import SubmitButton from '@/components/commons/SubmitButton'
import { PasswordInput } from '@/components/dashboard/change-password/ChangePasswordForm'
import { Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import useForm from '@/hooks/form'

const RegisterSection = () => {
    const t = useTranslations('register')
    const warnings = t.raw('warning')
    const [matchError, setMatchError] = useState<string | null>(null);
    const [passwords, setPasswords] = useState(['', ''])
    const {action, error, pending} = useForm(Register)

    const handlePasswords = (index: number, value: string) => {
        const changePassword = [...passwords]
        changePassword[index] = value
        setPasswords(changePassword)
        if (changePassword[0] !== changePassword[1]) setMatchError("Şifrələr uyğun gəlmir!")
        else setMatchError(null)
    }
    return (
        <section id='register-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[600px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-4xl mb-8'>{t('title')}</h1>
                {
                    error && <p className='bg-red-500 text-center p-1.5 rounded-md text-white font-semibold mb-2.5'>{error}</p>
                }
                {
                    matchError && <p className='bg-red-500 text-center p-1.5 rounded-md text-white font-semibold mb-2.5'>{matchError}</p>
                }
                <form onSubmit={action} className='space-y-4'>
                    <OutlinedField required size='medium' label={t('name')} name='name' type="text" />
                    <OutlinedField required size='medium' label={t('surname')} name='surName' type="text" />
                    <OutlinedField required size='medium' label={t('email')} name='mail' type="email" />
                    <PasswordInput fullWidth value={passwords[0]} onChange={(value) => handlePasswords(0, value)} label={t('password')} name='password' />
                    <PasswordInput fullWidth value={passwords[1]} onChange={(value) => handlePasswords(1, value)} label={t('confirmPassword')} />
                    <NumberField
                        required
                        label={t('phone')}
                        input={{
                            name: 'phoneNumber'
                        }}
                        select={{
                            name: 'code'
                        }}
                    />
                    <div className='flex gap-3 items-center'>
                        <h1 className='font-bold'>{`${t('gender')} *`}</h1>
                        <span>
                            <RequiredInput title={t('gender')} value={"true"} type="radio" name='gender' /> {t('male')}
                        </span>
                        <span>
                            <RequiredInput title={t('gender')} value={"false"} type="radio" name='gender' /> {t('female')}
                        </span>
                    </div>
                    <div>
                        <p>{warnings[0]}</p>
                        <p>{warnings[1]}</p>
                    </div>
                    <SubmitButton pending={pending} disabled={passwords[0]!==passwords[1]} className='w-full text-center'>{t('register')}</SubmitButton>
                    <div className='text-center'>{t('ask.question')} <LocaleLink href={'/login'} className='text-blue-700'>{t('ask.link')}</LocaleLink></div>
                </form>
            </Paper>
        </section>
    )
}

export default RegisterSection