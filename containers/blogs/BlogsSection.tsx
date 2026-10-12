'use client'
import Image from 'next/image'
import React from 'react'
import { BlogCard, BlogList } from '@/types/blog'
import LocaleLink from '@/components/commons/LocaleLink'
import { Pagination } from '@mui/material'
import { useFetchContext } from '@/components/providers/FetchProvider'
import Suspense from '@/components/commons/Suspense'
import BlogSkeleton from '@/components/skeletons/BlogSkeleton'
import { useTranslations } from 'next-intl'
interface Props {
  category: string,
}

const BlogsSection = ({ category }: Props) => {
  const [state, pending, queries, setQuery] = useFetchContext<BlogList>()
  return (
    <section id='blogs-section' className='sectionBox space-y-7'>
      {
        state.data.pageCount > 0 && <div className='flex justify-center'>
          <Pagination page={+queries.page} onChange={(e, value) => setQuery('page', `${value}`)} count={state.data.pageCount} shape="rounded" />
        </div>
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        <Suspense count={8} pending={pending} Component={BlogSkeleton}>
          {
            state.data.data.map((blog) => (
              <Blog key={blog.id} data={blog} category={category} />
            ))
          }
        </Suspense>
      </div>
      {
        state.data.pageCount > 0 && <div className='flex justify-center'>
          <Pagination page={+queries.page} onChange={(e, value) => setQuery('page', `${value}`)} count={state.data.pageCount} shape="rounded" />
        </div>
      }
    </section>
  )
}


interface BlogProps {
  data: BlogCard,
  category: string
}

const Blog = ({ data, category }: BlogProps) => {
  const url = `/blogs/${category}/${data.href}?id=${data.id}`
  const t = useTranslations('blog')
  return (
    <div className='rounded-md overflow-hidden shadow-md'>
      <LocaleLink href={url} className='relative w-full h-[180px] inline-block group overflow-hidden'>
        <Image src={data.imgUrl} alt='post' className='group-hover:scale-125 transition-transform duration-500 object-center object-contain bg-gray-300' fill />
      </LocaleLink>
      <div className='w-full h-fit px-5 pt-2 pb-4 space-y-2.5'>
        <LocaleLink href={url} className='text-xl font-bold'>{data.title}</LocaleLink>
        <p className='line-clamp-3 text-neutral-700 italic'>
          {data.preview}
        </p>
        <LocaleLink href={url} className='bg-blue-700 hover:bg-blue-800 rounded-md text-white py-2 px-4 inline-block'>{t('readMore')}</LocaleLink>
      </div>
    </div>
  )
}

export default BlogsSection