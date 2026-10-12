'use client'
import React from 'react'
import Cookies from "js-cookie";
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Popover, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const ResetChoiceButton = () => {
    const t = useTranslations('analyses')
    const router = useRouter()
    const reset = () => {
        Cookies.remove('clinic')
        router.refresh()
    }
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div className='flex gap-2 items-center'>
                <button onClick={reset} className='h-[56px] px-6 flex flex-center text-center rounded bg-blue-500 text-white text-lg'>{t('refresh')}</button>
                <button onClick={handleClick} className='text-lg px-2'>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
            </div>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                className='lg:w-[900px]'
            >
                <Typography className='p-2'>{t('guide')}</Typography>
            </Popover>
        </>
    )
}

export default ResetChoiceButton