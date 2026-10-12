import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const AnalysisSkeleton = () => {
    return (
        <tr>
            <td className='space-y-2'>
                <Skeleton variant="rounded" className='w-2/3' height={15} />
                <Skeleton variant="rounded" className='w-1/3 md:hidden' height={15} />
            </td>
            <td className='hidden md:table-cell'>
                <Skeleton variant="rounded" className='w-1/3' height={15} />
            </td>
            <td>
                <div className='flex items-center h-[41px] gap-3'>
                    <Skeleton variant="rounded" className='w-[13%]' height={15} />
                    <Skeleton variant="rounded" className='w-[13%]' height={15} />
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center h-[41px]'>
                    <Skeleton variant="rounded" width={38} height={40} />
                </div>
            </td>
        </tr>
    )
}

export default AnalysisSkeleton