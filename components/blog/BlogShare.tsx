
'use client'
import { getShareUrl } from '@/libs/socialMedia'
import { faFacebookF, faLinkedinIn, faPinterestP, faRedditAlien, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props{
    title: string,
    imageUrl: string 
}

const BlogShare = ({title, imageUrl}: Props) => {
    const [url, setUrl] = useState('')

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            setUrl(window.location.href);
        }
    }, [])
    return (
        <div className='flex justify-center gap-3 pt-3'>
            <Link target='_blank' rel='noopener noreferrer' href={getShareUrl('x', url, title)} className='rounded-full size-10 bg-black text-white flex flex-center'>
                <FontAwesomeIcon icon={faXTwitter} />
            </Link>
            <Link target='_blank' rel='noopener noreferrer' href={getShareUrl('facebook', url)} className='rounded-full size-10 bg-[#4661C5] text-white flex flex-center'>
                <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link target='_blank' rel='noopener noreferrer' href={getShareUrl('pinterest', url, title, imageUrl)} className='rounded-full size-10 bg-[#FF2E2E] text-white flex flex-center'>
                <FontAwesomeIcon icon={faPinterestP} />
            </Link>
            <Link target='_blank' rel='noopener noreferrer' href={getShareUrl('linkedin', url, title)} className='rounded-full size-10 bg-[#0073B0] text-white flex flex-center'>
                <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
            <Link target='_blank' rel='noopener noreferrer' href={getShareUrl('reddit', url, title)} className='rounded-full size-10 bg-[#FD4507] text-white flex flex-center'>
                <FontAwesomeIcon icon={faRedditAlien} />
            </Link>
        </div>
    )
}

export default BlogShare