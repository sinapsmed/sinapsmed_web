import { FormControl, InputLabel, Select as MuiSelect } from '@mui/material'

import React, { ReactNode } from 'react'

interface Props {
    label?: string,
    value?: any
    onChange?: (value: any) => void,
    fullWitdh?: boolean
    disabled?: boolean,
    children?: ReactNode
}

const Select = ({ label, onChange, value, fullWitdh, disabled, children }: Props) => {
    return (
        <FormControl fullWidth={fullWitdh}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                value={value}
                label={label}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            >
                {children}
            </MuiSelect>
        </FormControl>
    )
}

export default Select