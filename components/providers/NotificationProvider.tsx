'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { GetNotifications, MarkNotificationAsRead } from '@/actions/notification'
import { Notification, NotificationWithPage } from '@/types/notifications'
type Ctx = {
  isRead: boolean
  more: ()=> Promise<void>
  markAsRead: () => Promise<void>
  pending: boolean
  data: Notification[]
  showMore: boolean
}
const NotificationContext = createContext<Ctx | null>(null)
export const useNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider')
  return ctx
}
export default function NotificationProvider({
  children,
  initialData
}: { children: ReactNode; initialData?: NotificationWithPage }) {
  const [isRead, setIsRead] = useState(initialData?.isRead ?? true)
  const [data, setData] = useState(initialData?.data.data??[])
  const [page, setPage] = useState(1)
  const [pending, setPending] = useState(false)
  const [showMore, setShowMore] = useState((initialData?.data.pageCount??0)>1)
  
  const markAsRead = async () => {    
    if (!isRead) {
      const result = await MarkNotificationAsRead(data.at(0)?.id??'')      
      if (result.success) setIsRead(true)
    }
  }

  const more = async () => {
    setPending(true)
    const newPage = page+1
    const result = await GetNotifications(newPage, 10)    
    if(result.success){
      setData(prev=>([...prev, ...(result.data?.data.data??[])]))
      setPage(newPage)
      setShowMore((result.data?.data.pageCount??0)>newPage)
    }
    setPending(false)
  }
  return (
    <NotificationContext.Provider value={{ isRead, markAsRead, pending, data, more, showMore }}>
      {children}
    </NotificationContext.Provider>
  )
}
