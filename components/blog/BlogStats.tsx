import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/public/icon.png'
interface Props {
    createdAt: string,
    creator: {
        name: string,
        role: string,
        imageUrl: string
    },
    like: number,
    view: number
}

const BlogStats = ({ createdAt, creator, like, view }: Props) => {
    const t = useTranslations('')

    const date = new Date(createdAt)
    const month = t.raw('date.months')[date.getMonth()]

    return (
        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-between py-3 items-center border-b-2'>
            <div className='flex gap-2 items-center leading-none'>
                <div className='size-10 relative'>
                    <Image fill src={creator.imageUrl??Icon.src} alt='author-profile' className='rounded-full border object-cover' />
                </div>
                    <h1 className='font-semibold'>{creator.name}</h1>
            </div>
            <div className='divide-x-2 space-x-1.5 text-neutral-800'>
                <span className='ps-1.5'>
                    <FontAwesomeIcon icon={faEye} />
                    <span className='ms-1'>{view}</span>
                </span>
                <span className='ps-1.5'>
                    <FontAwesomeIcon icon={faHeart} />
                    <span className='ms-1'>{like}</span>
                </span>
                <span className='ps-1.5'>
                    {date.getDate()} {month}, {date.getFullYear()}
                </span>
            </div>
        </div>
    )
}

export default BlogStats