import Link from 'next/link'
import React, { ReactNode } from 'react'
import LocaleLink from './LocaleLink'

interface Props {
    href: string,
    children?: ReactNode
    className?: string
}

const ButtonLink = ({ href, children, className }: Props) => {
    return (
        <LocaleLink
            href={href}
            className={`${className} inline-block bg-[#8757B2] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#6b3e93]`}
        >
            {children}
        </LocaleLink>
    )
}

export default ButtonLink