import LocaleLink from '@/components/commons/LocaleLink'
import { useTranslations } from 'next-intl'
import React from 'react'

const PrivacySection = () => {
    const t = useTranslations('privacy')
    const introAltDesc: string[] = t.raw("intro.altDesc")
    const lastList: string[] = t.raw("last.list")
    const lastAltDesc: string[] = t.raw("last.altDesc")
    return (
        <section id='privacy-policy-section' className='sectionBox'>
            <h1 className='font-bold mb-3'>{t('header')}</h1>
            <div className='space-y-1'>
                <div>
                    <h1 className='font-semibold'>{t('intro.header')}</h1>
                    <p className="text-neutral-700">"
                        {t('intro.desc')}
                    </p>
                    <p className="text-neutral-700">"
                        {
                            introAltDesc[0]
                        }
                        <LocaleLink href={"/user-agreement"} className='px-1 text-blue-700'>"{introAltDesc[1]}"</LocaleLink>
                        {
                            introAltDesc[2]
                        }
                    </p>
                </div>
                <div>
                    <h1 className='font-semibold'>{t('second.header')}</h1>
                    <p className="text-neutral-700">"
                        {t('second.desc')}
                    </p>
                </div>
                <div>
                    <h1 className='font-semibold'>{t('last.header')}</h1>
                    <p className="text-neutral-700">
                        {t('last.desc')}
                    </p>
                    <ul className='list-disc ms-5'>
                        {
                            lastList.map((item,index)=>(
                                <li key={index}>{item}</li>
                            ))
                        }
                    </ul>
                    {
                        lastAltDesc.map((item,index)=>(
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default PrivacySection