'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import RequiredInput from '../commons/RequiredInput';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from '@/navigation';
import Cookies from "js-cookie";
import { couponKey } from '@/libs/keys';
interface Props {
    success: boolean
    code?: string
}

const CouponCode = ({ code, success }: Props) => {
    const router = useRouter()
    const t = useTranslations('cart.bar.coupon')
    const [couponCode, setCouponCode] = useState(code)
    const applyCode = () => {
        if(!couponCode) return
        Cookies.set(couponKey, couponCode)
        router.refresh()
    }
    const removeCode = () =>  {
        Cookies.remove(couponKey)
        router.refresh()
    }
    useEffect(() => {
        if (!success) Cookies.remove(couponKey)
    }, [success])
    return (
        <div>
            <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faTicket} className='me-1' />
                <h1 className='font-semibold text-xl'>{t('title')}</h1>
            </div>
            <p className='text-sm text-neutral-600'>{t('desc')}</p>
            <div className='mt-2 flex gap-1 min-[400px]:flex-row flex-col'>
                <RequiredInput
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    title={t('title')}
                    name='code'
                    type="text"
                    disabled={!!code}
                    placeholder={t('title')}
                    className='flex-1 p-2 border rounded'
                />
                {
                    code ? <button onClick={removeCode} className='bg-red-500 text-white rounded py-2 px-4 font-semibold whitespace-nowrap'>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>:
                    <button onClick={applyCode} className='bg-blue-500 text-white rounded py-2 px-2 font-semibold whitespace-nowrap'>{t('apply')}</button>
                }
            </div>
        </div>
    )
}

export default CouponCode