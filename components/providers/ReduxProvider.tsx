'use client'
import { makeStore } from '@/redux/store'
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'

interface Props {
  children: ReactNode,
}

const ReduxProvider = ({ children }: Props) => {
  return (
    <Provider store={makeStore()}>
      {children}
    </Provider>
  )
}

export default ReduxProvider