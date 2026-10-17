'use client'
import React, { useState } from 'react'
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import ButtonLink from '@/components/commons/ButtonLink';
import Label from '@/components/commons/Label';
import { Paper } from '@mui/material';
import { useTranslations } from 'next-intl';
import { BoostedExpert } from '@/types/expert';
import { GetAllBoostedExpert } from '@/actions/expert';
import Link from 'next/link';
const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 1,
                centerMode: false
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            }
        }
    ]
};

interface Props {
    data: BoostedExpert[]
}

const ExpertSliderSection = ({ data }: Props) => {
    const t = useTranslations('home.sections.experts')
    const [state, setState] = useState(data)
    const [maxSlide, setMaxSlide] = useState(0)
    const beforeChange = async (current: number, next: number) => {
        if (next > maxSlide && next % 2 == 0 && next > 0) {
            const result = await GetAllBoostedExpert(next / 2)
            setState(prev => [...prev, ...(result.data?.data || [])])
            setMaxSlide(next)
        }
    }
    return (
        <section id='expert-section' className='sectionBox'>
            <Label className='p-2 sm:p-4 mb-6'>{t('label')}</Label>
            <Slider beforeChange={beforeChange} {...settings} className='my-2'>
                {
                    state.map((slide) => (
                        <Slide data={slide} key={slide.id} />
                    ))
                }
            </Slider>
        </section>
    )
}

interface SlideProps {
    data: BoostedExpert
}

const Slide = ({ data }: SlideProps) => {
    const t = useTranslations('common.buttonLinks')
    return (
        <div className='mx-5'>
            <Paper elevation={3} className='px-4 py-8 flex flex-col items-center text-center my-4'>
                <div className='profile relative size-[150px] bg-[#00000005] rounded-full'>
                    <Image alt={data.fullName} src={data.photoUrl} fill quality={90} className='object-center object-cover rounded-full' />
                </div>
                <Link href={`/experts/${data.seoUrl}/details?id=${data.id}`} className='text-lg font-bold mt-4 mb-1.5'>{data.fullName}</Link>
                <p className='text-sm text-neutral-700 italic mb-4'>
                    {data.specialties.join(', ')}
                </p>
                <ButtonLink href={`/experts/${data.seoUrl}/appointment?id=${data.id}`}>{t('appointment')}</ButtonLink>
            </Paper>
        </div>
    )
}

export default ExpertSliderSection
