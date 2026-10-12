'use client'
import { Route } from '@/types/route'
import { faArrowRightLong, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import LangSelect from '../LangSelect'
import LocaleLink from '../../commons/LocaleLink'
import CartIcon from '@/components/cart/CartIcon'
import usePath from '@/hooks/usePath'
import { isActive } from '@/libs/routes'

interface Props {
    routes: Route[]
    routeNames: string[],
    openState: [boolean, Dispatch<SetStateAction<boolean>>],
    totalCount: number
}

const SideBar = ({ routes, routeNames, openState, totalCount }: Props) => {
    const [open, setOpen] = openState
    const closeDrawer = () => {
        setOpen(false)
    }
    return (
        <Drawer open={open} onClose={closeDrawer} anchor='right' className='lg:hidden'>
            <div className="py-5 px-7 space-y-5 w-[320px]" role='presentation'>
                <div className='flex justify-between items-center'>
                    <button className='text-2xl' onClick={closeDrawer}>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </button>
                    <div className='gap-5 flex items-center'>
                        <LangSelect />
                        <CartIcon closeDrawer={closeDrawer} title={routeNames[6]} totalCount={totalCount} />
                    </div>
                </div>
                <div className='font-semibold border-b select-none'>
                    <LinkList closeDrawer={closeDrawer} linkRoutes={routes} routeNames={routeNames} />
                </div>
            </div>
        </Drawer>
    )
}

type OpenState = Record<string, boolean>;
interface LinkListProps {
    linkRoutes?: Route[],
    routeNames: string[],
    ms?: string,
    closeDrawer: () => void
}
const LinkList = ({ linkRoutes, routeNames, ms = '', closeDrawer }: LinkListProps) => {
    const [open, setOpen] = useState<OpenState>({});
    const path = usePath()
    const handleToggle = (item: string) => {
        setOpen((prev) => ({ ...prev, [item]: !prev[item] }));
    };
    return (
        <List disablePadding className={`divide-y ${ms}`}>
            {
                linkRoutes?.map((route, index) => {
                    const routeName = routeNames[index]
                    const active = isActive(route, path)
                    return (
                        <Fragment key={index}>
                            <ListItem onClick={() => handleToggle(routeName)} className={`${active ? "text-blue-800 font-bold" : ""} hover:text-blue-800`}>
                                {
                                    route.subRoutes ?
                                        <><ListItemText disableTypography primary={routeName} />
                                            {open[routeName] ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}</>
                                        : <LocaleLink className='inline-block w-full' onClick={closeDrawer} href={route.href ?? ''}>{routeName}</LocaleLink>
                                }

                            </ListItem>
                            {
                                route.subRoutes &&
                                <Collapse in={open[routeName]} timeout="auto" unmountOnExit>
                                    <LinkList closeDrawer={closeDrawer} ms='ps-3' routeNames={route.subRoutes.map((s) => s.name ?? "")} linkRoutes={route.subRoutes} />
                                </Collapse>
                            }
                        </Fragment>
                    )
                })
            }
        </List>
    )
}

export default SideBar