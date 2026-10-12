'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import CommentList from '@/components/blog/CommentList'
import CommentForm from '@/components/blog/CommentForm'
import { useTranslations } from 'next-intl'
import { useSession } from '@/components/providers/SessionProvider'
import LocaleLink from '@/components/commons/LocaleLink'
import usePath from '@/hooks/usePath'
import { useCommentActions, useCommentState } from '@/components/providers/CommentProvider'
import { GetBlogComments } from '@/actions/blog'
import { SearchQuery } from '@/types/query'

interface Props {
    pageCount: number,
    id: SearchQuery
}

const CommentSection = ({ pageCount, id }: Props) => {
    const t = useTranslations('blog.comment')
    const session = useSession()
    const { state } = useCommentState()
    return (
        <section id='comment-section' className='space-y-3'>
            <h1 className='font-semibold text-3xl mb-2'>{state.count} {t('title')}</h1>
            {
                session ?
                    <CommentForm /> : <LoginFirst />
            }
            <CommentList />
            <MoreButton pageCount={pageCount} id={id}/>
        </section>
    )
}

const LoginFirst = () => {
    const t = useTranslations('blog.comment')
    const path = usePath()
    return (
        <p className='text-lg py-1 text-center'>
            {t('info')} <LocaleLink href={`/login?callback=${encodeURIComponent(path)}`} className='text-blue-600 font-semibold'>{t('login')}</LocaleLink>
        </p>
    )
}

interface MoreButtonProps {
    pageCount: number,
    id: SearchQuery
}

const MoreButton = ({ pageCount, id }: MoreButtonProps) => {
    const [page, setPage] = useState(1)
    const [pending, setPending] = useState(false)
    const {extendComments} = useCommentActions()
    const {state} = useCommentState()
    const more = async () => {
        setPending(true)
        const result = await GetBlogComments(id, page+1, state.newComments)
        if(result.data) extendComments(result.data.data)
        setPending(false)
        setPage(prev => prev + 1)
    }
    const t = useTranslations('common')
    return (
        pageCount !== page && pageCount>0 && <div className='text-center'>
            <button disabled={pending} onClick={more} className='bg-blue-600 p-2 rounded text-white font-semibold'>{t('more')}</button>
        </div>
    )
}

export default CommentSection