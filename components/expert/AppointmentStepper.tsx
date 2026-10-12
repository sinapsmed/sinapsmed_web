'use client'
import { Alert, CircularProgress, Paper, Snackbar, Tab, Tabs, TextField } from '@mui/material'
import React, { ChangeEvent, useMemo, useState } from 'react'
import Stepper from '../commons/Stepper';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faRotate, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../commons/SearchBar';
import { ExpertService, NewAppointment, PatientInfo, SubService } from '@/types/expert';
import { CreateAppointment, GetExpertWorkingHours } from '@/actions/expert';
import { AppointmentType } from '@/types/enum';
import { useRouter } from '@/navigation';
import { countryCodes, splitPhone } from '@/libs/phone';
import { useTranslations } from 'next-intl';
import { UserInfo } from '@/types/auth';
import { useSearchParams } from 'next/navigation';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSession } from '../providers/SessionProvider';
import { UpdateUser } from '@/actions/user';
import { useTopLoader } from 'nextjs-toploader';
import Calendar from '../commons/Calendar';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import useFormatDate from '@/hooks/date';
import InfoBadgeForUTC from "@/components/statics/InfoBadgeForUTC";

dayjs.extend(utc)
function filterServices(services?: ExpertService[], search?: string) {
    if (search && (services?.length ?? 0) > 0) {
        return services?.map((service) => {
            const filteredServices = service.subServices.filter((x) => x.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            return {
                ...service,
                subServices: filteredServices
            }
        })
    }
    return services
}

interface Info {
    adviseFor: number | null,
    user: PatientInfo,
    notes: string,
    infoApproved: boolean
    ageApproved: boolean
}

interface Appointment {
    service?: SubService
    dates: string[]
    info: Info
}

interface Props {
    expert?: string,
    services?: ExpertService[],
    workingDays: string[],
    userInfo: UserInfo
}

const AppointmentStepper = ({ expert, services, workingDays, userInfo }: Props) => {
    const t = useTranslations('expert.appointment.stepper')
    const labels = t.raw('labels')

    const [step, setStep] = useState(0)
    const [search, setSearch] = useState<string | undefined>('')
    const [appointment, setAppointment] = useState<Appointment>({
        info: {
            adviseFor: null,
            infoApproved: false,
            ageApproved: false,
            notes: '',
            user: {
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                birthDate: userInfo.dateOfBrith,
                gender: userInfo.gender,
                fullName: ''
            }
        },
        dates: []
    })

    const searchParams = useSearchParams()

    const chooseService = (value: SubService) => {
        setAppointment(prev => ({
            ...prev,
            service: value,
            dates: []
        }))
        setStep(1)
    }

    const toggleDate = (date: string) => {
        setAppointment(prev => {
            const dates = prev.dates.includes(date)
                ? prev.dates.filter(d => d !== date)
                : prev.dates.length < (prev.service?.sessionCount ?? Infinity)
                    ? [...prev.dates, date].sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())
                    : prev.dates;

            return { ...prev, dates };
        });
    };
    const clearDates = () => {
        setAppointment(prev => ({
            ...prev,
            dates: []
        }))
    }

    const updateInfo = <K extends keyof Info>(key: K, value: Info[K]) => {
        const updatedAppointment = { ...appointment }
        if (key === 'adviseFor') {
            if (value !== 1) {
                updatedAppointment.info.user = {
                    email: userInfo.email,
                    fullName: '',
                    phoneNumber: updatedAppointment.info.user.phoneNumber
                }
            }
            else {
                updatedAppointment.info.user = {
                    email: userInfo.email,
                    birthDate: userInfo.dateOfBrith,
                    gender: userInfo.gender,
                    fullName: updatedAppointment.info.user.fullName || `${userInfo.name} ${userInfo.surName}`,
                    phoneNumber: updatedAppointment.info.user.phoneNumber
                }
            }
        }
        setAppointment({
            ...updatedAppointment,
            info: {
                ...updatedAppointment.info,
                [key]: value
            }
        })
    };
    const router = useRouter()
    const loader = useTopLoader()

    const disabled = useMemo(() => {
        const service = !appointment.service
        const time = appointment.dates.length !== appointment.service?.sessionCount
        let info = appointment.info.adviseFor && appointment.info.infoApproved && appointment.info.ageApproved &&
            !!splitPhone(appointment.info.user.phoneNumber)[1] &&
            !!appointment.info.user.fullName &&
            !!appointment.info.user.email &&
            appointment.info.user.gender !== undefined &&
            !!appointment.info.user.birthDate
        info = !info

        return [service, time, info]
    }, [appointment])

    const session = useSession()
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const finish = async () => {
        setError(null)
        setPending(true)
        const expertId = searchParams.get('id')
        let newAppointment: NewAppointment = {
            appointmentType: appointment.info.adviseFor ?? 1,
            dates: appointment.dates,
            expertId: expertId ?? '',
            servicePeriodId: appointment.service?.id ?? '',
            userWhatsApp: appointment.info.user.phoneNumber,
            userId: session?.user.userId,
            userNote: appointment.info.notes,
        }

        let result;
        if (AppointmentType.MySelf !== newAppointment.appointmentType) {
            newAppointment = {
                ...newAppointment,
                additionalUser: {
                    dateOfBrith: appointment.info.user.birthDate ?? '',
                    fullName: appointment.info.user.fullName,
                    gender: appointment.info.user.gender ?? true
                }
            }
            result = await CreateAppointment(newAppointment)
        }
        else {
            const [
                _,
                appointmentResult
            ] = await Promise.all([
                UpdateUser({
                    ...userInfo,
                    dateOfBrith: appointment.info.user.birthDate,
                }),
                CreateAppointment(newAppointment)
            ])
            result = appointmentResult
        }
        if (result.success) {
            loader.start()
            router.push('/cart')
            return
        }
        else setError(result.message ?? null)
        setPending(false)
    }

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleStep = () => {
        if (disabled[step]) {
            setOpenSnackbar(true)
        }
        else setStep(prev => prev + 1)
    }
    return (
        <Paper className='md:p-3 flex gap-2 flex-col md:flex-row'>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="warning"
                    sx={{ width: '100%' }}
                >
                    {t('fillAll')}
                </Alert>
            </Snackbar>
            <div className='bg-blue-500 px-6 lg:px-0 py-4 w-full md:w-fit lg:w-[300px] rounded primary-stepper justify-center items-center flex'>
                <Stepper labels={labels} activeStep={step} orientation={'vertical'} />
            </div>
            <div className='md:flex-1 py-3 px-4 md:border-2 rounded flex flex-col min-h-[480px] max-h-[100vh] gap-3'>
                <InfoBadgeForUTC/>
                <div className='headline flex flex-col sm:flex-row gap-2 sm:justify-between border-b-2 pb-2 items-center'>
                    <h1 className='text-xl font-semibold'>{labels[step]}</h1>
                    {
                        step === 0 && <SearchBar withChange value={search} size='small' label={t('search')} onSearch={(value) => setSearch(value)} />
                    }
                </div>
                <div className='content flex-1 overflow-y-auto'>
                    {
                        (services?.every(s => s.subServices.length === 0) || !services) ? <MissingStep /> :
                            step === 0 ? <ServiceStep onChoose={(id) => chooseService(id)} chosenService={appointment.service} services={filterServices(services, search)} /> :
                                step === 1 ? <TimeStep clearDates={clearDates} toggleDate={toggleDate} sessionCount={appointment.service?.sessionCount} dates={appointment.dates} workingDays={workingDays} /> :
                                    step === 2 ? <InfoStep info={appointment.info} updateInfo={updateInfo} /> :
                                        <FinishStep
                                            user={`${userInfo.name} ${userInfo.surName} (${userInfo.unicalKey})`}
                                            error={error}
                                            userInfo={appointment.info.user}
                                            expert={expert}
                                            appointment={appointment} />
                    }
                </div>
                <div className='flex justify-between'>
                    <button
                        className='text-lg font-semibold'
                        onClick={() => step === 0 ? router.back() : setStep(prev => prev - 1)}
                    >
                        {t('prev')}
                    </button>
                    {
                        step < 3 ?
                            <button
                                className='text-lg font-semibold'
                                disabled={pending}
                                onClick={handleStep}
                            >
                                {t('next')}
                            </button> :
                            <button disabled={pending} onClick={finish} className='text-lg font-semibold'>{t('finish')}</button>
                    }
                </div>
            </div>
        </Paper>
    )
}

