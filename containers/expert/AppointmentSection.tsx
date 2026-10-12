import AppointmentStepper from '@/components/expert/AppointmentStepper'
import { UserInfo } from '@/types/auth'
import { ExpertServiceList } from '@/types/expert'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props{
  expertServiceList?: ExpertServiceList,
  workingDays: string[],
  userInfo: UserInfo
}

const AppointmentSection = ({workingDays, expertServiceList, userInfo}: Props) => {
  const expert = expertServiceList?.expert
  const expertServices = expertServiceList?.expertServices
  const t =  useTranslations('expert.appointment')

  return (
    <section id='appointment-section' className='sectionBox space-y-4'>
      <h1 className='text-center font-semibold text-3xl'>{t('getWith', {fullname: expert})}</h1>
      <AppointmentStepper userInfo={userInfo} workingDays={workingDays} expert={expert} services={expertServices}/>
    </section>
  )
}

export default AppointmentSection