'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useCommentActions, useCommentState } from '../providers/CommentProvider'
import { AddComment } from '@/actions/blog'
import { useUser } from '../providers/UserProvider'

interface Props {
    parentId?: string,
    to?: string,
}

const CommentForm = ({ parentId, to }: Props) => {
    const t = useTranslations('blog.comment')

    const [description, setDescription] = useState('')
    const [showButtons, setShowButtons] = useState(false);
    const [pending, setPending] = useState(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const { addComment } = useCommentActions()
    const { blogId } = useCommentState()

    const cancel = () => {
        setShowButtons(false)
        setDescription('')
    };

    const handleInput = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleAddComment = async () => {
        setPending(true)
        const result = await AddComment(blogId, description, parentId)
        setPending(false)
        if (result.data) addComment(result.data, parentId, to)
        setShowButtons(false)
        setDescription('')
    }

    const userInfo = useUser()

    const formRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            setShowButtons(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={formRef} className='flex gap-4 py-2 rounded-md'>
            <div className='size-10 relative'>
                <Image alt={`${userInfo?.name} ${userInfo?.surName}`} src={userInfo?.imageUrl ?? ''} fill className='object-cover rounded-full bg-[#00000005]' />
            </div>
            <div className='flex-1'>
                <div className="flex w-full gap-1 overflow-hidden focus:border-stone-500 border-b-2 pb-1">
                    {
                        to && showButtons && <label className="mb-1 text-[#1D4ED8]">
                            {to}:
                        </label>
                    }
                    <textarea
                        ref={textAreaRef}
                        placeholder={t("placeholder")}
                        className="resize-none outline-none flex-1"
                        onFocus={() => setShowButtons(true)}
                        maxLength={200}
                        rows={1}
                        onInput={handleInput}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {
                    showButtons &&
                    <div className='gap-2 justify-end mt-2 flex'>
                        <button disabled={pending} onClick={cancel} className='py-1.5 px-3 text-white rounded-md bg-stone-500 font-semibold'>{t('cancel')}</button>
                        <button disabled={pending} onClick={handleAddComment} className='py-1.5 px-3 text-white rounded-md bg-blue-700 font-semibold'>{t('send')}</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentForm