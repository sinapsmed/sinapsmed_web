'use client'
import LocaleLink from '@/components/commons/LocaleLink';
import { useTranslations } from 'next-intl';
import React from 'react'
interface Props {
    status?: string
}

const VerifiedSection = ({ status }: Props) => {
    const t = useTranslations('verified')

    return (
        <section id='checkout-section' className='sectionBox'>
            <section id="not-found" className="sectionBox flex flex-center flex-col gap-2 text-center">
                <h1 className="text-2xl sm:text-4xl font-semibold">{t('title')}</h1>
                <p className="text-sm sm:text-lg text-neutral-700">{t('description')}</p>
                <LocaleLink href={'/login'} className="py-3 px-4 rounded bg-blue-500 font-semibold text-white">{t('goLogin')}</LocaleLink>
            </section>
        </section>
    )
}

export default VerifiedSection