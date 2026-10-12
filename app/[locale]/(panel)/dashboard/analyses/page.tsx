import { GetUserAnalyses } from '@/actions/user'
import FetchProvider from '@/components/providers/FetchProvider'
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC'
import AnalysesSection from '@/containers/dashboard/analyses/AnalysesSection'
import { SearchParams } from '@/types/query'
import React from 'react'

interface Props {
    searchParams: SearchParams
}

export default async function AnalysesPage({ searchParams }: Props) {
  const getAnalyses = await GetUserAnalyses(searchParams)

  return (
    <main>
    
      {getAnalyses.data &&
        <FetchProvider
          action={GetUserAnalyses}
          initialData={getAnalyses.data}
          searchParams={{
            page: (searchParams.page ?? '1') as string,
          }}>
          <AnalysesSection/>
        </FetchProvider>
      }
    </main>
  )
}
