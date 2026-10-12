'use client'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Props {
    label: string,
    onSearch: (value?: string) => void
    value?: string,
    size?: 'small' | 'medium',
    withChange?: boolean
    className?: string
    resetKey?: number
}

const SearchBar = ({ resetKey = 0, label, onSearch, value, size = 'medium', withChange = false, className = '' }: Props) => {
    const [search, setSearch] = useState(value)

    const handleChange = (value: string) => {
        if (withChange) {
            onSearch(value)
        }
        setSearch(value)
    }

    const save = () => {
        onSearch(search?.trimEnd())
        setSearch(search?.trimEnd())
    }

    useEffect(()=>{
        if(resetKey>0) setSearch('')
    },[resetKey])
    return (
        <FormControl size={size} variant="outlined" className={className}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                value={search}
                onChange={(e) => handleChange(e.target.value.trimStart())}
                endAdornment={
                    withChange ? undefined :
                        <InputAdornment position="end">
                            <button disabled={value === search} onClick={save} className='text-xl'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export default SearchBar