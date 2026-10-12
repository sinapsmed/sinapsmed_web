import Label from '@/components/commons/Label'
import { faCalendarCheck, faCreditCard, faStethoscope, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Photo from '@/public/onlineVideo.png'
import Image from 'next/image'
import Vector1 from "@/public/Vector1.webp";
import Vector2 from "@/public/Vector2.webp";
import { useTranslations } from 'next-intl'
const icons = [faStethoscope, faCalendarCheck, faCreditCard, faVideo]
const GuideSection = () => {
    const t = useTranslations('home.sections.guide')
    const content: {
        header: string,
        desc: string
    }[] = t.raw('content')
    return (
        <section id='guide-section' className='sectionBox'>
            <Label className='p-2 sm:p-4 mb-6'>{t('label')}</Label>
            <div className='flex flex-col lg:flex-row gap-6 items-center'>
                <div className="textbox grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:w-1/2">
                    {
                        content.map((c, index) => (
                            <div key={index} className="row flex gap-7">
                                <div className="icon text-xl text-blue-800 bg-[#F0F1FF] hover:bg-[#FFEED7] size-[55px] flex flex-center rounded-full">
                                    <FontAwesomeIcon icon={icons[index]} />
                                </div>
                                <div className='mt-2 space-y-2 flex-1'>
                                    <h1 className='text-2xl font-bold transition-all'>{c.header}</h1>
                                    <p className='text-neutral-700'>{c.desc}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="imgbox relative p-5 w-full lg:w-1/2">
                    <div className='frame border-[#F7F7F7] relative border-[30px] aspect-[3/2] overflow-hidden'>
                        <Image src={Photo} alt='image' fill className='object-cover' />
                    </div>
                    <Image src={Vector1} alt='vector1' className='absolute size-[150px] top-0 right-0' />
                    <Image src={Vector2} alt='vector1' className='absolute size-[150px] bottom-0 left-0' />
                </div>
            </div>
        </section>
    )
}

export default GuideSection