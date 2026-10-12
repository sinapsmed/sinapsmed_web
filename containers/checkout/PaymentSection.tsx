'use client'
import LocaleLink from '@/components/commons/LocaleLink';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { couponKey } from '@/libs/keys';
interface Props {
  status?: string | string[];
  ID?: string | string[] | undefined;
}
const toStr = (v: string | string[] | undefined) => Array.isArray(v) ? v[0] : v;
const PaymentSection = ({ status,ID }: Props) => {
      const s = toStr(status);
    const id = toStr(ID);
    const t = useTranslations('payment')
    const router = useRouter()
    useEffect(()=>{
        Cookies.remove(couponKey)
        router.refresh()
    },[])

    return (
        <section id='checkout-section' className='sectionBox'>
            <section id="not-found" className="sectionBox flex flex-center flex-col gap-2 text-center">
                <h1
                className={`font-bold text-3xl sm:text-4xl ${
                    s === "FullyPaid"
                    ? "text-green-500"
                    : s === "Declined" || s === "Cancelled"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
                >
                    {t(s === "FullyPaid" ? (id === undefined ? `${s}.free` : `${s}.title`) : `${s}.title`)}
                </h1>
                <p className="text-sm sm:text-lg text-neutral-700">{t(`${s}.description`)}</p>
                <LocaleLink href={'/dashboard'} className="py-3 px-4 rounded bg-blue-500 font-semibold text-white">{t('goDashboard')}</LocaleLink>
            </section>
        </section>
    )
}

export default PaymentSection