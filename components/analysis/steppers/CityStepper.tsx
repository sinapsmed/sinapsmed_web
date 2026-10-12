'use client'
import { GetCities, GetClinics, GetRegions, GetVillages } from '@/actions/analysis'
import LocaleLink from '@/components/commons/LocaleLink'
import Stepper from '@/components/commons/Stepper'
import { Clinic, Place } from '@/types/analysis'
import { WithPage } from '@/types/pagination'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { MouseEvent, useMemo, useState } from 'react'
import ClinicList from '../ClinicList'
import { updateClinic } from '@/libs/clinic'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useTopLoader } from 'nextjs-toploader'

interface PlaceState {
  data: Place[]
  id?: string,
  pageCount: number,
  page: number,
  pending: boolean,
  label: string
}

interface StateType {
  city: PlaceState,
  region: PlaceState
  village: PlaceState,
}

interface Props {
  data: WithPage<Place>
}

const places = ['city', 'region', 'village'] as const

const CityStepper = ({ data }: Props) => {
  const t = useTranslations('analyses.filter')
  const common = useTranslations('common')
  const labels = [
    t('stepper.method'),
    t('stepper.city'),
    t('stepper.region'),
    t('stepper.village'),
    t('stepper.clinic'),
  ]
  const [step, setStep] = useState(0)
  const [skips, setSkips] = useState<number[]>([])

  const [state, setState] = useState<StateType>({
    city: {
      data: data.data,
      label: labels[1],
      page: 1,
      pageCount: data.pageCount,
      pending: false
    },
    region: {
      data: [],
      label: labels[2],
      page: 0,
      pageCount: 0,
      pending: false
    },
    village: {
      data: [],
      label: labels[3],
      page: 0,
      pageCount: 0,
      pending: false
    }
  })
  const currentState = useMemo(() => {
    return step < 3 ? state[places[step]] : null
  }, [state, step])
  const [clinicId, setClinicId] = useState<string | null>(null)
  const [clinics, setClinics] = useState<Clinic[]|null>(null)
  const [pending, setPending] = useState(false)
  const [pageCount, setPageCount] = useState<number | null>(null)
  const [page, setPage] = useState<number>(0)

  const getPlaces = async (type: typeof places[number]) => {

    setState(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        pending: true
      }
    }))
    let result;
    switch (type) {
      case 'city': result = await GetCities(state.city.page); break;
      case 'region': result = await GetRegions(state.region.page, state.city.id); break;
      default: result = await GetVillages(state.village.page, state.city.id, state.region.id);
    }
    setState(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        data: [...prev[type].data, ...(result.data?.data || [])],
        page: prev[type].page + 1,
        pageCount: result.data?.pageCount || 0,
        pending: false
      }
    }))
  }

  const clearPlace = (type: 'region' | 'village') => {
    setState(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        data: [],
        id: undefined,
        page: 0,
        pageCount: 0,
      }
    }))
  }

  const getClinics = async () => {
    setPending(true)
    const result = await GetClinics(page + 1, undefined, undefined, state.city.id, state.region.id, state.village.id)

    setPending(false)
    if (result.data) {
      setClinics((prev) => [...(prev??[]), ...(result.data?.data || [])])
      setPage(prev => prev + 1)
      return result.data.pageCount
    }
    return null
  }

  const prev = () => {
    if (skips.includes(step)) {
      const filtered = skips.filter((skip) => skip !== step)
      setSkips(filtered)
    }
    if (step === 1) clearPlace('region')
    else if (step === 2) clearPlace('village')
    else if (step === 3) {
      setPage(0)
      setPageCount(null)
      setClinics(null)
      setClinicId(null)
    }
    setStep(prev => prev - 1)
  }

  const next = async () => {
    setStep(prev => prev + 1)
    if (step === 0) await getPlaces('region')
    else if (step === 1) await getPlaces('village')
    else if (step === 2) {
      const pageCount = await getClinics()
      setPageCount(pageCount)
    }
  }

  const skip = () => {
    setSkips(prev => [...prev, step + 1])
    next()
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

  const setId = (id: string | null, type: typeof places[number]) => {
    setState(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        id: id
      }
    }))
  }

  return (
    <div className='space-y-2'>
      <Stepper skips={skips} activeStep={step + 1} labels={labels} />
      {
        step === 0 ? <PlaceSelect
          more={() => getPlaces(places[step])}
          state={state.city}
          setId={(id) => setId(id, 'city')}
        /> :
          step === 1 ? <PlaceSelect
            more={() => getPlaces(places[step])}
            state={state.region}
            setId={(id) => setId(id, 'region')}
          /> :
            step === 2 ? <PlaceSelect
              more={() => getPlaces(places[step])}
              state={state.village}
              setId={(id) => setId(id, 'village')}
            /> :
              step === 3 && <ClinicList data={clinics} clinicId={clinicId} setClinicId={setClinicId} />
      }
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
      <div className='flex gap-3 justify-between'>
        {
          step === 0 ?
            <LocaleLink href='/analyses/filter' className='text-lg font-semibold'>{t('stepper.prev')}</LocaleLink>
            : <button onClick={prev} className='text-lg font-semibold'>{t('stepper.prev')}</button>
        }
        <div className='flex gap-3'>
          {
            step > 0 && step < 3 && <button onClick={skip} className='py-1 px-3 text-lg bg-blue-600 text-white rounded font-semibold block'>{t('stepper.skip')}</button>
          }
          {
            step < 3 ?
              <button disabled={!currentState?.id} onClick={next} className='text-lg font-semibold'>{t('stepper.next')}</button>
              : <button disabled={!clinicId} onClick={finish} className='text-lg font-semibold'>{t('stepper.finish')}</button>
          }
        </div>
      </div>
    </div>
  )
}

interface SelectProps {
  state: PlaceState,
  setId: (id: string | null) => void
  more: () => Promise<void>
}

const PlaceSelect = ({ state, setId, more }: SelectProps) => {
  return (
    <div className='flex justify-center pt-6'>
      <FormControl className='w-full min-[400px]:w-[350px]'>
        <InputLabel>{state.label}</InputLabel>
        <Select
          value={state.id ?? ''}
          label={state.pending ? "Yüklənir..." : state.label}
          onChange={(e) => setId(e.target.value)}
          disabled={state.pending}
        >
          {
            state.data?.map((p, i) => (
              <MenuItem key={i} value={p.id}>{p.name}</MenuItem>
            ))
          }
          {
            state.pageCount !== state.page && state.pageCount > 0 && <MenuItem className='flex justify-center'>
              {
                state.pending ?
                  <CircularProgress size={20} className='m-2' /> :
                  <button
                    onClick={async (e) => {
                      e.stopPropagation()
                      await more()
                    }}
                    className='w-full p-2 font-semibold text-blue-500'>Daha Çox
                    </button>
              }
            </MenuItem>
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default CityStepper