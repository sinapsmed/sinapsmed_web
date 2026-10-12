'use client'
import Image from 'next/image'
import React from 'react'
import ButtonLink from '../commons/ButtonLink'
import { Expert } from '@/types/expert'
import ExpertSkeleton from '../skeletons/ExpertSkeleton'
import Suspense from '../commons/Suspense'
import { useTranslations } from 'next-intl'
import { createRoute } from '@/libs/query'
import LocaleLink from '../commons/LocaleLink'
import Link from 'next/link'

interface Props {
    data: Expert[],
    pending: boolean,
    service?: string
}

const ExpertList = ({ data, pending, service }: Props) => {
    const t = useTranslations('expert')
    return (
        <div className='space-y-5'>
            {
                data.length > 0 ? <Suspense count={5} pending={pending} Component={ExpertSkeleton}>
                    {data.map((expert) => (
                        <ExpertCard service={service} data={expert} key={expert.id} />
                    ))}
                </Suspense> :
                    <p className='text-center text-lg'>{t('notFound')}</p>
            }
        </div>
    )
}

interface ExpertProps {
    data: Expert,
    service?: string
    key?: string
}

const ExpertCard = ({ data, service ,key}: ExpertProps) => {
    const url = createRoute(`/experts/${data.seo}/appointment`, {
        id: data.id,
        spec: service
    })
    const detaileUrl= createRoute(`/experts/${data.seo}/details?id=${data.id}`)
    const t = useTranslations('expert')

    return (
        <div className='flex flex-col md:flex-row md:min-h-[300px] bg-stone-100 text-center md:text-left'>
            <Link href={detaileUrl} className='image-box w-full md:w-1/3 relative h-[250px] md:h-auto '>
                <div className='absolute h-1/5 md:h-full w-full md:bottom-0 top-0 left-0 md:w-1/2 bg-blue-600' />
                <Image alt={data.fullName} src={data.photoUrl} fill className='object-center object-contain p-5' />
            </Link>
            <div className='flex items-center md:items-baseline flex-col text-box w-full md:w-2/3 pb-6 px-4 md:py-6 space-y-5'>
                <div>
                    <LocaleLink href={detaileUrl} className='font-bold text-lg text-blue-600'>{data.specality} {data.fullName}</LocaleLink>
                    <p className=' font-semibold pointer-events-none'>{data.services}</p>
                </div>
                <div className="max-w-[300px] flex flex-col gap-y-2 text-center pt-5">
                <ButtonLink className='w-full bg-blue-600 hover:bg-blue-700' href={detaileUrl}>{t('appointment.detail')}</ButtonLink>
                <ButtonLink className='w-full' href={url}>{t('appointment.get')}</ButtonLink>
                </div>
            </div>
        </div>
    )
}

export default ExpertList