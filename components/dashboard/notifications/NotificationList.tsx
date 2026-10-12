'use client'

import React, { useState } from 'react'
import { Notification, summarizeMessage } from '@/types/notifications'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import useFormatDate from '@/hooks/date'
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC'

const cardCls =
  'p-3 border border-gray-200 rounded bg-white shadow-sm hover:bg-gray-50 transition-colors'
const captionCls = 'text-xs text-gray-600'
const msgCls = 'text-sm text-gray-900'

const NotificationList = ({
  data,
}: {
  data: Notification[]
}) => {
  const [selected, setSelected] = useState<Notification | null>(null)
   const t = useTranslations('notification') 
   const formatDate = useFormatDate()
  const handleOpen = (item: Notification) => {
    setSelected(item)
  }

  const handleClose = () => {
    setSelected(null)
  }

  const getDate = (dateStr?: string)=>{
    if(!dateStr) return '-'
    const date = formatDate(dateStr)
    return ` • ${date}`
  }
  return (
    <>
      <div className="space-y-2 flex flex-col">
           <InfoBadgeForUTC />
        {data.map(n => (
          <NotificationItem
            key={n.id}
            item={n}
            date={getDate(n.createdAt)}
            highlight={selected?.id === n.id}
            onOpen={handleOpen}
          />
        ))}
      </div>

      <Dialog open={!!selected} onClose={handleClose} fullWidth maxWidth="sm">
      
        <DialogContent dividers>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {selected?.sender ?? '—'}
            {selected?.email ? ` (${selected.email})` : ''}
            {getDate(selected?.createdAt)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {selected?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">{t('close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const NotificationItem = ({
  item,
  highlight,
  onOpen,
  date,
}: {
  item: Notification
  highlight: boolean
  onOpen: (n: Notification) => void
  date: string
}) => {
  return (
    <button
      onClick={() => onOpen(item)}
      className={`${cardCls} text-left ${highlight ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className={captionCls}>
        {item.sender ?? '—'}
        {item.email ? ` (${item.email})` : ''}
        <span>{date}</span>
    
      </div>
      <div className={msgCls}>
        {summarizeMessage(item.message)}
      </div>
    </button>
  )
}

export default NotificationList
