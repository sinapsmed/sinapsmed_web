'use client'
import LocaleLink from '@/components/commons/LocaleLink'
import SubmitButton from '@/components/commons/SubmitButton'
import { Alert, Box, Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Login } from '@/actions/auth'
import { SearchQuery } from '@/types/query'
import OutlinedField from '@/components/commons/OutlinedField'
import { PasswordInput } from '@/components/dashboard/change-password/ChangePasswordForm'
import useForm from '@/hooks/form'

interface Props {
    registered: Boolean,
    callback: SearchQuery,
    warning: SearchQuery
}

const LoginSection = ({ registered, callback, warning }: Props) => {
    const t = useTranslations('login')
    const {action, error, pending} = useForm(Login)
    const p = useTranslations(warning as string)
    return (
        <section id='login-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[350px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-4xl mb-8'>{t('login')}</h1>
                {
                    registered && <Box className="mb-2 space-y-2">
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Təbriklər, uğurla qeydiyyatdan keçdiniz.
                        </Alert>
                        <Alert severity="info">
                            Hesab təsdiqləmə linki e-poçtunuza göndərildi!
                            Zəhmət olmasa, linkə keçid edərək hesabı təsdiqləyin, əks halda hesaba daxil olabilməyəcəksiniz.
                        </Alert>
                    </Box>
                }
                {
                    warning && <Box className="mb-2 space-y-2">
                        <Alert severity="warning">
                            {p('warning')}
                        </Alert>
                    </Box>
                }
                {
                    error && <p className='bg-red-500 text-center p-1.5 rounded-md text-white font-semibold mb-2.5'>{error}</p>
                }
                <form className='space-y-4' onSubmit={action}>
                    <OutlinedField size='medium' required label={t('email')} type='email' name='email' autoComplete='email' />
                    <PasswordInput
                        label={t('password')}
                        name='password'
                        fullWidth
                    />
                    <input type="hidden" name="callback" value={callback} />
                    <LocaleLink href={'/forgot-password'} className='text-blue-700 text-center w-full inline-block'>{t('forget')}</LocaleLink>
                    <SubmitButton pending={pending} className='w-full text-center'>{t('login')}</SubmitButton>
                    <div className='text-center'>{t('ask.question')} <LocaleLink href={'/register'} className='text-blue-700'>{t('ask.link')}</LocaleLink></div>
                </form>
            </Paper>
        </section>
    )
}

export default LoginSection