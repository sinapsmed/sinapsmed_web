'use client'
import SearchBar from '@/components/commons/SearchBar'
import ExpertList from '@/components/expert/ExpertList'
import { useFetchContext } from '@/components/providers/FetchProvider'
import { alwaysString } from '@/libs/string'
import { Expert } from '@/types/expert'
import { WithPage } from '@/types/pagination'
import { ServicePair } from '@/types/service'
import { FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
  services?: ServicePair[]
}

const ExpertsSection = ({ services }: Props) => {
  const [state, pending, queries, setQuery] = useFetchContext<WithPage<Expert>>()
  const t = useTranslations('expert')
  
  return (
    <section id='experts-section' className='sectionBox space-y-5'>
      <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <SearchBar value={alwaysString(queries.s)} label={t('filter.search')} onSearch={(value) => setQuery('s', value ?? '')} />
        <FormControl>
          <InputLabel>{t('filter.bySpec')}</InputLabel>
          <Select
            value={alwaysString(queries.spec)}
            label={t('filter.bySpec')}
            
            onChange={(e) => setQuery('spec', e.target.value)}
          >
            <MenuItem value={''}>{t('filter.all')}</MenuItem>
            {
              services?.map((service) => (
                <MenuItem key={service.id} value={service.id}>{service.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <div className='flex flex-center py-2.5 md:py-0 rounded-md'>
          {
            state.pageCount > 1 && <div className='flex justify-center'>
              <Pagination siblingCount={0} page={+alwaysString(queries.page)} onChange={(e, value) => setQuery('page', `${value}`)} count={state.pageCount} shape="rounded" />
            </div>
          }
        </div>
      </div>
      <ExpertList service={alwaysString(queries.spec)} pending={pending} data={state.data} />
      {
        state.pageCount > 1 && <div className='flex justify-center mt-5'>
          <Pagination page={+alwaysString(queries.page)} onChange={(e, value) => setQuery('page', `${value}`)} count={state.pageCount} shape="rounded" />
        </div>
      }
    </section>
  )
}

export default ExpertsSection