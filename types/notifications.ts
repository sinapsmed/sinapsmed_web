import { NotificationType } from "./enum"
import { WithPage } from "./pagination"

export interface Notification{
  id: string
  message: string
  type: NotificationType
  sender?: string
  senderId?: string
  email?: string
  createdAt?: string
  userId?: string
}

export interface NotificationWithPage{
  data: WithPage<Notification>
  isRead: boolean
}

export function summarizeMessage(message: string, maxChars = 140): string {
  const parts = message.split(/(?<=[.!?])\s+/)
  let s = (parts[0] || message).trim()
  if (s.length > maxChars) s = s.slice(0, maxChars).trimEnd()
  if (s.length < message.trim().length) s = s.replace(/[.,;:\s]*$/, '') + '...'
  return s
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleString()
}

