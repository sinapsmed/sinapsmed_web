import { Skeleton } from '@mui/material'
import React from 'react'

const UserAppointmentSkeleton = () => {
    return (
        <div className='rounded-xl border bg-white shadow p-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='relative sm:w-1/3 h-40 rounded-lg overflow-hidden bg-slate-100'>
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </div>
                <div className='flex flex-col justify-between sm:w-2/3 w-full space-y-2'>
                    <Skeleton variant="text" width="60%" height={28} />

                    <div className='flex gap-2'>
                        <Skeleton variant="text" width="15%" height={18} />
                        <Skeleton variant="text" width="45%" height={18} />
                    </div>

                    <div className='flex gap-2'>
                        <Skeleton variant="text" width="15%" height={18} />
                        <Skeleton variant="text" width="45%" height={18} />
                    </div>

                    <div className='flex gap-2'>
                        <Skeleton variant="text" width="20%" height={18} />
                        <Skeleton variant="text" width="60%" height={18} />
                    </div>

                    <div className='mt-4 flex justify-end'>
                        <Skeleton variant="rounded" width={65} height={36} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAppointmentSkeleton
