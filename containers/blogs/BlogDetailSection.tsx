import Image from 'next/image'
import React from 'react'
import BlogStats from '@/components/blog/BlogStats'
import { Blog } from '@/types/blog';
import BlogShare from '@/components/blog/BlogShare';

interface Props {
  data: Blog
}

const BlogDetailSection = ({ data }: Props) => {
  return (
    <section id='blog-detail-section' className='space-y-2'>
      <div className='relative w-full h-[200px] sm:h-[300px] lg:h-[500px] inline-block group overflow-hidden'>
        <Image src={data.imageUrl} alt={data.name} className='object-center object-contain bg-gray-300' fill />
      </div>
      <div className='text-stone-700 remove-tailwind' dangerouslySetInnerHTML={{ __html: data.description }}>
      </div>
      <BlogStats
        createdAt={data.createdAt}
        creator={{
          name: data.creator,
          imageUrl: data.creatorImage,
          role: data.createorRole.toLowerCase()
        }}
        like={data.like}
        view={data.view}
      />
      <BlogShare title={data.name} imageUrl={data.imageUrl}/>
    </section>
  )
}

export default BlogDetailSection