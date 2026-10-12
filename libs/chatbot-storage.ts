import { ChatSession } from '@/types/chatbot'

type StoredSession = Pick<ChatSession, 'id' | 'title' | 'createdAt' | 'updatedAt'>

const keyFor = (userId: string) => `sinapsmed.chat.sessions.${userId}`

export function loadChatSessionMetadata(userId: string): StoredSession[] {
  if (typeof window === 'undefined' || !userId) return []
  try {
    const value = window.sessionStorage.getItem(keyFor(userId))
    const parsed: unknown = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed.filter(isStoredSession) : []
  } catch {
    return []
  }
}

export function saveChatSessionMetadata(userId: string, sessions: ChatSession[]) {
  if (typeof window === 'undefined' || !userId) return
  const metadata: StoredSession[] = sessions.map(({ id, title, createdAt, updatedAt }) => ({ id, title, createdAt, updatedAt }))
  window.sessionStorage.setItem(keyFor(userId), JSON.stringify(metadata))
}

export function clearChatSessionMetadata(userId: string) {
  if (typeof window !== 'undefined' && userId) window.sessionStorage.removeItem(keyFor(userId))
}

function isStoredSession(value: unknown): value is StoredSession {
  if (!value || typeof value !== 'object') return false
  const session = value as Record<string, unknown>
  return ['id', 'title', 'createdAt', 'updatedAt'].every(key => typeof session[key] === 'string')
}
