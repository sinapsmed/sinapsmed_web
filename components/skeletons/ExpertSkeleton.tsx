import { Skeleton } from '@mui/material'
import React from 'react'

const ExpertSkeleton = () => {
    return (
        <div className='bg-stone-100 h-[590px] md:h-[300px] flex flex-col md:flex-row px-[20px] py-[20px] justify-between'>
            <div className='w-full md:w-1/3 h-1/3 md:h-full flex items-center justify-center md:py-[5px] md:pe-[25px]'>
                <Skeleton variant='rectangular' className='size-[200px] md:size-[260px]' />
            </div>
            <div className='text-box w-full md:w-2/3 px-4'>
                <div className='space-y-3'>
                    <Skeleton variant='text' className='font-bold text-lg w-[180px] mx-auto md:mx-0' />
                    <Skeleton variant='text' className='font-semibold text-base w-[220px] mx-auto md:mx-0' />
                    <div className='flex flex-col md:flex-row items-center gap-x-20 gap-y-2'>
                        <Skeleton className='font-bold text-lg w-[60px]' />
                        <div className='md:w-1/2'>
                            <Skeleton variant='text' className='font-semibold text-base w-[270px]' />
                            <Skeleton variant='text' className='font-semibold text-base w-[270px]' />
                            <Skeleton variant='text' className='font-semibold text-base w-[270px]' />
                            <Skeleton variant='text' className='font-semibold text-base w-[270px]' />
                            <Skeleton variant='text' className='font-semibold text-base w-[220px]' />
                        </div>
                    </div>
                </div>
                <Skeleton
                    className='rounded-full mx-auto md:mx-0'
                    width={185}
                    height={75}
                />
            </div>
        </div>
    )
}

export default ExpertSkeleton