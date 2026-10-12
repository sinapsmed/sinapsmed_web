'use client'
import { GetUserCalendar } from '@/actions/user';
import EventCalendar, { DataEvent } from '@/components/commons/EventCalendar';
import Select from '@/components/commons/Select';
import Container from '@/components/statics/dashboard/Container';
import { faExpand, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MenuItem from '@mui/material/MenuItem';
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC';

interface Props {
    data: DataEvent[]
}

export interface Filter {
    date?: Date,
    status?: number,
    expert?: string,
    service?: string
}

const HomeSection = ({ data }: Props) => {

    const [filter, setFilter] = useState<Filter>({})
    const t = useTranslations('')
    const d = t.raw('dashboard.home')
    const statuses: string[] = t.raw('payment.statuses')
    const [open, setOpen] = useState(false)

    const handle = useFullScreenHandle();

    const [prewDate, setPrewDate] = useState(dayjs())
    const [events, setEvents] = useState(data)
    const [pending, setPending] = useState(false)
    const handleCalendar = async <K extends keyof Filter>(key: K, value: Filter[K]) => {
        
        const updatedFilter = { ...filter }
        updatedFilter[key] = value

        if (key === "date") {
            const newDate = value as Date;
            const currentDate = filter.date ?? new Date();

            const sameMonthAndYear =
                currentDate.getFullYear() === newDate.getFullYear() &&
                currentDate.getMonth() === newDate.getMonth();

            if (sameMonthAndYear) {
                setFilter(updatedFilter)
                setPrewDate(dayjs(value))
                return;
            }
        }
        setPending(true)
        const result = await GetUserCalendar(
            updatedFilter.date,
            updatedFilter.expert,
            updatedFilter.service,
            updatedFilter.status
        )
        if (result.success) {
            setEvents(prev => [...(result.data ?? prev)])
        }
        setPending(false)
        setFilter(updatedFilter)
    }
    return (
        <section id='dashboard-home' className='space-y-2'>
                    <InfoBadgeForUTC/>
            <Container className='divide-y'>
                <div className={`flex gap-2 justify-between items-center ${open && 'pb-2'}`}>
                    <h1 className='font-semibold text-lg'>{d['appointment']}</h1>
                    <div className='flex gap-2 items-center'>
                        <button onClick={() => setOpen(!open)} className='bg-blue-500 p-2 rounded text-sm text-white font-semibold flex gap-1 items-center leading-none'>
                            <FontAwesomeIcon icon={!open ? faPlus : faMinus} />
                            <span>{d['applyFilter']}</span>
                        </button>
                        <button onClick={handle.enter}>
                            <FontAwesomeIcon icon={faExpand} className='px-2 text-xl' />
                        </button>
                    </div>
                </div>
                <div className={`${!open && 'hidden'} pt-2 grid sm:grid-cols-2 xl:grid-cols-4 gap-3`}>
                    <Select value={filter.status} onChange={(value) => handleCalendar('status', value)} label={d.choose['status']}>
                        <MenuItem value={''}>{d.choose['all']}</MenuItem>
                        {
                            statuses.map((status, index) => (
                                <MenuItem key={index} value={index + 1}>{status} </MenuItem>
                            ))
                        }
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={prewDate}
                            onChange={(value) => setPrewDate(prev => value ?? prev)}
                            label="Tarix Seç"
                            onAccept={(value) => handleCalendar('date', value?.toDate())}
                            format="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </div>
            </Container>
            <FullScreen handle={handle}>
                <Container className='overflow-y-auto'>
                    <EventCalendar pending={pending} value={filter.date ?? new Date()} onChange={(value) => handleCalendar('date', value)} events={events} />
                </Container>
            </FullScreen>
        </section>
    )
}

export default HomeSection