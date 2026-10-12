'use client'
import React from 'react'
import LocaleLink from '../commons/LocaleLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'

interface Props{
    totalCount: number
    title: string,
    closeDrawer?: ()=>void
}

const CartIcon = ({totalCount, title, closeDrawer}: Props) => {
    const active = usePathname() === '/cart'
    
    return (
        <LocaleLink onClick={closeDrawer} className={`${active ? "text-blue-800" : ""} relative hover:text-blue-800`} href={'/cart'}>
            <FontAwesomeIcon title={title} icon={faSuitcaseMedical} className='text-2xl' />
            {
                totalCount > 0 &&
                <span className='absolute -top-[12px] -right-[12px] size-[18px] box-content text-[12px] rounded-full border-2 border-white flex flex-center bg-blue-600 text-white'>
                    {totalCount}
                </span>
            }
        </LocaleLink>
    )
}

export default CartIcon