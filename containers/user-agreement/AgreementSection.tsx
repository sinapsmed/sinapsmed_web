import { Article1, Article10, Article2, Article3, Article4, Article5, Article6, Article7, Article8, Article9, OtherArticle } from '@/components/agreement/Articles'
import { useTranslations } from 'next-intl'
import React from 'react'

const AgreementSection = () => {
  const t = useTranslations('agreement')
  return (
    <section id='user-agreement-section' className='sectionBox'>
      <h1 className='text-center font-semibold'>{t('header')}</h1>
      <div className='space-y-4'>
        <Article1 />
        <Article2 />
        <Article3 />
        <Article4 />
        <Article5 />
        <Article6 />
        <Article7 />
        <Article8 />
        <Article9 />
        <Article10 />
        <OtherArticle />
      </div>
      <p>{t('lastDesc')}</p>
    </section>
  )
}

export default AgreementSection