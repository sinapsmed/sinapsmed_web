'use server'

import { tryFetch } from '@/libs/fetch'
import { createUrl } from '@/libs/query'
import { baseApi } from '@/libs/keys'
import { auth } from '@/next-auth/auth'
import { NotificationWithPage } from '@/types/notifications'

export async function GetNotifications(page: number, limit: number) {
  const session = await auth()
  const apiUrl = createUrl(`${baseApi}/Notifications/GetAll`, { page, limit })
  return await tryFetch<NotificationWithPage>(apiUrl, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${session?.token}`
    },
  })
}

export async function MarkNotificationAsRead(notificationId: string) {
  const session = await auth()
  const apiUrl = createUrl(`${baseApi}/Notifications/IsRead`, {notificationId})

  return await tryFetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session?.token}`,
      'Content-Type': 'application/json',
    },
  })
}

