import CityStepper from '@/components/analysis/steppers/CityStepper'
import { Place } from '@/types/analysis'
import { WithPage } from '@/types/pagination'
import React, { useState } from 'react'

interface Props{
  data: WithPage<Place>
}

const CitySection = ({data}: Props) => {
  return (
    <section id='analyses-filter-city' className='sectionBox'>
      <CityStepper data={data}/>
    </section>
  )
}

export default CitySection