'use client'
import { Route } from '@/types/route'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import LocaleLink from '../../commons/LocaleLink'
import usePath from '@/hooks/usePath'
import { isActive } from '@/libs/routes'

interface Props {
    subRoutes: Route[]
}

const NestedMenu = ({ subRoutes }: Props) => {
    const path = usePath()
    if (subRoutes.length === 0) return
    return (
        <div className='bg-white py-5 absolute w-[240px] xl:w-[300px] z-[2] bottom-100 left-0 shadow-md group-hover/menu:block hidden'>
            {
                subRoutes.map((route, index) => {
                    const hasSub = !!route.subRoutes
                    const active = route.subRoutes?.some((route)=> path.startsWith(route.href ?? ''))

                    return (
                        <div className={`py-2 ${active ? "text-blue-800 font-bold":""} group/submenu hover:text-blue-800 px-8 flex items-center gap-10 ${hasSub ? "relative" : ""} justify-between transition-all`} key={index} >
                            {
                                hasSub ?
                                    <>
                                        {route.name}
                                        <FontAwesomeIcon icon={faCaretRight} />
                                        <SubMenu subRoutes={route.subRoutes || []} />
                                    </>
                                    :
                                    <LocaleLink href={route.href?? ''}>{route.name}</LocaleLink>
                            }
                        </div>
                    )
                })
            }
        </div >
    )
}


const SubMenu = ({ subRoutes }: Props) => {
    const path = usePath()
    if (subRoutes.length === 0) return
    return (
        <div className='absolute -right-full top-[-20px] w-[240px] xl:w-[300px]'>
            <div className='bg-white py-5 relative z-[2] shadow-md hidden group-hover/submenu:block'>
                {
                    subRoutes.map((route, index) => {
                        const active = isActive(route, path)
                        return (
                            <div className={`${active ? "text-blue-800 font-bold" : ""} group/submenu2 p-2 px-8 text-black hover:text-blue-800 flex items-center gap-10 relative justify-between transition-all`} key={index}>
                                <LocaleLink href={route.href ?? ''}>{route.name}</LocaleLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default NestedMenu