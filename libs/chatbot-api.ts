import { ChatAction, ChatApiEnvelope, ChatBackendResponse, ChatContentType, ChatMessageRequest, ChatResponseData } from '@/types/chatbot'
import { baseApi } from "@/libs/keys"

export class ChatbotApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'ChatbotApiError'
  }
}

export interface ChatbotReply {
  content: string
  contentType: ChatContentType
  sessionId?: string
  actions?: ChatAction[]
}

export async function sendChatMessage(request: ChatMessageRequest, signal?: AbortSignal): Promise<ChatbotReply> {
  console.log('[Chatbot] Request', request)
  const response = await fetch('http://localhost:5000/nam/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  } 
)

  const responseText = await response.text()
  let payload: unknown = {}
  try {
    payload = JSON.parse(responseText)
  } catch { 
  }
  console.log('[Chatbot] Response', {
    status: response.status,
    ok: response.ok,
    contentType: response.headers.get('content-type'),
    payload,
    rawBody: responseText,
  })
  const envelope = isRecord(payload) ? payload as ChatApiEnvelope : {}
  if (!response.ok || envelope.success === false) {
    throw new ChatbotApiError(response.status, friendlyError(response.status, envelope.message || envelope.errorMessage))
  }

  // The chatbot's direct backend reply is HTML-formatted. It is still routed
  // through ChatMessageRenderer, where DOMPurify applies the strict allowlist.
  if (isBackendResponse(payload)) return { content: payload.reply, contentType: 'html', sessionId: payload.sessionId }

  const data = envelope.data
  if (typeof data === 'string') return { content: data, contentType: 'text' }
  const reply = data as ChatResponseData | undefined
  const content = reply?.content ?? reply?.message ?? reply?.response ?? envelope.message
  if (!content) throw new ChatbotApiError(502, 'Köməkçi cavab qaytarmadı. Zəhmət olmasa yenidən cəhd edin.')

  // HTML is rendered only when the server explicitly declares it as HTML.
  return { content, contentType: reply?.contentType === 'html' ? 'html' : 'text', actions: reply?.actions }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isBackendResponse(value: unknown): value is ChatBackendResponse {
  return isRecord(value) && typeof value.sessionId === 'string' && typeof value.reply === 'string'
}

function friendlyError(status: number, fallback?: string | null) {
  if (status === 400) return fallback || 'Mesajı göndərmək mümkün olmadı.'
  if (status === 401) return 'Söhbət üçün hesabınıza daxil olun.'
  if (status === 403) return 'Bu əməliyyat üçün icazəniz yoxdur.'
  if (status === 404) return 'Söhbət xidməti hazırda əlçatan deyil.'
  if (status === 429) return 'Çox sayda sorğu göndərildi. Bir az sonra yenidən cəhd edin.'
  if (status >= 500) return 'Xidmətdə müvəqqəti problem var. Bir az sonra yenidən cəhd edin.'
  return fallback || 'Mesaj göndərilərkən xəta baş verdi.'
}
