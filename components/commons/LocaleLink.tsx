'use client'
import React, { MouseEventHandler, ReactNode } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
interface Props {
  href: string,
  children?: ReactNode,
  className?: string,
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
const LocaleLink = ({ href, children, className, onClick, disabled }: Props) => {
  const { locale } = useParams()
  let localeHref = `/${locale}`
  if (!href.startsWith('/')) localeHref += '/'
  return (
    disabled ? <button disabled className={className}>{children}</button> :
      <Link onClick={onClick} className={className} href={`${localeHref}${href}`}>{children}</Link>
  )
}

export default LocaleLink