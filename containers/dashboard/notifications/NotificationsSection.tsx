'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import NotificationList from '@/components/dashboard/notifications/NotificationList'
import { useNotification } from '@/components/providers/NotificationProvider'

const NotificationsSection = () => {
  const { data, markAsRead, more, pending, showMore } = useNotification()
  const t = useTranslations('notification')

  useEffect(() => {
    async function fetch() {
      await markAsRead()
    }

    fetch()
  }, [])
  return (
    <section className='space-y-2'>
      {data.length > 0 ? (
        <NotificationList data={data} />
      ) : (
        <div className="p-3 text-sm text-gray-600">{t('empty')}</div>
      )}
      {
        showMore && <div className='flex justify-center'>
          <button disabled={pending} onClick={more} className='bg-blue-500 p-2 rounded text-white'>
            Daha Çox
          </button>
        </div>
      }
    </section>
  )
}

export default NotificationsSection
