import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const UserAnalysisSkeleton = () => {
    return (
        <div
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-200 flex flex-col"
        >
            <div className="flex justify-between items-center mb-4">
                <Skeleton variant='text' className='font-bold text-lg w-[180px]' />
                <Skeleton variant='rounded' className=' w-[50px]' />
            </div>
            <div className="space-y-2 flex-1">
                <Skeleton variant='text' className='w-[250px]' />
                <Skeleton variant='text' className='w-[250px]' />
                <Skeleton variant='text' className='w-[120px]' />
            </div>

            <div className="mt-4 border-t pt-4">
                <Skeleton variant='text' className='font-bold text-lg w-[80px]' />
                <Skeleton variant='text' className='w-[250px]' />
                <Skeleton variant='text' className='w-[120px]' />
            </div>
            <Skeleton variant='rounded' className='mt-4 h-[40px]' />
        </div>
    )
}

export default UserAnalysisSkeleton