const MissingStep = () => {
    const router = useRouter()
    const t = useTranslations('expert.appointment.missing')

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-white  p-8 max-w-md text-center space-y-5">
                <div className="flex justify-center">
                    <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-2xl" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {t('title')}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {t('desc')}{' '}
                    <a href="/contact" className="text-blue-600 hover:underline font-medium">
                        {t('contact')}
                    </a>
                    .
                </p>
                <button
                    onClick={() => router.push('/experts')}
                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {t('back')}
                </button>
            </div>
        </div>
    )
}

interface ServiceProps {
    services?: ExpertService[]
    chosenService?: SubService,
    onChoose: (service: SubService) => void
}

const ServiceStep = ({ services, chosenService, onChoose }: ServiceProps) => {
    const t = useTranslations('expert.appointment.service')
    return (
        <div className='services overflow-x-hidden overflow-y-auto primary-scroll pe-2 space-y-2'>
            {
                services?.map((service) => (
                    service.subServices.length > 0 && <div key={service.serviceId} className='service space-y-2'>
                        <h1 className='text-red-400'>{service.serviceName}</h1>
                        <div className='items grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                            {
                                service.subServices.map((subService, index) => {
                                    const { id, duration, logoUrl, price, title } = subService
                                    const active = id === chosenService?.id
                                    return (
                                        <div onClick={() => onChoose(subService)} key={index} className={`item ${active && 'active'} border px-1.5 py-4 rounded-md flex flex-col items-center relative text-center`}>
                                            {
                                                active && <FontAwesomeIcon icon={faCircleCheck} className='text-blue-700 border-2 border-white absolute -top-2 -right-2 text-lg bg-white' />
                                            }
                                            <span className='absolute top-0 left-6 text-white bg-blue-500 p-1.5 z-10 text-xs rounded-b-full'>
                                                <FontAwesomeIcon icon={faVideo} />
                                            </span>
                                            <div className='relative size-16 mb-3'>
                                                <Image src={logoUrl} alt={title} fill className='object-cover rounded-full' />
                                            </div>
                                            <h1 className='text-sm font-semibold'>{title}</h1>
                                            <p className='text-sm text-neutral-700'>{t('price')}: {price}₼</p>
                                            <p className='text-sm text-neutral-700'>{t('duration')}: {duration} dəq</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

interface TimeProps {
    workingDays: string[],
    dates: string[],
    toggleDate: (date: string) => void
    sessionCount?: number,
    clearDates: () => void
}

const TimeStep = ({ workingDays, dates, sessionCount = 0, toggleDate, clearDates }: TimeProps) => {
    const t = useTranslations('expert.appointment')
    const formatDate = useFormatDate()
    const d = t.raw('stepper')
    const [hours, setHours] = useState<string[] | null>(null)
    const [currentDate, setCurrentDate] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const [pending, setPending] = useState(false)
    const availableSet = new Set(workingDays);
    const getHoursFromDay = async (date: string) => {
        setCurrentDate(date)
        const hasDay = availableSet.has(date)
        if (!hasDay) {
            setHours([])
            return
        }

        setPending(true)
        const id = searchParams.get('id')
        if (id) {
            const result = await GetExpertWorkingHours(date, id)
            setHours(result.data ?? [])
        }
        setPending(false)
    }

    const chooseHour = (hour: string) => {
        const date = `${currentDate}T${hour}:00.000Z`
        toggleDate(date)
    }

    const { activeDates, activeDateTimes } = dates.reduce(
        (acc, x) => {
            const d = dayjs(x).utc();
            acc.activeDates.add(d.format("YYYY-MM-DD"));
            acc.activeDateTimes.add(x);
            return acc;
        },
        { activeDates: new Set<string>(), activeDateTimes: new Set<string>() }
    );

    const [more, setMore] = useState(false)
    return (
        <div className='time-container h-full'>
            <div className='calendar bg-blue-50 rounded'>
                <Calendar
                    value={currentDate}
                    availableSet={availableSet}
                    onChange={(date) => getHoursFromDay(date)}
                    activeDates={activeDates}
                />
            </div>
            <div className='sessions bg-blue-50 rounded p-3'>
                <div className='flex justify-between gap-2 items-center mb-3'>
                    <h3 className="text-lg font-semibold">Seanslar</h3>
                    <button onClick={clearDates} disabled={dates.length === 0} className='text-lg text-blue-700'>
                        <FontAwesomeIcon icon={faRotate} />
                    </button>
                </div>
                <div className="space-y-1.5 xl:overflow-y-auto xl:max-h-[100px]">
                    {Array.from({ length: more ? sessionCount : Math.min(2, sessionCount) }, (_, i) => {
                        const date = dates.at(i)
                        return (
                            <div
                                key={i}
                                className={`text-xs sm:text-sm rounded-md ps-2 bg-white text-gray-800 ${date ? 'sm:py-1 py-0.5' : 'py-2.5 pe-2'} flex items-center justify-between`}
                            >
                                <span className="font-semibold">{sessionCount === 1 ? 'Tək' : `${i + 1}.`} {d["session"]}</span>
                                <span className={`${date ? '' : 'opacity-60'} flex-1 text-right`}>{date ? formatDate(date) : d["unassigned"]}</span>
                                
                                {
                                    date && <button onClick={() => toggleDate(date)} className='py-1 px-3 text-red-600 text-base rounded '>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                }
                            </div>
                        )
                    })}
                </div>
                {
                    sessionCount > 2 && <button onClick={() => setMore(!more)} className='mt-2 px-2 bg-gray-500 text-white rounded'>
                        {more ? d["less"] : d["more"]}
                    </button>
                }
            </div>
            <div className='tabs bg-blue-50 rounded p-3 space-y-2'>
                <h3 className="text-lg font-semibold text-center">{d["organizationInfo"]}</h3>
                <Tabs value={0} variant='scrollable' scrollButtons="auto" allowScrollButtonsMobile>
                    <Tab label={d["paid"]} className='bg-white me-2 normal-case' />
                </Tabs>
            </div>
            <div className='hours bg-blue-50 p-2 rounded space-y-2 relative min-h-[215px]'>
                <h1 className='text-center font-semibold text-lg'>{t('date.interval')}</h1>
                {
                    !pending ? (!hours ?
                        <div className='text-neutral-700 absolute-center'>
                            <p className='text-center'>{t('date.choose')}</p>
                        </div> : hours.length === 0 ? <div className='text-neutral-700 absolute-center'>
                            <p className='text-center'>{t('date.empty')}</p>
                        </div> :
                            <div className='grid gap-2 xl:overflow-y-auto xl:max-h-[200px] [grid-template-columns:repeat(auto-fit,minmax(70px,1fr))]'>
                                {
                                    hours.map((hour, index) => {
                                        const active = activeDateTimes.has(`${currentDate}T${hour}:00.000Z`)
                                        const limited = dates.length === sessionCount && !active
                                        return (
                                            <button key={index} onClick={() => chooseHour(hour)} className={`py-2 ${active ? 'text-white bg-blue-500' : 'text-neutral-700 bg-white'} ${limited ? 'opacity-75 cursor-not-allowed' : ''} rounded`}>
                                                {hour}
                                            </button>
                                        )
                                    })
                                }
                            </div>) : <div className='absolute-center'>
                        <CircularProgress color="primary" />
                    </div>
                }
            </div>
        </div>
    )
}

interface InfoProps {
    updateInfo: <K extends keyof Info>(key: K, value: Info[K]) => void
    info: Info
}

const InfoStep = ({ updateInfo, info }: InfoProps) => {
    const t = useTranslations('expert.appointment.info')
    const genders = t.raw('genders')
    const options: string[] = t.raw('advise.options')
    const splittedPhone = useMemo(() => {
        const phoneNumber = info.user.phoneNumber
        return splitPhone(phoneNumber)
    }, [info])
    const [code, setCode] = useState(splittedPhone[0])
    const [phone, setPhone] = useState(splittedPhone[1])

    const handleUserInfo = <K extends keyof PatientInfo>(key: K, value: PatientInfo[K]) => {
        updateInfo('user', {
            ...info.user,
            [key]: value
        })
    }

    const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const regex = new RegExp('[0-9]*')
        if (regex.test(value)) {
            setPhone(value)
            handleUserInfo('phoneNumber', `${code} ${e.target.value}`)
        }
    }
    return (
        <div className='space-y-3 pt-2'>
            <div className='flex flex-col xl:flex-row gap-y-3 gap-x-10 xl:items-center'>
                <div className='space-y-1'>
                    <p className='font-semibold'>{t('advise.title')}</p>
                    <div className='flex gap-3 flex-wrap'>
                        {
                            options.map((option, index) => (
                                <div key={index} className='flex gap-1'>
                                    <input checked={info.adviseFor === index + 1} onChange={(e) => updateInfo('adviseFor', index + 1)} type="radio" name="adviseFor" id={AppointmentType[index + 1]} />
                                    <label htmlFor={AppointmentType[index + 1]} className='text-sm text-neutral-700'>{option} {t('advise.for')}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <TextField
                    slotProps={{
                        input: {
                            startAdornment: <select value={code} onChange={(e) => setCode(e.target.value)} className='p-1 outline-none'>
                                {
                                    countryCodes.map((code, index) => (
                                        <option key={index} value={code}>{code}</option>
                                    ))
                                }
                            </select>,

                        },
                    }}
                    value={phone}
                    className='flex-1 w-full xl:w-fit'
                    label={t('user.phone')}
                    variant="outlined"
                    onChange={handlePhone}
                />
            </div>
            <div className='flex flex-col xl:flex-row gap-3 xl:items-center'>
                <TextField
                    label={t('user.fullname')}
                    variant="outlined"
                    value={info.user.fullName}
                    onChange={(e) => handleUserInfo('fullName', e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={t('user.birthDate')}
                        value={info.user.birthDate ? new Date(info.user.birthDate) : undefined}
                        onChange={(newDate) => handleUserInfo('birthDate', newDate?.toISOString())}
                        format='dd/MM/yyyy'
                        maxDate={new Date()}
                    />
                </LocalizationProvider>
                <div className='space-y-1'>
                    <p className='font-semibold'>{t('user.gender')} *</p>
                    <div className='flex gap-3 flex-wrap'>
                        <div className='flex gap-1'>
                            <input checked={info.user.gender === true} onChange={(e) => handleUserInfo('gender', true)} type="radio" name="gender" id={"male"} />
                            <label htmlFor={"male"} className='text-sm text-neutral-700'>{genders[0]}</label>
                        </div>
                        <div className='flex gap-1'>
                            <input checked={info.user.gender === false} onChange={(e) => handleUserInfo('gender', false)} type="radio" name="gender" id={"female"} />
                            <label htmlFor={"female"} className='text-sm text-neutral-700'>{genders[1]}</label>
                        </div>
                    </div>
                </div>
            </div>
            <TextField
                label={t('note')}
                variant="outlined"
                multiline
                minRows={2}
                fullWidth
                value={info.notes}
                onChange={(e) => updateInfo('notes', e.target.value)}
            />
            <div className='space-y-1'>
                <p className='font-semibold'>{t('age.title')}</p>
                <div className='flex gap-1 items-center'>
                    <input
                        checked={info.ageApproved}
                        onChange={(e) => updateInfo('ageApproved', e.target.checked)}
                        type="checkbox" id="adult"
                    />
                    <label htmlFor="age" className='text-sm text-neutral-700'>{t('age.verify')}</label>
                </div>
            </div>
            <div className='space-y-1'>
                <p className='font-semibold'>{t('info.title')}</p>
                <div className='flex gap-1 items-center'>
                    <input checked={info.infoApproved} onChange={(e) => updateInfo('infoApproved', e.target.checked)} type="checkbox" id="adult" />
                    <label htmlFor="info" className='text-sm text-neutral-700'>{t('info.verify')}</label>
                </div>
            </div>
        </div>
    )
}

interface FinishProps {
    appointment: Appointment,
    expert?: string,
    userInfo: PatientInfo,
    error: string | null,
    user: string
}

const FinishStep = ({ appointment, expert, userInfo, error, user }: FinishProps) => {
    const t = useTranslations('expert.appointment')
    const formatDate = useFormatDate()
    const genders = t.raw('info.genders')
    const labels = t.raw('stepper.labels')
    const options = t.raw('info.advise.options')

    const isSingle = appointment.service?.sessionCount === 1
    const { info, service, dates } = appointment

    const birthDate = userInfo.birthDate?.split('T')[0]
    return (
        <div className='grid lg:grid-cols-2 gap-3 pe-2'>
            <div className='space-y-2'>
                <div className='space-y-1 flex flex-col'>
                    <h1 className='uppercase text-red-400 font-semibold'>{t('last.clinic')}</h1>
                    <div className='rounded bg-blue-50 p-4 text-sm space-y-1 flex-1'>
                        <h1 className='font-semibold'>Sinapsmed</h1>
                        <p className='text-neutral-700'>Bakı, AZ1021, Baku, Azerbaycan</p>
                    </div>
                </div>
                <div className='space-y-1 flex flex-col'>
                    <h1 className='uppercase text-red-400 font-semibold'>{t('last.patient.title')}</h1>
                    <div className='rounded bg-blue-50 p-4 text-sm space-y-1'>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-x-3'>{t('last.patient.name')} <span className='text-neutral-700 font-normal sm:text-right'>{userInfo.fullName}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-x-3'>{t('last.patient.birthDate')}
                            <span className='text-neutral-700 font-normal sm:text-right'>
                                {birthDate?formatDate(birthDate):'-'}
                            </span>
                        </h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-x-3'>{t('last.patient.gender')} <span className='text-neutral-700 font-normal sm:text-right'>{genders[userInfo.gender ? 0 : 1]}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-x-3'>{t('last.patient.phone')} <span className='text-neutral-700 font-normal sm:text-right'>{userInfo.phoneNumber}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-x-3'>{t('last.patient.email')} <span className='text-neutral-700 font-normal sm:text-right'>{userInfo.email}</span></h1>
                    </div>
                </div>
                <div className='space-y-1 flex flex-col'>
                    <h1 className='uppercase text-red-400 font-semibold'>{labels[2]}</h1>
                    <div className='rounded bg-blue-50 p-4 text-sm space-y-1 flex-1'>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.user.title')} <span className='text-neutral-700 font-normal sm:text-right'>{user}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.advise.title')} <span className='text-neutral-700 font-normal sm:text-right'>{options[(info.adviseFor ?? 1) - 1]} {t('info.advise.for')}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.user.phone')} <span className='text-neutral-700 font-normal sm:text-right'>{info.user.phoneNumber}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.age.title')} <span className='text-neutral-700 font-normal sm:text-right'>{t('info.age.verify')}</span></h1>
                        <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.info.title')} <span className='text-neutral-700 font-normal sm:text-right'>{t('info.info.verify')}</span></h1>
                        {
                            info.notes.length > 0 && <h1 className='font-semibold flex flex-col sm:justify-between gap-3'>{t('info.note')} <span className='text-neutral-700 font-normal sm:text-right'>{info.notes}</span></h1>
                        }
                    </div>
                </div>
            </div>
            <div className='space-y-1 flex flex-col'>
                <h1 className='uppercase text-red-400 font-semibold'>{t('last.randevu.title')}</h1>
                <div className='border p-4 text-sm space-y-2'>
                    <div className='flex gap-3 justify-between'>
                        <p className='text-neutral-700'>{t('last.randevu.expert')}</p>
                        <h1 className='font-semibold'>{expert}</h1>
                    </div>
                    <div className={`flex gap-1 ${isSingle ? 'flex-row justify-between' : 'flex-col'}`}>
                        <p className='text-neutral-700'>{t('last.randevu.date')}</p>
                        <ul className="space-y-1">
                            {dates.map((date, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="flex items-center justify-between"
                                    >
                                        {
                                            !isSingle && <span className="font-medium text-gray-800">{i + 1}. Seans</span>
                                        }
                                        <span className="font-semibold">{formatDate(date)}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='rounded bg-blue-50 p-4 text-sm space-y-1 flex-1'>
                        <h1 className='font-semibold'>{t('last.randevu.services')}</h1>
                        <div className='flex gap-3 justify-between'>
                            <p className='text-neutral-700'>{service?.title}</p>
                            <h1 className='font-semibold'>{service?.price}₼</h1>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-between text-lg'>
                        <h1 className='font-semibold'>{t('last.randevu.totalPrice')}</h1>
                        <p className='text-blue-700'>{service?.price}₼</p>
                    </div>
                    {
                        error && <p className='text-red-600'>{error}</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default AppointmentStepper