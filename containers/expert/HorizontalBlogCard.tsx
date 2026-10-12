import Image from 'next/image'
import LocaleLink from '@/components/commons/LocaleLink'
import React from 'react'

interface BlogCardProps {
  id: string
  title: string
  href: string
  preview: string
  imgUrl: string
  category: string
}

const HorizontalBlogCard = ({ id, title, href, preview, imgUrl, category }: BlogCardProps) => {
  const url = `/blogs/${category}/${href}?id=${id}`

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <div className="w-32 h-32 min-w-[128px] overflow-hidden rounded-md">
        <Image
          src={imgUrl}
          alt={title}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 flex flex-col justify-start pt-1">
        <LocaleLink
          href={url}
          className="font-bold text-slate-800 text-[18px] leading-tight line-clamp-1"
        >
          {title}
        </LocaleLink>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{preview}</p>
      </div>
    </div>
  )
}

export default HorizontalBlogCard
