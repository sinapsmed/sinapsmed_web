import FAQList from '@/components/faq/FAQList'
import Label from '@/components/commons/Label'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { FAQ } from '@/types/faq'

interface Props{
    data: FAQ[]
}

const FAQSection = ({data}: Props) => {
    const t = useTranslations('home.sections.faq')
    const label : string[] = t.raw('label')
    return (
        <section id='faq-section' className='sectionBox'>
            <Label className='p-2 sm:p-4 leading-none'>{label[0]} <br /> {label[1]}</Label>
            {/* <p className='text-neutral-700 text-center text-lg mb-6'>{t('desc.start')}
                <Link target='_blank' rel='noopener noreferrer' className='text-[#5CB85C] underline' href={'https://api.whatsapp.com/send/?phone=994507146325&text=Salam%21+M%C9%99nim+Sinapsmed-Teletibb+sistemi+il%C9%99+ba%C4%9Fl%C4%B1+sual%C4%B1m+var.&type=phone_number&app_absent=0'}>{t('desc.contact')}</Link>
                {t('desc.end')}
            </p> */}
            <FAQList data={data}/>
        </section>
    )
}

export default FAQSection