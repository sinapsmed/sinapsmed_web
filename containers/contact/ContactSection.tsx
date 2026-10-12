'use client'
import { SendMessage } from '@/actions/contact'
import RequiredInput from '@/components/commons/RequiredInput'
import SubmitButton from '@/components/commons/SubmitButton'
import { faEnvelope,  faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'
import React from 'react'
import useForm from '@/hooks/form'
import Error from '@/components/commons/Error'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const ContactSection = () => {
    const t = useTranslations('contact')
    const { action, state, error, pending } = useForm(SendMessage)
    return (
        <section id='contact-section' className='sectionBox'>
            <div className='flex flex-col sm:flex-row gap-x-20 gap-y-5'>
                <form onSubmit={action} className='w-full sm:w-1/2 md:w-2/3 lg:w-3/4 sm:order-2 flex flex-col gap-3 '>
                    <div className='pb-2'>
                        <h1 className='text-3xl text-center sm:text-start font-bold'>{t('form.header')}</h1>
                        <p className='text-neutral-700'>{t('desc')}</p>
                    </div>
                    <RequiredInput title={t('form.fullname')} name='fullName' className='p-4 shadow shadow-blue-500 rounded placeholder-neutral-600' type="text" required placeholder={`${t('form.fullname')} *`} />
                    <RequiredInput title={t('form.email')} name='email' className='p-4 shadow shadow-blue-500 rounded placeholder-neutral-600' type="email" required placeholder={`${t('form.email')} *`} />
                    <textarea name='description' className='p-4 shadow shadow-blue-500 rounded placeholder-neutral-600 resize-y' rows={6} placeholder={t('form.message')} />
                    <Error error={error} />
                    <SubmitButton state={state} pending={pending} className='text-start'>{t('form.submit')}</SubmitButton>
                </form>
                <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col justify-center gap-5 sm:order-1'>
                    <h1 className='font-bold text-center sm:text-start text-3xl'>{t('header')}</h1>
                    {/* <div className='shadow shadow-blue-500 p-6 rounded-md flex items-center gap-x-4'>
                        <FontAwesomeIcon icon={faWhatsapp} className='text-blue-500 text-3xl' />
                        <div>
                            <h1 className='font-bold'>{t('callUs')}</h1>
                            <p className='text-neutral-700'>+994507146325</p>
                        </div>
                    </div> */}
                    <div className='shadow shadow-blue-500 p-6 rounded-md flex items-center gap-x-4'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-blue-500 text-3xl' />
                        <div>
                            <h1 className='font-bold'>{t('email')}</h1>
                            <p className='text-neutral-700'>info@sinapsmed.com</p>
                        </div>
                    </div>
                    <div className='shadow shadow-blue-500 p-6 rounded-md flex items-center gap-x-4'>
                        <FontAwesomeIcon icon={faLocationPin} className='text-blue-500 text-3xl' />
                        <div>
                            <h1 className='font-bold'>{t('location.header')}</h1>
                            <p className='text-neutral-700'>{t('location.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection