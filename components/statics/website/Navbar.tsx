'use client'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import Logo from '@/public/logo.png'
import { Route } from '@/types/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import LangSelect from '../LangSelect'
import { useTranslations } from 'next-intl'
import SideBar from './SideBar'
import LocaleLink from '../../commons/LocaleLink'
import NestedMenu from './NestedMenu'
import { usePathname } from '@/navigation'
import DashboardButton from '@/components/commons/DashboardButton'
import { updateRoutes } from '@/libs/routes'
import CartIcon from '@/components/cart/CartIcon'

interface Props {
  blogData: Route[] | undefined,
  serviceData: Route[] | undefined,
  totalCount: number,
}

const Navbar = ({ blogData, serviceData, totalCount }: Props) => {
  const t = useTranslations('common.navbar')
  const routeNames: string[] = t.raw('routes')
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const updatedRoutes = useMemo(() => updateRoutes(serviceData, blogData), [serviceData, blogData])

  return (
    <nav className='navbar flex items-center py-2.5 px-4 divide-x-2 shadow-sm'>
      <SideBar totalCount={totalCount} openState={[open, setOpen]} routeNames={routeNames} routes={updatedRoutes} />
      <LocaleLink href='/' className="inline-block logo px-2">
        <Image
          src={Logo}
          alt='sinapsmed-logo'
          className='h-auto'
          width={120}
        />
      </LocaleLink>

      <div className="navlinks flex-1 flex items-center justify-between">
        <ul className='list-none ps-2 font-semibold items-center hidden lg:flex text-center'>
          {updatedRoutes.map((route, index) => (
            <MenuItem active={pathName.startsWith(route.href ?? '')} key={index} route={route} routeName={routeNames[index]} />
          ))}
          <li className='ms-2'>
            <CartIcon title={routeNames[6]} totalCount={totalCount}/>
          </li>
        </ul>

        <ul className='list-none flex items-center flex-1 justify-end gap-0.5'>
          <li className='me-2'>
            <DashboardButton />
          </li>
          <li className='hover:bg-[#cacaca70] transition-all rounded-full hidden size-10 flex-center lg:flex'>
            <LangSelect />
          </li>
          <li className='hover:bg-[#cacaca70] transition-all rounded-full size-10 flex flex-center lg:hidden'>
            <button onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faBars} size='xl' />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

interface MenuItemProps {
  route: Route,
  routeName: string,
  active: boolean
}

const MenuItem = ({ route, routeName, active }: MenuItemProps) => {
  return (
    <li>
      {!route.subRoutes ? (
        <LocaleLink className={`p-3 flex items-center gap-1.5 hover:text-blue-800 transition-all ${active ? "text-blue-800 font-bold" : ""}`} href={route.href ?? ''}>
          {routeName}
        </LocaleLink>
      ) : (
        <div className='relative group/menu'>
          <h1 id={`${route.name}`} className={`p-3 flex items-center gap-1.5 group-hover/menu:text-blue-800 transition-all ${active ? "text-blue-800 font-bold" : ""}`}>
            {routeName}
            <FontAwesomeIcon icon={faCaretDown} />
          </h1>
          <NestedMenu subRoutes={route.subRoutes} />
        </div>
      )}
    </li>
  );
};
export default Navbar