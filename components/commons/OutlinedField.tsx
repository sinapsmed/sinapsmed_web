'use client'
import { TextField, TextFieldProps } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

type Props = TextFieldProps & {
  pattern?: RegExp
}

const OutlinedField = ({ pattern, ...rest }: Props) => {
  const [value, setValue] = useState(rest.defaultValue ?? '')
  const validateValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (pattern) {
      const regex = RegExp(pattern)
      if (regex.test(newValue)) setValue(newValue)
    }
    else setValue(newValue)
  }

  return (
    <TextField
      value={value}
      onChange={validateValue}
      fullWidth
      size='small'
      variant='outlined'
      {...rest}
      defaultValue={undefined}
    />
  )
}

export default OutlinedField