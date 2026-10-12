import React from 'react'
import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material'

interface Props {
    labels: string[]
    activeStep: number
    skips?: number[],
    orientation?: 'horizontal' | 'vertical'
}

const Stepper = ({ labels, activeStep, skips = [], orientation = 'horizontal' }: Props) => {
    return (
        <MuiStepper className='overflow-y-auto' orientation={orientation} activeStep={activeStep} alternativeLabel={orientation === 'horizontal'}>
            {
                labels.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    if (skips.includes(index)) {
                        stepProps.completed = false
                    }
                    return (
                        <Step
                            key={index}
                            {...stepProps}
                        >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })
            }
        </MuiStepper>
    )
}

export default Stepper