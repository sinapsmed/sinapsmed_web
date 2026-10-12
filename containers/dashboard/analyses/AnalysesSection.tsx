'use client'
import { useFetchContext } from '@/components/providers/FetchProvider'
import Container from '@/components/statics/dashboard/Container'
import { UserAnalysis } from '@/types/user'
import { WithPage } from '@/types/pagination'
import { Pagination } from '@mui/material'
import React from 'react'
import UserAnalysisList from '@/components/dashboard/analyses/UserAnalysisList'
import LocaleLink from '@/components/commons/LocaleLink'
import { useTranslations } from 'next-intl'
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC'

const AnalysesSection = () => {
    const [state, pending, queries, setQuery] = useFetchContext<WithPage<UserAnalysis>>()
    const t = useTranslations('')
    return (
        <section id='analyses-section' className='space-y-2'>

            {
            state.data.length >  0 &&    
            <InfoBadgeForUTC/>          
            }
            <Container>
                <LocaleLink href='/analyses' className='inline-block w-full sm:w-[250px] bg-blue-500 text-white text-center px-5 py-3 rounded-full font-semibold '>
                    {t.raw('dashboard.analysis.getAnalysis')}
                </LocaleLink>
            </Container>
            <UserAnalysisList pending={pending} data={state.data} />
            {
                state.data.length > 0 && <Container>
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

export default AnalysesSection