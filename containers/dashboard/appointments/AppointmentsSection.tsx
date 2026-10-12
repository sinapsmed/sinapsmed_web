'use client'
import { useFetchContext } from '@/components/providers/FetchProvider'
import Container from '@/components/statics/dashboard/Container'
import { UserAppointment } from '@/types/user'
import { WithPage } from '@/types/pagination'
import { MenuItem, Pagination } from '@mui/material'
import React from 'react'
import UserAppointmentList from '@/components/dashboard/appointments/UserAppointmentList'
import Select from '@/components/commons/Select'
import { useTranslations } from 'next-intl'
import LocaleLink from '@/components/commons/LocaleLink'
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC'

const AppointmentsSection = () => {
    const [state, pending, queries, setQuery] = useFetchContext<WithPage<UserAppointment>>()
    const t = useTranslations('')
    const d = t.raw('dashboard.home.choose')
    const statuses: string[] = t.raw('payment.statuses')

    return (
        <section id='appointments-section' className='space-y-2'>
            <InfoBadgeForUTC />
            <Container className='sm:flex-row flex flex-col  items-center justify-between gap-4'>
                <LocaleLink href='/experts' className='inline-block w-full sm:w-[250px] bg-blue-500 text-white text-center px-5 py-3 rounded-full font-semibold '>
                    {t.raw('dashboard.appointment.button')}  
                </LocaleLink>
                <Select fullWitdh value={queries.status} onChange={(value) => setQuery('status', value)} label={d['status']}>
                    <MenuItem value={''}>{d['all']}</MenuItem>
                    {
                        statuses.map((status, index) => (
                            <MenuItem key={index} value={index+1}>{status}</MenuItem>
                        ))
                    }
                </Select>
            </Container>
            <UserAppointmentList pending={pending} data={state.data} />
            {
                state.data.length > 0 &&
                <Container>
                    {
                        state.pageCount > 0 && <div className='flex justify-center'>
                            <Pagination page={+queries.page} onChange={(e, value) => setQuery('page', `${value}`)} count={state.pageCount} shape="rounded" />
                        </div>
                    }
                </Container>
            }
        </section>
    )
}

export default AppointmentsSection