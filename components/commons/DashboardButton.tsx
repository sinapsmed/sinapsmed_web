import React from 'react'
import LocaleLink from './LocaleLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import { useSession } from '../providers/SessionProvider'

const DashboardButton = () => {
    const t = useTranslations('common.navbar')
    const session = useSession()
    return (
        <LocaleLink className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded font-semibold flex gap-2 items-center' href={!!session ? '/dashboard' : '/login'}>
            <FontAwesomeIcon icon={!!session ? faUser: faSignIn} />
            <span className='hidden sm:inline'>{t(!!session ? 'dashboard': 'signin')}</span>
        </LocaleLink>
    )
}

export default DashboardButton