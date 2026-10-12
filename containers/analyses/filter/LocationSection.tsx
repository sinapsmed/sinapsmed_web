import LocationStepper from '@/components/analysis/steppers/LocationStepper'
import React from 'react'

const LocationSection = () => {
    return (
        <section id='analyses-filter-location' className='sectionBox'>
            <LocationStepper/>
        </section>
    )
}

export default LocationSection