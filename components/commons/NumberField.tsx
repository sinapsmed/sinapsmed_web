'use client'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import OutlinedField from './OutlinedField'
import { countryCodes } from '@/libs/phone'

interface Props {
  input?: {
    name?: string,
    value?: string
    onChange?: (value: string) => void
  },
  select?: {
    name?: string,
    value?: string,
    onChange?: (value: string) => void
  }
  endAdornment?: ReactNode
  label?: string,
  required?: boolean,
  disabled?: boolean
}

const NumberField = ({ label, required = false, input, select, endAdornment, disabled = false }: Props) => {
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(+value)) {
      input?.onChange?.(value)
    }
  }

  const handleCode = (e: ChangeEvent<HTMLSelectElement>) => {
    select?.onChange?.(e.target.value)
  }

  return (
    <OutlinedField
      disabled={disabled}
      required={required}
      size='medium'
      name={input?.name}
      label={label}
      value={input?.value}
      onChange={handlePhone}
      slotProps={{
        input: {
          endAdornment,
          startAdornment: (
            <select
              disabled={disabled}
              value={select?.value}
              onChange={handleCode}
              name={select?.name}
              className='p-1 me-2 outline-none'
            >
              {countryCodes.map((code, index) => (
                <option key={index} value={code}>{code}</option>
              ))}
            </select>
          )
        }
      }}
    />
  )
}


export default NumberField