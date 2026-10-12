'use client'
import React, { MouseEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { Menu, MenuItem } from '@mui/material'
import { langOptions } from '@/libs/locales'
import { useParams, useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from '@/navigation'
import usePath from '@/hooks/usePath'
const LangSelect = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = useMemo(()=>{
        return Boolean(anchorEl)
    },[anchorEl]);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const router = useRouter()
    const path = usePath()
    const {locale} = useParams()
    const handleClose = (locale?: string) => {
        router.push(path, { locale: locale });
        setAnchorEl(null);
    };
    const currentLocale = useMemo(()=>{
        return langOptions.find(opt=>opt.locale===locale)
    },[locale])
    return (
        <>
            <button
                id="lang-select"
                aria-controls={open ? 'lang-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='hover:bg-transparent text-black flex flex-center drop-shadow'
            >
                <Image
                    src={currentLocale?.flag?? ""}
                    alt={currentLocale?.title?? ""}
                    className='size-7'
                />
            </button>
            <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={()=>handleClose()}
                MenuListProps={{
                    'aria-labelledby': 'lang-button',
                }}
                className='mt-2'
            >
                {
                    langOptions.map((opt, index) => (
                        <MenuItem key={index} selected={currentLocale?.locale === opt.locale} onClick={() => handleClose(opt.locale)} className='flex items-center gap-2 text-sm'>
                            <Image
                                src={opt.flag}
                                alt={opt.title}
                                className='h-auto'
                                width={20}
                            />
                            <span>{opt.title}</span>
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}

export default LangSelect