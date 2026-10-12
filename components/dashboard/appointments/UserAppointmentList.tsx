'use client'
import { UserAppointment } from '@/types/user'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import LocaleLink from '@/components/commons/LocaleLink'
import { Link, usePathname } from '@/navigation'
import CopyBoard from '@/components/commons/CopyBoard'
import Suspense from '@/components/commons/Suspense'
import UserAppointmentSkeleton from '@/components/skeletons/UserAppointmentSkeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faKey, faLink, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import Container from '@/components/statics/dashboard/Container'
import useFormatDate from '../../../hooks/date'
import Modal from '@/components/commons/Modal'
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC'

interface Props {
    data: UserAppointment[],
    pending: boolean
}

const UserAppointmentList = ({ data, pending }: Props) => {
    const pathname = usePathname()
    const formatDate = useFormatDate()
    const t = useTranslations('dashboard.appointment')
    const [open, setOpen] = useState<string | null>(null)
    return (
        data.length === 0 ? (
            <Container>
                <p className='text-center text-lg text-gray-500'>{t('notfound')}</p>
            </Container>
        ) : (
            <div className='grid gap-2 xl:grid-cols-2'>
                <Suspense count={8} pending={pending} Component={UserAppointmentSkeleton}>
                    {data.map((appointment) => {
                        const { id, expertName, expertImageUrl, price, sessions, unikalKey } = appointment
                        const firstDate = formatDate(sessions[0].date)
                        const nextIndex = sessions.findIndex(s => new Date(s.date) >= new Date())

                        return (
                            <div key={id} className='rounded-xl border bg-white shadow hover:shadow-md transition p-4'>
                                <div className='flex flex-col sm:flex-row gap-4'>
                                    <div className='relative sm:w-1/3 h-40 rounded-lg overflow-hidden bg-slate-100'>
                                        <Image
                                            src={expertImageUrl}
                                            alt='expert'
                                            fill
                                            className='object-cover'
                                        />
                                    </div>

                                    <div className='flex flex-col justify-between sm:w-2/3'>
                                        <div>
                                            <h2 className='text-xl font-bold text-gray-800 truncate'>{expertName}</h2>
                                            <p className='text-sm text-gray-600 mt-1'>
                                                <FontAwesomeIcon icon={faMoneyBill} className='me-1' />
                                                {price ? <span>{price}₼</span> : <span className='italic'>{t('free')}</span>}
                                            </p>

                                            <div className='flex items-center text-sm text-gray-600 mt-1 gap-1 flex-wrap'>
                                                <FontAwesomeIcon icon={faKey} />
                                                <div className='flex items-center gap-1'>
                                                    <span className='truncate'>{unikalKey}</span>
                                                    <CopyBoard text={unikalKey} />
                                                </div>
                                            </div>

                                            <div className='flex items-center text-sm text-gray-600 mt-1 gap-1 flex-wrap'>
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                <div className='flex items-center gap-1'>
                                                    <span>{firstDate}</span>
                                                    
                                                    {
                                                        sessions.length > 1 && <button onClick={() => setOpen(id)} className="bg-gray-500 rounded px-1 text-white font-semibold">
                                                            +{sessions.length - 1} Seans
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Modal open={open === id} onClose={() => setOpen(null)}>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold">Bütün Seanslar</h3>
                                                <div className="grid gap-1">
                                                    {sessions.map((s, i) => {
                                                        const isNext = i === nextIndex
                                                        return (
                                                            <div
                                                                key={s.id}
                                                                className={
                                                                    `flex flex-col gap-3 rounded-md border p-3 ` +
                                                                    (isNext ? 'border-blue-500 bg-blue-50' : '')
                                                                }
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <FontAwesomeIcon icon={faCalendarAlt} className={isNext ? 'text-blue-600' : 'text-blue-500'} />
                                                                    <div>
                                                                        <p className="font-medium">
                                                                            {formatDate(s.date)}
                                                                            {isNext && (
                                                                                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                                                                    Gələn seans
                                                                                </span>
                                                                            )}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 break-all">{s.meetLink}</p>
                                                                    </div>
                                                                </div>
                                                                <Link href={s.meetLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white p-2 rounded self-end">
                                                                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                                                                    Qoşul
                                                                </Link>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <button onClick={() => setOpen(null)} className="w-full bg-gray-500 p-2 rounded text-white">
                                                    Bağla
                                                </button>
                                            </div>
                                        </Modal>
                                        <div className='mt-4 text-right'>
                                            <LocaleLink
                                                href={`${pathname}/${id}`}
                                                className='bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded-md text-sm font-medium'
                                            >
                                                {t('more')}
                                            </LocaleLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Suspense>
            </div>
        )
    )
}

export default UserAppointmentList
