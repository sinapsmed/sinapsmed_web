'use client'
import { SendAgain, VerifyPhone } from '@/actions/auth'
import NumberField from '@/components/commons/NumberField'
import OtpInput from '@/components/commons/OtpInput'
import RequiredInput from '@/components/commons/RequiredInput'
import { countryCodes } from '@/libs/phone'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

interface Props {
    email: string,
    close: () => void
}

const UpdatePhone = ({ email, close }: Props) => {
    const [code, setCode] = useState(countryCodes[0])
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSent, setIsSent] = useState(false)
    const [pending, setPending] = useState(false)
    const t = useTranslations('dashboard.user.profile.editPhone')

    const sendCode = async () => {
        if (!phone) return
        setError(null)
        setPending(true)
        const result = await SendAgain(code + phone, email)
        if (!result.success) setError(result.message ?? null)
        else setIsSent(true)
        setPending(false)
    }

    const router = useRouter()
    const verify = async () => {
        setError(null)
        setPending(true)
        const result = await VerifyPhone(otp, email)
        if (!result.success) setError(result.message ?? null)
        else {
            router.refresh()
            close()
        }
        setPending(false)
    }
    return (
        <div className='bg-white p-4 rounded mx-2 sm:w-[400px] space-y-2'>
            <h1 className='text-lg text-center font-semibold'>
                {!isSent ? t('enterPhone') : t('enterCode')}
            </h1>
            {
                !isSent ?
                    <NumberField
                        label={t('phone')}
                        required
                        input={{
                            value: phone,
                            onChange: (value)=>setPhone(value)
                        }}
                        select={{
                            value: code,
                            onChange: (value)=>setCode(value)
                        }}
                    />:
                    <OtpInput value={otp} onChange={(value) => setOtp(value)} length={6} autoFocus />
            }
            {
                error && <p className='text-red-500'>{error}</p>
            }
            <div className='grid grid-cols-2 gap-2'>
                <button type='button' onClick={close} className='p-2 bg-yellow-500 text-white rounded font-semibold'>
                    {t('cancel')}
                </button>
                <button disabled={pending} type='button' onClick={!isSent ? sendCode : verify} className='p-2 bg-blue-500 text-white rounded font-semibold'>
                    {
                        !isSent ? t('sendCode') : t('verify')
                    }
                </button>
            </div>
        </div>
    )
}

export default UpdatePhone