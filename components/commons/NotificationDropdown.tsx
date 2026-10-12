'use client'

import React, { MouseEvent, useRef, useState, useTransition, useCallback } from 'react'
import { Badge, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { summarizeMessage } from '@/types/notifications'
import { useNotification } from '@/components/providers/NotificationProvider'
import useFormatDate from '@/hooks/date'


const NotificationDropdown = () => {
  const {data, markAsRead} = useNotification()
  const t = useTranslations('notification')
  const formatDate = useFormatDate()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { isRead } = useNotification()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const didRefreshForThisOpen = useRef(false)

  const openMenu = async (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
    await markAsRead()
  }
  const closeMenu = () => {
    setAnchorEl(null)
    didRefreshForThisOpen.current = false
  }

  const handleRefresh = useCallback(() => {
    startTransition(() => router.refresh())
  }, [startTransition, router])

  return (
    <div className="relative">
      <button
        onClick={openMenu}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'notifications-menu' : undefined}
        aria-label={t('openMenu')}
        className="px-2 py-1"
      >
        <Badge variant="dot" color="error" overlap="circular" invisible={isRead || data.length === 0}>
          <FontAwesomeIcon icon={faBell} className="text-2xl" />
        </Badge>
      </button>
    
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          paper: { sx: { width: 360, maxHeight: 520, p: 0 } }
        }}
      >
        <div className="px-3 py-2 flex data-center justify-between">
          <Typography variant="subtitle1" className="font-semibold">
            {t('title')}
          </Typography>
          <Tooltip title={t('refresh')}>
            <span>
              <IconButton size="small" onClick={handleRefresh} disabled={isPending} aria-label={t('refresh')}>
                <FontAwesomeIcon icon={faRotateRight} spin={isPending} />
              </IconButton>
            </span>
          </Tooltip>
        </div>

        <Divider />

        {data.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2">{t('empty')}</Typography>
          </MenuItem>
        )}

        {data.slice(0, 4).map((n) => {
          const formatted = n.createdAt ? formatDate(n.createdAt): '-'
          return (
            <MenuItem
              key={n.id}
              component={Link}
              href="/dashboard/notifications"
              onClick={closeMenu}
              className="flex flex-col data-start"
              sx={{
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                lineHeight: 1.4,
                alignItems: 'flex-start',
                gap: 0.25,
                my: 0.5,
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <Typography variant="caption" className="opacity-70" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                {n.sender ?? '—'}{n.email ? ` (${n.email})` : ''}{n.createdAt ? ` • ${formatted}` : ''}
                
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                {summarizeMessage(n.message)}
              </Typography>
            </MenuItem>
          )
        })}

        <div className="px-3 py-2">
          <Link
            href="/dashboard/notifications"
            onClick={closeMenu}
            className="inline-block font-medium text-center py-2 px-3 sm:px-4 rounded text-sm sm:text-base bg-violet-500 text-white hover:bg-violet-600 w-full"
          >
            {t('all')}
          </Link>
        </div>
      </Menu>
    </div>
  )
}

export default NotificationDropdown
