'use client'
import LocaleLink from '@/components/commons/LocaleLink'
import Image from 'next/image'
import React from 'react'
import Logo from '@/public/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSuitcaseMedical, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarActions } from '@/redux/slices/sidebarSlice'
import { RootState } from '@/redux/store'
import { dashboardRoutes } from '@/libs/routes'
import { usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'

interface Props {
    totalCount: number
}

const Sidebar = ({ totalCount }: Props) => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state: RootState) => state.sidebar.sidebarShow)

    const closeSidebar = () => {
        dispatch(
            sidebarActions.changeSidebar(false)
        )
    }
    const t = useTranslations('dashboard')
    const routeNames = t.raw('routes')
    const pathname = usePathname()
    return (
        <aside className={`w-[250px] fixed h-full pb-2 lg:z-[999] lg:translate-x-0 bg-white ${sidebarShow ? "opacity-100 z-[999] translate-x-0" : "opacity-0 z-0 -translate-x-16"} transition-all duration-300 lg:opacity-100`}>
            <div className="logo-box px-4 gap-2 pt-2.5 flex justify-between items-center lg:justify-center">
                <LocaleLink onClick={closeSidebar} href='/' className="inline-block logo">
                    <Image
                        src={Logo}
                        alt='sinapsmed-logo'
                        className='h-auto mt-0.5'
                        width={120}
                    />
                </LocaleLink>
                <button onClick={closeSidebar} className='text-blue-500 lg:hidden'>
                    <FontAwesomeIcon icon={faXmark} size='2xl' />
                </button>
            </div>
            <ul className='p-2 space-y-1.5 flex-1 overflow-y-auto primary-scroll'>
                <li>
                    <LocaleLink onClick={closeSidebar} href={'/'} className='inline-block w-full hover:text-blue-500"  py-3 px-5 rounded'>
                        <FontAwesomeIcon icon={faChevronLeft} className='me-3 text-blue-500' />
                        {t('homePage')}
                    </LocaleLink>
                </li>
                {
                    dashboardRoutes.map((route, index) => {
                        const href = `/dashboard/${route.href}`
                        const active = href === '/dashboard/'
                            ? pathname === '/dashboard'
                            : pathname.startsWith(href);
                        return (
                            route.icon ? <li key={index}>
                                <LocaleLink onClick={closeSidebar} href={href} className={`inline-block w-full ${active ? "bg-blue-500 text-white font-semibold" : "hover:text-blue-500"}  py-3 px-5 rounded`}>
                                    <FontAwesomeIcon icon={route.icon} className={`me-3 ${!active ? "text-blue-500" : ""}`} />
                                    {routeNames[index].title}
                                </LocaleLink>
                            </li> : null
                        )
                    })
                }
                <li>
                    <LocaleLink onClick={closeSidebar} href={'/cart'} className='inline-block w-full hover:text-blue-500"  py-3 px-5 rounded'>
                        <span className='relative'>
                            <FontAwesomeIcon icon={faSuitcaseMedical} className='me-3 text-blue-500' />
                            {
                                totalCount > 0 &&
                                <span className='absolute -top-[12px] -right-[12px] size-[18px] box-content text-[12px] rounded-full border-2 border-white flex flex-center bg-blue-600 text-white'>
                                    {totalCount}
                                </span>
                            }
                        </span>
                        {t('cartPage')}
                    </LocaleLink>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar