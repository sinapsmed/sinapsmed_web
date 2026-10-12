'use client'
import { SendAgain, Verify } from '@/actions/auth'
import SubmitButton from '@/components/commons/SubmitButton'
import { CircularProgress, Paper } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useForm from '@/hooks/form'
import CountdownTimer from '@/components/commons/CountdownTimer'
import OtpInput from '@/components/commons/OtpInput'

interface Props {
    expiredDate?: string
}

const VerifySection = ({ expiredDate }: Props) => {
    const t = useTranslations('verify')
    const { action, error, pending } = useForm(Verify)
    const [otp, setOtp] = useState("")
    const searchParams = useSearchParams()

    return (
        <section id='verify-section' className='flex justify-center px-2 sm:px-0 py-9'>
            <Paper elevation={2} className='max-[400px]:w-full min-[400px]:w-[500px] bg-white p-5 rounded-md'>
                <h1 className='text-center font-bold text-3xl sm:text-4xl mb-8'>{t('title')}</h1>
                {
                    error && <p className='bg-red-500 text-center p-1.5 rounded-md text-white font-semibold mb-2.5'>{error}</p>
                }
                <form onSubmit={action} className='space-y-4'>
                    <OtpInput value={otp} onChange={(value) => setOtp(value)} length={6} autoFocus />
                    <input type="hidden" name="otp" value={otp} />
                    <input type="hidden" name="mail" value={searchParams.get('user') as string} />
                    <div className='grid grid-cols-2 gap-2 text-sm sm:text-base'>
                        <SendAgainButton
                            label={t('tryAgain')}
                            expiredDate={expiredDate}
                            phone={searchParams.get('phone') as string}
                            user={searchParams.get('user') as string}
                        />
                        <SubmitButton pending={pending} className='w-full text-center'>{t('verify')}</SubmitButton>
                    </div>
                </form>
            </Paper>
        </section>
    )
}

interface SendAgainProps {
    expiredDate?: string
    phone: string,
    user: string,
    label: string
}

const SendAgainButton = ({ phone, user, expiredDate, label }: SendAgainProps) => {
    const [expired, setExpired] = useState(expiredDate)
    const [pending, setPending] = useState(false)
    const sendAgain = async () => {
        setPending(true)
        const result = await SendAgain(phone, user)
        setExpired(result.data)
        setPending(false)
    }
    return (
        <button disabled={pending} onClick={sendAgain} type='button' className='w-full bg-neutral-500 rounded-md text-white font-semibold'>
            {pending ? <CircularProgress size={30} color='inherit' /> : label}
            <br />
            {
                expired && <CountdownTimer endDate={expired} />
            }
        </button>
    )
}

export default VerifySection