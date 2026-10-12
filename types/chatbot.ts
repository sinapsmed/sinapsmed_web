export type ChatRole = 'user' | 'assistant'
export type ChatContentType = 'text' | 'html'

export interface ChatAction {
  type: 'view_doctor' | 'view_appointments' | 'book_appointment' | 'view_service'
  label: string
  doctorId?: string
  serviceId?: string
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  contentType: ChatContentType
  createdAt: string
  actions?: ChatAction[]
  error?: boolean
}

export interface ChatSession {
  /** UI-only identifier; it is never sent to the chat backend. */
  id: string
  /** Assigned by the backend after this conversation's first message. */
  backendSessionId?: string
  title: string
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
  isPending?: boolean
}

export interface ChatMessageRequest {
  sessionId: string | null
  message: string
}

/** Direct response proxied from the backend `POST /api/chat/message` endpoint. */
export interface ChatBackendResponse {
  sessionId: string
  reply: string
}

/** Kept for a future backend response wrapper, used elsewhere in Sinapsmed. */
export interface ChatApiEnvelope {
  success?: boolean
  message?: string
  statusCode?: number
  errorMessage?: string | null
  data?: ChatResponseData | string
}

export interface ChatResponseData {
  message?: string
  content?: string
  response?: string
  contentType?: ChatContentType
  actions?: ChatAction[]
}
