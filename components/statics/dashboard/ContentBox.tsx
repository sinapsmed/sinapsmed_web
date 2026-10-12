'use client'
import React, { ReactNode } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarActions } from '@/redux/slices/sidebarSlice'
import { RootState } from '@/redux/store'
import { Notification } from '@/types/notifications'

interface Props {
    children?: ReactNode,
}

const ContentBox = ({ children }: Props) => {
    const currentYear = new Date().getFullYear()
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state: RootState) => state.sidebar.sidebarShow)

    const closeSidebar = () => {
        dispatch(
            sidebarActions.changeSidebar(false)
        )
    }
    return (
        <div className="content w-full md:w-[calc(100%-250px)] ms-auto bg-neutral-200 min-h-screen relative flex flex-col">
            <div className='bg-blue-500 absolute top-0 left-0 right-0 h-[120px]' />
            <Header />
            <div className='content-box relative py-4 px-5 flex-1'>
                {children}
            </div>
            <div className={`bg-black/50 absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-300 md:z-[-1] md:opacity-0 ${sidebarShow ? "z-[1] opacity-100" : "z-[-1] opacity-0"}`} onClick={closeSidebar} />
            <p className='p-3 text-center bg-white/70'>© {currentYear} Sinapsmed MMC</p>
        </div>
    )
}

export default ContentBox