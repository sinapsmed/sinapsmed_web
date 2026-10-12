'use client'
import ButtonLink from '@/components/commons/ButtonLink'
import Label from '@/components/commons/Label'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import Vector1 from "@/public/Vector1.webp";
import Vector2 from "@/public/Vector2.webp";
import { useTranslations } from 'next-intl'

const AboutSection = () => {
    const t = useTranslations('home.sections.define')
    const leftContent: string[] = t.raw('content.left')
    const rightContent: {
        header: string,
        content: string
    }[] = t.raw('content.right')
    const tCommon = useTranslations('common.buttonLinks')
    return (
        <section id='about-section' className='sectionBox relative'>
            <Image src={Vector1} alt='vector1' className='absolute size-[150px] top-0 right-0' />
            <Image src={Vector2} alt='vector1' className='absolute size-[150px] bottom-5 right-1/2' />
            <Label className='p-2 sm:p-4 mb-6'>{t('label')}</Label>
            <div className='relative grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mt-6'>
                <div className='text-neutral-700 text-lg'>
                    <p>{leftContent[0]}</p>
                    <p>{leftContent[1]}</p>
                </div>
                <div className='flex flex-col items-center sm:items-start gap-5'>
                    <div>
                        <h1 className='font-semibold text-2xl sm:text-3xl mb-1'><FontAwesomeIcon className='text-green-700 pe-1' icon={faCheck} />{rightContent[0].header}</h1>
                        <p className='text-lg text-neutral-700'>{rightContent[0].content}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold text-2xl sm:text-3xl mb-1'><FontAwesomeIcon className='text-green-700 pe-1' icon={faCheck} />{rightContent[1].header}</h1>
                        <p className='text-lg text-neutral-700'>{rightContent[1].content}</p>
                    </div>
                    <ButtonLink href={'/experts'}>{tCommon('appointment')}</ButtonLink>
                </div>
            </div>
        </section>
    )
}

export default AboutSection