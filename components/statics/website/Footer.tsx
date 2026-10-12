import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/logo.png'
import { SocialMedias } from '@/libs/social_medias'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { routes } from '@/libs/routes'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import LocaleLink from '../../commons/LocaleLink'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const t = useTranslations('common')
    const routeNames: string[] = t.raw('navbar.routes')

    return (
        <footer className='border-t'>
            <div className="sectionBox noVertical py-6">
                <div className='footer-box grid grid-cols-2 sm:grid-cols-3 gap-4 ps-5 sm:ps-0'>
                    <div className="col space-y-3">
                        <div className="logo p-2 border-b-2 w-fit">
                            <Image
                                src={Logo}
                                alt='sinapsmed-logo'
                                className='h-auto'
                                width={160}
                            />
                        </div>
                        <p className="slogan italic">
                            {t('footer.slogan')}
                        </p>
                        <div className='social-medias flex gap-2 pt-3'>
                            {
                                SocialMedias.map((media, index) => (
                                    <Link href={media.url} key={index} className='bg-indigo-500 text-white rounded size-8 flex flex-center'>
                                        <FontAwesomeIcon icon={media.icon} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col space-y-5 text-stone-700">
                        <span className='border-b-2 p-3 font-bold text-lg'>{t('footer.otherLinks')}</span>
                        <ul className='italic ps-2'>
                            <li>
                                <LocaleLink href={'/'} className='hover:text-blue-800 py-1 inline-block'>{t('navbar.home')}</LocaleLink>
                            </li>
                            {
                                routes.map((route, index) => (
                                    !route.subRoutes && <li key={index}>
                                        <LocaleLink href={route.href?? ''} className='hover:text-blue-800 py-1 inline-block'>{routeNames[index]}</LocaleLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col space-y-5 text-stone-700">
                        <span className='border-b-2 p-3 font-bold text-lg'>{t('footer.contactInfo')}</span>
                        <div className='ps-2 space-y-3'>
                            <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p>{t('footer.location')}</p>
                            </div>
                            {/* <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faPhone} />
                                <p>+994507146325</p>
                            </div> */}
                            <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>info@sinapsmed.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright bg-neutral-100 text-stone-700">
                <div className="sectionBox noVertical py-6 flex-col-reverse sm:flex-row text-center gap-y-5 flex items-center sm:justify-between">
                    <p>© {currentYear} Sinapsmed MMC</p>
                    <ul className='list-none flex flex-wrap items-center justify-center gap-y-3 links'>
                        <li className='w-1/2 sm:w-1/3'>
                            <Link
                                href={'/faq'}
                                className='hover:text-blue-800'
                            >
                                {t('footer.links.faq')}
                            </Link>
                        </li>
                        <li className='w-1/2 sm:w-1/3'>
                            <Link
                                href={'/user-agreement'}
                                className='hover:text-blue-800'
                            >
                                {t('footer.links.user_agreement')}
                            </Link>
                        </li>
                        <li className='w-1/2 sm:w-1/3'>
                            <Link
                                href={'/privacy-policy'}
                                className='hover:text-blue-800'
                            >
                                {t('footer.links.privacy')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer