import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const BlogSkeleton = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rounded" height={180}/>
            <Stack height={180} spacing={2} paddingTop={'10px'}>
                <Skeleton variant="rounded" height={22} width={'80%'} />
                <Stack height={65} spacing={1}>
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                    <Skeleton variant="rounded" />
                </Stack>
                <Skeleton variant="rounded" width={'80px'} height={'40px'}/>
            </Stack>
        </Stack>
    )
}

export default BlogSkeleton