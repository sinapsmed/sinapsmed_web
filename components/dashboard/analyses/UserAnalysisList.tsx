'use client'
import { Attachment, UserAnalysis } from '@/types/user'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import CopyBoard from '@/components/commons/CopyBoard'
import Modal from '@/components/commons/Modal'
import Container from '@/components/statics/dashboard/Container'
import { CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import UserAnalysisSkeleton from '@/components/skeletons/UserAnalysisSkeleton'
import Suspense from '@/components/commons/Suspense'
import { GetAttachments } from '@/actions/analysis'
import useFormatDate from '@/hooks/date'

interface Props {
    data: UserAnalysis[],
    pending: boolean
}

const UserAnalysisList = ({ data, pending }: Props) => {
    const [open, setOpen] = useState<string | null>(null)
    const t = useTranslations('dashboard.analysis')
    const formatDate = useFormatDate(true)
    const [attachments, setAttachments] = useState<Attachment[]>([])
    const [loading, setLoading] = useState(false)
    const showResults = async (id: string) => {
        setLoading(true)
        setOpen(id)
        const result = await GetAttachments(id)

        if (result.success) {
            setAttachments(result.data?.attachments ?? [])
        }
        setLoading(false)
    }
    return data.length === 0 ? <Container>
        <p className='text-center'>{t('notfound')}</p>
    </Container> : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <Suspense count={3} pending={pending} Component={UserAnalysisSkeleton}>
            {data.map((item) => {
                const formatted = formatDate(item.date)
                return (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-200 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">{item.name} ({item.code})</h2>
                            {
                                item.isVerificated ? <span
                                    className='px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'
                                >
                                    {t('verified')}
                                </span> :
                                    <span
                                        className='px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700'
                                    >
                                        {t('pending')}
                                    </span>
                            }
                        </div>
                        <div className="space-y-2 text-gray-600 flex-1">
                            <div className='flex gap-1 items-center'>
                                <span className="font-medium">{t('productCode')}:</span>
                                <span>{item.unikalKey}</span>
                                <CopyBoard text={item.unikalKey} />
                            </div>
                            <div className='flex gap-1'>
                                <span className='font-semibold'>{t('date')}:</span>
                                <div>{formatted}</div>
                       
                            </div>
                            <p>
                                <span className="font-medium">{t('price')}:</span>{" "}
                                <span className="text-blue-600 font-semibold">
                                    {item.price ? item.price.toFixed(2) : t('free')}
                                </span>
                            </p>
                            <div className='flex gap-1'>
                                <span className="font-medium">{t('patient')}:</span>{" "}
                                <p>
                                    {item.userName || '-'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 border-t pt-4">
                            <p className="font-medium text-gray-800">{t('clinic')}</p>
                            <p className="text-gray-600">{item.clinic.name} ({item.clinic.unicalKey})</p>
                            <Link
                                href={item.clinic.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {t('showOnMap')}
                            </Link>
                        </div>
                        <button
                            onClick={() => showResults(item.id)}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            {t('results')}
                        </button>
                        <Modal open={open === item.id} onClose={() => setOpen(null)}>
                            <h1 className='font-semibold text-lg text-center pb-1 text-black/80 rounded'>{t('attachments.label')}</h1>
                            <hr />
                            <div className={`my-2 min-h-[300px] max-h-[500px] overflow-y-auto ${loading || attachments.length === 0 ? 'flex items-center text-center justify-center' : ''}`}>
                                {
                                    loading ? <CircularProgress /> : attachments.length === 0 ? (
                                        <p className="text-gray-500">{t('attachments.empty')}</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {attachments.map((att, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                                >
                                                    <span className="text-gray-700 flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faPaperclip} className="text-indigo-500" />
                                                        {att.title}
                                                    </span>
                                                    <Link
                                                        href={att.attachment}
                                                        target='_blank' rel='noopener noreferrer'
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        {t('attachments.view')}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                            <button onClick={() => setOpen(null)} className='w-full bg-gray-500 p-2 rounded text-white'>
                                Bağla
                            </button>
                        </Modal>
                    </div>
                )
            })}
        </Suspense>
    </div>
}

export default UserAnalysisList