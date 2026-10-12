'use client'
import Image from 'next/image'
import React, { Fragment } from 'react'
import BannerBg from '@/public/banner.jpg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/libs/routes'
import { useTranslations } from 'next-intl'
import LocaleLink from './LocaleLink'
import { Path } from '@/types/header'

interface Props {
    paths: Path[],
    mainRoute?: string
}

const Banner = ({ paths, mainRoute }: Props) => {
    const t = useTranslations('common')
    const title = paths.at(-1)?.title
    let totalHref = mainRoute ?? ''
    return (
        <section id='banner-section' className='relative w-full h-[250px] flex flex-center text-center capitalize'>
            <Image alt={`${title}-Banner`} src={BannerBg} fill className='object-cover' />
            <div className='relative space-y-3 font-semibold'>
                <h1 className='text-4xl sm:text-5xl'>{title}</h1>
                <p className='px-3 text-sm sm:text-base'>
                    <LocaleLink href={'/'} className='text-blue-600'>{t('navbar.home')} </LocaleLink>
                    {
                        paths.map((path, index) => {
                            totalHref += `/${path.href}`
                            return (
                                <Fragment key={index}>
                                    {path.href ? <LocaleLink key={index} href={totalHref} className='text-blue-600'>/ {path.title} </LocaleLink>
                                    :<span> / {path.title}</span>}
                                </Fragment>
                            )
                        })
                    }
                </p>
            </div>
        </section>
    )
}

export default Banner