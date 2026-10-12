'use client'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import React, { ReactNode } from 'react'

interface Props{
    children?: ReactNode,
    locale: string
    messages: AbstractIntlMessages
}

const TranslationProvider = ({children, locale, messages}:Props) => {
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone='Asia/Baku'>
            {children}
        </NextIntlClientProvider>
    )
}

export default TranslationProvider