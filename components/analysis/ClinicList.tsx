import React, { Dispatch, SetStateAction } from 'react'
import { Clinic } from '@/types/analysis';
import { useTranslations } from 'next-intl';
import LocaleLink from '../commons/LocaleLink';

interface Props {
    data: Clinic[]|null,
    clinicId: string | null,
    setClinicId: Dispatch<SetStateAction<string | null>>
    showDistance?: boolean
}

const ClinicList = ({ data, clinicId, setClinicId, showDistance }: Props) => {
    const t = useTranslations('analyses.filter')
    return (
        !!data && (data.length > 0 ?
            <div className='grid gap-2 lg:grid-cols-2'>
                {
                    data.map((clinic) => {
                        const active = clinicId === clinic.id ? "text-blue-500 bg-white" : "text-white"
                        return (
                            <div key={clinic.id} className="clinic bg-blue-500 rounded py-2 px-3 flex items-center justify-between">
                                <div>
                                    <h1 className='text-lg sm:text-2xl font-semibold text-white'>{clinic.name}</h1>
                                    {showDistance && <p className='text-gray-200 italic'>{Math.round(clinic.distance * 100) / 100} km {t('far')}</p>}
                                </div>
                                <button
                                    className={`border border-white py-2 px-5 font-semibold rounded ${active} sm:text-lg`}
                                    onClick={() => setClinicId(prev => prev === clinic.id ? null : clinic.id)}
                                >
                                    {clinicId === clinic.id ? t('chosen') : t('choose')}
                                </button>
                            </div>
                        )
                    })
                }
            </div> :
            <div className='flex items-center justify-center text-center flex-col pt-5 space-y-2'>
                <h1 className='text-xl font-semibold'>{t('notfound')}</h1>
                <LocaleLink className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded font-semibold' href='/analyses/filter/location'>
                    {t('gotoLocation')}
                </LocaleLink>
            </div>)
    )
}

export default ClinicList