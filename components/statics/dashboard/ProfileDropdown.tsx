'use client'
import React, { MouseEvent, useState } from 'react'
import Image from 'next/image'
import { Menu, MenuItem } from '@mui/material'
import LocaleLink from '@/components/commons/LocaleLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import { Logout } from '@/actions/auth'
import { usePathname } from '@/navigation'
import { useUser } from '@/components/providers/UserProvider'
import { useTopLoader } from 'nextjs-toploader'
import LangSelect from '../LangSelect'

const ProfileDropdown = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const openMenu = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const t = useTranslations('dashboard.user')
    const pathname = usePathname()

    const userInfo = useUser()

    const loader = useTopLoader()
    const logout = async () => {
        closeMenu()
        loader.start()
        await Logout()
    }
    return (
        userInfo && <>
            <div className='profile-box flex items-center gap-2 cursor-pointer' onClick={(e) => openMenu(e)}>
                <div className='size-8 relative'>
                    <Image src={userInfo.imageUrl} fill alt='profile' className='rounded-full bg-[#00000018] object-cover' />
                </div>
                <div className='leading-none hidden md:block'>
                    <h1 className='font-semibold capitalize text-sm'>{userInfo.name} {userInfo.surName}</h1>
                    <p className='text-xs opacity-80'>{userInfo.unicalKey}</p>
                </div>
            </div>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                className='mt-2'
            >
                <MenuItem
                    disableRipple
                    selected={false}
                    sx={{
                        "&.MuiMenuItem-root": {
                            cursor: "default",
                            "&:hover": { backgroundColor: "transparent" },
                            borderBottom: '1px solid #e5e7eb'
                        },
                    }}
                    className='md:hidden'>
                    <div className='flex items-center gap-2 justify-between w-full'>
                        <div className='leading-none'>
                            <h1 className='font-semibold capitalize text-sm'>{userInfo.name} {userInfo.surName}</h1>
                            <p className='text-xs opacity-80'>{userInfo.unicalKey}</p>
                        </div>
                        <LangSelect />
                    </div>
                </MenuItem>
                <MenuItem selected={pathname === '/dashboard/profile'} onClick={closeMenu}>
                    <LocaleLink href='/dashboard/profile'>
                        <FontAwesomeIcon icon={faUser} className='me-3' />
                        {t('settings.myAccount')}
                    </LocaleLink>
                </MenuItem>
                <MenuItem selected={pathname === '/dashboard/change-password'} onClick={closeMenu}>
                    <LocaleLink href='/dashboard/change-password'>
                        <FontAwesomeIcon icon={faLockOpen} className='me-3' />
                        {t('settings.changePass')}
                    </LocaleLink>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <FontAwesomeIcon icon={faRightFromBracket} className='me-3' />
                    {t('settings.logout')}
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileDropdown