'use client'
import useFetch, { Func } from '@/hooks/useFetch'
import React, { createContext, ReactNode, useContext } from 'react'

type FetchContextType<T> = [
  state: T,
  pending: boolean,
  query: { [key: string]: string | string[] },
  setQuery: (...args: (string | string[])[]) => Promise<void>
]

interface Props<T> {
  children: ReactNode,
  initialData: T
  action: Func<T>,
  searchParams: { [key: string]: string | string[] }
}

const FetchContext = createContext<FetchContextType<any> | undefined>(undefined);

const FetchProvider = <T,>({ children, action, initialData, searchParams }: Props<T>) => {
  const fetchResult = useFetch(action, initialData, searchParams)
  return (
    <FetchContext.Provider value={fetchResult}>
      {children}
    </FetchContext.Provider>
  )
}

export const useFetchContext = <T,>() => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetchContext must be used within a FetchProvider');
  }
  return context as FetchContextType<T>;
}

export default FetchProvider