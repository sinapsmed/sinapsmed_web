import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
}

const Container = ({ children, className='' }: Props) => {
    return (
        <div className={`p-2.5 bg-white rounded-md shadow-md ${className}`}>
            {children}
        </div>
    )
}

export default Container