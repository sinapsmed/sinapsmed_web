import React from 'react'
import { GetExpertDetailBlogs } from '@/actions/expert'
import HorizontalBlogCard from '@/containers/expert/HorizontalBlogCard'
import { getTranslations } from 'next-intl/server'

interface Props {
  id: string
}

const ExpertBlogs = async ({ id }: Props) => {
  const result = await GetExpertDetailBlogs(id, 1)
  const blogs = result?.data?.data.data || []

  const t = await getTranslations('expert.detail')

  return (
    <div className="w-full border min-h-[200px] h-fit p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t('expertBlog')}</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-600">{t('emptyBlog')}</p>
      ) : (
        <ul className="space-y-2">
          {blogs.map((blog: any) => (
            <HorizontalBlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              href={blog.href}
              preview={blog.preview}
              imgUrl={blog.imgUrl}
              category={blog.category}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpertBlogs
