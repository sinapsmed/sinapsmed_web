'use client'
import { UserInfo } from '@/types/auth'
import React, { createContext, ReactNode, useContext } from 'react'

interface Props {
  userInfo?: UserInfo,
  children: ReactNode
}

const SessionContext = createContext<UserInfo | null>(null)

export const useUser = (): UserInfo | null => {
  const context = useContext(SessionContext);
  return context;
};

const UserProvider = ({ userInfo, children }: Props) => {
  return (
    <SessionContext.Provider value={userInfo??null}>
      {children}
    </SessionContext.Provider>
  )
}

export default UserProvider