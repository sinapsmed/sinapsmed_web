import ButtonLink from '@/components/commons/ButtonLink'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Service } from '@/types/service'

interface Props{
    data: Service
}

const SubServiceSection = ({data}: Props) => {
    const t = useTranslations('common.buttonLinks')
    return (
        <section className='sectionBox'>
            <div className='flex flex-col sm:flex-row gap-8'>
                <div className='textbox flex-1 gap-2 flex flex-col justify-center'>
                    <h1 className='text-4xl font-semibold'>{data.title}</h1>
                    <p className='text-neutral-700'>
                        {data.description}
                    </p>
                    <div>
                        <ButtonLink href={`experts?spec=${data.id}`}>{t('appointment')}</ButtonLink>
                    </div>
                </div>
                <div className='relative h-[250px] sm:aspect-square md:aspect-video'>
                    <Image alt='service' src={data.imageUrl} fill className='border-[15px] bg-[#737373] rounded object-contain' />
                </div>
            </div>
        </section>
    )
}

export default SubServiceSection