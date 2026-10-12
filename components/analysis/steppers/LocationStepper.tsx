'use client'
import Stepper from '@/components/commons/Stepper'
import React, { useCallback, useState } from 'react'
import ClinicList from '../ClinicList'
import { Clinic } from '@/types/analysis'
import LocaleLink from '@/components/commons/LocaleLink'
import { GetClinics } from '@/actions/analysis'
import { CircularProgress } from '@mui/material'
import { useRouter } from '@/navigation'
import { updateClinic } from '@/libs/clinic'
import { Position } from '@/types/map'
import Map from '@/components/commons/Map'
import { useTranslations } from 'next-intl'
import { useTopLoader } from 'nextjs-toploader'

const LocationStepper = () => {
    const t = useTranslations('analyses.filter')
    const common = useTranslations('common')

    const labels = [
        t('stepper.method'),
        t('stepper.location'),
        t('stepper.clinic')
    ]

    const [step, setStep] = useState(1)
    const [position, setPosition] = useState<Position>({
        coords: [40.4093, 49.8671],
        place: 'Baku, Azerbaijan'
    });
    const [clinicId, setClinicId] = useState<string | null>(null)
    const [clinics, setClinics] = useState<Clinic[]|null>(null)
    const [pending, setPending] = useState(false)

    const [pageCount, setPageCount] = useState<number | null>(null)
    const [page, setPage] = useState<number>(0)

    const getClinics = async () => {
        setPending(true)
        const location = position.coords.join(', ')
        const result = await GetClinics(page + 1, location)
        setPending(false)
        if (result.data) {
            setClinics((prev) => [...(prev??[]), ...(result.data?.data || [])])
            setPage(prev => prev + 1)
            return result.data.pageCount
        }
        return null
    }

    const next = async () => {
        setStep(2)
        const pageCount = await getClinics()
        setPageCount(pageCount)
    }

    const prev = () => {
        setStep(1)
        setPage(0)
        setPageCount(null)
        setClinics(null)
        setClinicId(null)
    }

    const router = useRouter()
    const loader = useTopLoader()

    const finish = async () => {
        if (clinicId) {
            await updateClinic(clinicId)
            loader.start()
            router.push('/analyses')
        }
    }

    const handleChange = useCallback((value: Position) => {
        setPosition(value)
    }, [])
    return (
        <div className='space-y-2'>
            <Stepper activeStep={step} labels={labels} />
            {
                step === 1 ?
                    <div className='h-[400px] relative'>
                        <Map value={position} onChange={handleChange} />
                    </div>
                    : step === 2 &&
                    <div>
                        <ClinicList showDistance data={clinics} clinicId={clinicId} setClinicId={setClinicId} />
                        {
                            pending &&
                            <div className='flex justify-center py-3'>
                                <CircularProgress color='primary' />
                            </div>
                        }
                        {
                            pageCount === 0 && <p className='text-center pt-4 text-stone-700'>{t('notfound')}</p>
                        }
                        {
                            !!pageCount && pageCount !== page &&
                            <button
                                onClick={getClinics}
                                className='py-2 px-5 mt-2 bg-blue-600 text-white rounded font-semibold block mx-auto'
                            >
                                {common('more')}
                            </button>
                        }
                    </div>
            }
            <div className='flex justify-between'>
                {
                    step === 1 ?
                        <>
                            <LocaleLink href='/analyses/filter' className='text-lg font-semibold'>{t('stepper.prev')}</LocaleLink>
                            <button onClick={next} className='text-lg font-semibold'>{t('stepper.next')}</button>
                        </>
                        : step === 2 &&
                        <>
                            <button onClick={prev} className='text-lg font-semibold'>{t('stepper.prev')}</button>
                            <button onClick={finish} disabled={!clinicId} className='text-lg font-semibold'>{t('stepper.finish')}</button>
                        </>
                }

            </div>
        </div>
    )
}

export default LocationStepper