import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
}

const Label = ({ children, className="" }: Props) => {
    return (
        <h1 className={`font-bold text-center text-3xl sm:text-[42px] ${className}`}>
            {children}
        </h1>
    )
}

export default Label