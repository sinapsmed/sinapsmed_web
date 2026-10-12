import React from 'react'
import ClinicStepper from '@/components/analysis/steppers/ClinicStepper';
import { Partner } from '@/types/partner';

interface Props {
  data: Partner[]
}

const ClinicSection = ({ data }: Props) => {
  return (
    <section id='analyses-filter-clinic' className='sectionBox space-y-3'>
      <ClinicStepper data={data}/>
    </section>
  )
}

export default ClinicSection