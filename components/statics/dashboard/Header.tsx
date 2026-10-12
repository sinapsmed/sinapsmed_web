'use client'
import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { sidebarActions } from '@/redux/slices/sidebarSlice'
import ProfileDropdown from './ProfileDropdown'
import { dashboardRoutes } from '@/libs/routes'
import LangSelect from '../LangSelect'
import { useTranslations } from 'next-intl'
import { useSelectedLayoutSegments } from 'next/navigation'
import NotificationDropdown from '@/components/commons/NotificationDropdown'

const Header = () => {
    const dispatch = useDispatch()
    const openSidebar = () => {
        dispatch(
            sidebarActions.changeSidebar(true)
        )
    }
    const t = useTranslations('dashboard')
    const routeNames = t.raw('routes')
    const layouts = useSelectedLayoutSegments()
    const currentPage = useMemo(() => {
        if (!(layouts.length - 1)) return routeNames[0].title
        const index = dashboardRoutes.findIndex(route => route.href == layouts[1])
        if (index === -1) return null
        const { title, subRoutes } = routeNames[index];

        if (layouts.length === 2 || !subRoutes) return title
        return subRoutes[layouts.length - 3] ?? subRoutes.at(-1);
    }, [layouts, routeNames])
    return (
        <header className='relative py-3 px-5 text-white flex justify-between items-center border-b border-white/20'>
            <div className='flex gap-3'>
                <button onClick={openSidebar} className='md:hidden'>
                    <FontAwesomeIcon icon={faBars} size='xl' />
                </button>
                <h1 className='font-semibold text-xl'>{currentPage}</h1>
            </div>
            <div className='flex items-center gap-3'>
                <NotificationDropdown />
                <ProfileDropdown />
                <div className='hidden md:block'>
                    <LangSelect />
                </div>
            </div>
        </header>
    )
}

export default Header