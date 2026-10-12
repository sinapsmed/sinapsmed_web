import LocaleLink from '@/components/commons/LocaleLink'
import { useTranslations } from 'next-intl'
import React from 'react'

const FilterSection = () => {
    const t = useTranslations('analyses.filter')

    const choices = [
        {
            title: t('by.city'),
            path: 'city'
        },
        {
            title: t('by.clinic'),
            path: 'clinic'
        },
        {
            title: t('by.location'),
            path: 'location'
        }
    ]

    return (
        <section id='filter-analyses-section' className='sectionBox'>
            <h1 className='text-center font-semibold text-3xl'>{t('title')}</h1>
            <div className='flex flex-col items-center gap-2 mt-4'>
                {
                    choices.map((choice, index) => {
                        const url = `/analyses/filter/${choice.path}`
                        return (
                            <LocaleLink key={index} href={url} className='bg-blue-500 hover:bg-blue-600 text-white py-2.5 w-[300px] max-[350px]:w-full text-xl rounded text-center'>{choice.title}</LocaleLink>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default FilterSection