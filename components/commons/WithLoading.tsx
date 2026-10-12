import { CircularProgress, Stack } from '@mui/material'
import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode,
    pending: boolean
}

const WithLoading = ({ children, pending }: Props) => {
    if (pending) {
        return (
            <Stack alignItems='center' style={{color: '#29d', padding:'70px 0'}}>
                <CircularProgress color="inherit" className="" />
            </Stack>
        )
    }
    else return (
        <>
            {children}
        </>
    )
}

export default WithLoading