import Label from '@/components/commons/Label'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Partner } from '@/types/partner'

interface Props {
  data: Partner[]
}

const PartnerSection = ({ data }: Props) => {
  const t = useTranslations('home.sections.partner')
  return (
    <section id='partner-section' className='sectionBox'>
      <Label className='p-2 sm:p-4 mb-6'>{t('label')}</Label>
      <div className='flex flex-wrap gap-10 flex-center'>
        {
          data.map(({id, logoUrl, name}) => (
            <div key={id} className='size-[100px] md:size-[150px] relative'>
              <Image src={logoUrl} alt={name} fill className='object-contain' />
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default PartnerSection