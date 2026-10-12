'use client'
import Stepper from '@/components/commons/Stepper'
import React, { Dispatch, SetStateAction, useState, useTransition } from 'react'
import ClinicList from '../ClinicList'
import { Clinic } from '@/types/analysis'
import LocaleLink from '@/components/commons/LocaleLink'
import { GetClinics } from '@/actions/analysis'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useRouter } from '@/navigation'
import { updateClinic } from '@/libs/clinic'
import { Partner } from '@/types/partner'
import { useTranslations } from 'next-intl'
import { useTopLoader } from 'nextjs-toploader'

interface Props {
    data: Partner[]
}

const ClinicStepper = ({ data }: Props) => {
    const t = useTranslations('analyses.filter')
    const common = useTranslations('common')

    const labels = [
        t('stepper.method'),
        t('stepper.partner'),
        t('stepper.clinic')
    ]
    const [step, setStep] = useState(1)
    const [state, setState] = useState(data)
    const [partnerId, setPartnerId] = useState<string | undefined>(undefined)
    const [clinicId, setClinicId] = useState<string | null>(null)
    const [clinics, setClinics] = useState<Clinic[]|null>(null)
    const [pending, setPending] = useState(false)

    const [pageCount, setPageCount] = useState<number | null>(null)
    const [page, setPage] = useState<number>(0)

    const getClinics = async () => {
        setPending(true)
        const result = await GetClinics(page + 1, undefined, partnerId)
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
    return (
        <div className='space-y-2'>
            <Stepper activeStep={step} labels={labels} />
            {
                step === 1 ?
                    <PartnerSelect partners={state} setId={setPartnerId} id={partnerId} />
                    : step === 2 &&
                    <div>
                        <ClinicList data={clinics} clinicId={clinicId} setClinicId={setClinicId} />
                        {
                            pageCount === 0 && <p className='text-center pt-4 text-stone-700'>{t('notfound')}</p>
                        }
                        {
                            pending &&
                            <div className='flex justify-center py-3'>
                                <CircularProgress color='primary' />
                            </div>
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
                            <button disabled={!partnerId} onClick={next} className='text-lg font-semibold'>{t('stepper.next')}</button>
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


interface SelectProps {
    partners: Partner[],
    id?: string
    setId: Dispatch<SetStateAction<string | undefined>>
}

const PartnerSelect = ({ partners, id, setId }: SelectProps) => {
    const t = useTranslations('analyses.filter.stepper')
    return (
        <div className='flex justify-center pt-6'>
            <FormControl className='w-full min-[400px]:w-[350px]'>
                <InputLabel>{t('partner')}</InputLabel>
                <Select
                    value={id ?? ''}
                    label={"Partnyor Seç"}
                    onChange={(e) => setId(e.target.value)}
                >
                    {
                        partners.map((p, i) => (
                            <MenuItem key={i} value={p.id}>{p.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default ClinicStepper