'use client'
import Image from 'next/image';
import React from 'react'
import Slider, { Settings } from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Banner } from '@/types/banner';
import { Link } from '@/navigation';

interface Props {
    data: Banner[]
}


const HeroSection = ({ data }: Props) => {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow type='next' />,
        prevArrow: <CustomArrow type='prev' />,
        autoplay: true,
        appendDots: dots => (
            <div
                style={{
                    position: "absolute",
                    bottom: "10px",  // move inside slide
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <ul style={{ margin: 0 }}> {dots} </ul>
            </div>
        ),
        autoplaySpeed: 5000,
        touchThreshold: 20,
        pauseOnHover: true
    };
    return (
        <section id='hero-section'>
            {
                length != 1 ?
                    <Slider {...settings}>
                        {
                            data.map((slide) => (
                                <Slide data={slide} key={slide.id} />
                            ))
                        }
                    </Slider>
                    :
                    <div>
                        <Slide data={data[0]} />
                    </div>
            }
        </section>
    )
}

interface SlideProps {
    data: Banner
}

const Slide = ({ data }: SlideProps) => {
    const { title, description, imageUrl, link, linkTitle } = data
    const hasText = !!(title && description && linkTitle)
    return (
        <div className='relative min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-68px)] flex justify-center items-center md:justify-start md:px-16 pt-5 pb-10'>
            <Image src={imageUrl} alt='hero-bg' fill className='object-cover object-center' />
            {
                hasText && <div className="z-[1] md:w-1/2 text-center md:text-left space-y-2">
                    <h1 className='text-4xl xl:text-5xl font-bold drop-shadow-md text-white'>
                        {title}
                    </h1>
                    <p className='text-neutral-700 text-lg drop-shadow-md text-white  '>
                        {description}
                    </p>
                    <Link
                        href={link}
                        className='inline-block bg-[#8757B2] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#6b3e93]'
                    >
                        {linkTitle}
                    </Link>
                </div>
            }
        </div>
    )
}

interface ArrowProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    type: 'prev' | 'next';
}

const CustomArrow = ({ onClick, type }: ArrowProps) => {
    return (
        <div
            onClick={onClick}
            className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer 
                        ${type === 'prev' ? 'left-2' : 'right-2'} 
                        z-10 bg-white/40 rounded size-9 flex flex-center shadow-lg hover:bg-neutral-50`}
        >
            <FontAwesomeIcon icon={type === 'prev' ? faChevronLeft : faChevronRight} />
        </div>
    );
};

export default HeroSection