'use client'
import { ForgotPassword } from '@/actions/auth'
import OutlinedField from '@/components/commons/OutlinedField'
import SubmitButton from '@/components/commons/SubmitButton'
import { Alert, Box, Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import useForm from '@/hooks/form'
import Error from '@/components/commons/Error'

const ForgotPassSection = () => {
    const t = useTranslations('forgetPassword')
    const { action, state, error, pending } = useForm(ForgotPassword)
    return (
        <section id='forgot-password-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[350px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-4xl mb-8'>{t('title')}</h1>
                <Box className="mb-2 space-y-2">
                    <Alert severity="info">
                        {t('info')}
                    </Alert>
                </Box>
                <form className='space-y-4' onSubmit={action}>
                    <OutlinedField name='email' label={t('email')} type="email" size='medium' required />
                    <Error error={error} />
                    <SubmitButton state={state} pending={pending} className='w-full text-center'>{t('send')}</SubmitButton>
                </form>
            </Paper>
        </section>
    )
}

export default ForgotPassSection