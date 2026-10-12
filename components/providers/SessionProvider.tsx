'use client'
import { Session } from 'next-auth'
import React, { createContext, ReactNode, useContext } from 'react'

interface Props{
    session: Session | null,
    children: ReactNode
}

const SessionContext = createContext<Session|null>(null)

export const useSession = (): Session|null => {
    const context = useContext(SessionContext);
    return context;
};

const SessionProvider = ({session,children}: Props) => {

  return (
    <SessionContext.Provider value={session}>
        {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider