'use client'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import CommentForm from './CommentForm'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { BlogComment, BlogCommentWithReply } from '@/types/blog'
import { getAgoIndex } from '@/libs/date'
import { useCommentActions, useCommentState } from '../providers/CommentProvider'
import { CircularProgress } from '@mui/material'
import { GetCommentReplies } from '@/actions/blog'
import { useSession } from '../providers/SessionProvider'

const verifyStatuses = ['pending', 'verified', 'rejected']

const CommentList = () => {
    const { state } = useCommentState()
    return (
        <div className='rounded-md'>
            {
                state.comments.map((comment) => (
                    <Comment key={comment.id} data={comment} />
                ))
            }
        </div>)
}

interface CommentProps {
    data: BlogCommentWithReply
}

const Comment = ({ data }: CommentProps) => {
    const { replies, newReplies, ...comment } = data
    const { extendComments } = useCommentActions()
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(data.replyCount)
    const [pending, setPending] = useState(false)
    const [open, setOpen] = useState(true)

    const more = async () => {
        setPage(prev => prev + 1)
        setPending(true)
        const result = await GetCommentReplies(data.id, page + 1, newReplies)
        if (result.data) extendComments(result.data.data, data.id)
        setPending(false)
        setCount(prev => Math.max(0, prev - 10))
    }
    const { state } = useCommentState()
    const t = useTranslations('date.reply')
    return (
        <div className='rounded py-3'>
            <CommentBar data={comment} />
            <div className='ms-12'>
                {
                    state.open && state.open === data.id && <CommentForm parentId={data.id} to={data.userName} />
                }
                {
                    data.replyCount > 0 && (
                        count > 0 ?
                            <button disabled={pending} onClick={more} className='text-neutral-700'>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span className='font-semibold ms-2'>{t(`show${count > 0 ? '_plural' : ''}`, { count })}</span>
                            </button> :
                            <button onClick={() => setOpen(prev => !prev)} className='text-neutral-700'>
                                <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
                                <span className='font-semibold ms-2'>
                                    {
                                        open ? t('hide') : t('showAll')
                                    }
                                </span>
                            </button>
                    )
                }
                {
                    pending && <div className='flex justify-center'>
                        <CircularProgress size={30} />
                    </div>
                }
                {
                    open && replies.map((reply) => (
                        <Reply key={reply.id} data={reply} parentId={data.id} />
                    ))
                }
            </div>
        </div>
    )
}

interface ReplyProps {
    data: BlogComment,
    parentId: string
}

const Reply = ({ data, parentId }: ReplyProps) => {
    const { state } = useCommentState()

    return (
        <div className='py-3 space-y-2 rounded-md'>
            <CommentBar data={data} />
            <div className='ms-12'>
                {
                    state.open && state.open === data.id && <CommentForm to={data.userName} parentId={parentId} />
                }
            </div>
        </div>
    )
}

interface CommentBarProps {
    data: BlogComment,
}

const CommentBar = ({ data }: CommentBarProps) => {
    const t = useTranslations('')
    const { toggleShow } = useCommentActions()
    const [ago, key] = useMemo(() => {
        return getAgoIndex(data.createdAt)
    }, [data.createdAt]);
    const session = useSession()
    const [open, setOpen] = useState(false)
    const toggleForm = () => {
        toggleShow(open ? undefined : data.id)
        setOpen(prev => !prev)
    }
    const date = ago === 0 ? t('date.now') : `${t(`date.periods.${key}${ago > 1 ? '_plural' : 0}`, { count: ago })} ${t('date.ago')}`

    const status = data.verifyStatus!==undefined ? verifyStatuses[data.verifyStatus] : null
    return (
        <div className='flex gap-3'>
            <div className='size-8 sm:size-10 relative'>
                <Image alt={data.userName ?? 'me'} fill src={data.userImage ?? ''} className='rounded-full bg-[#00000005] object-cover' />
            </div>
            <div>
                <div className='flex gap-2 items-start sm:items-center'>
                    <div className='flex gap-x-2 sm:items-center flex-col sm:flex-row'>
                        <span className='font-bold text-base'>{data.userName}</span>
                        <span className='text-stone-500 text-xs sm:text-sm sm:mt-0.5' suppressHydrationWarning>{date}</span>
                    </div>
                    <div className='flex gap-2 items-center mt-1 sm:mt-0'>
                        {
                            session && <button onClick={toggleForm} className='text-stone-700 mx-1 text-sm'>
                                <FontAwesomeIcon icon={faComments} />
                            </button>
                        }
                        {
                            session && status &&
                                <span className={`text-xs status font-semibold px-1 rounded ${status}`}>
                                    {t(`blog.comment.status.${status}`)}
                                </span>
                        }
                    </div>
                </div>
                <p className='text-neutral-700' dangerouslySetInnerHTML={{ __html: data.description }}></p>
            </div>
        </div>
    )
}

export default CommentList