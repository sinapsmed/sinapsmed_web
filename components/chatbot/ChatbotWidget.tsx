'use client'

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faCommentMedical, faPlus, faRotateRight, faTimes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSession } from '@/components/providers/SessionProvider'
import { sendChatMessage } from '@/libs/chatbot-api'
import { ChatMessage, ChatSession } from '@/types/chatbot'
import ChatMessageRenderer from './ChatMessageRenderer'

const suggestions = ['Mənə uyğun həkim tap', 'Randevu almaq istəyirəm', 'Mövcud randevularımı göstər', 'Sinapsmed xidmətləri haqqında məlumat ver']
const now = () => new Date().toISOString()
const newId = () => crypto.randomUUID()

interface ChatError { sessionId: string; message: string }

export default function ChatbotWidget() {
  const session = useSession()
  const userId = session?.user?.userId
  const [open, setOpen] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null)
  const [error, setError] = useState<ChatError | null>(null)
  const [retry, setRetry] = useState<{ sessionId: string; message: string } | null>(null)
  const requestRef = useRef<AbortController | null>(null)
  const identityGeneration = useRef(0)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Guest state is memory-only. An auth transition clears all messages so
  // guest and account conversations cannot ever be mixed in the UI.
  useEffect(() => {
    identityGeneration.current += 1
    requestRef.current?.abort()
    const createdAt = now()
    const fresh: ChatSession = { id: newId(), title: 'Söhbət', createdAt, updatedAt: createdAt, messages: [] }
    setSessions([fresh]); setActiveId(fresh.id); setDraft(''); setError(null); setRetry(null); setPending(false); setPendingSessionId(null)
    return () => requestRef.current?.abort()
  }, [userId])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [activeId, sessions, pendingSessionId, error])
  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 150) }, [open])

  const active = useMemo(() => sessions.find(item => item.id === activeId) ?? null, [sessions, activeId])
  const updateSession = (id: string, updater: (current: ChatSession) => ChatSession) => setSessions(current => current.map(item => item.id === id ? updater(item) : item))
  const createSession = () => {
    const createdAt = now()
    const chat: ChatSession = { id: newId(), title: 'Söhbət', createdAt, updatedAt: createdAt, messages: [] }
    setSessions(current => [chat, ...current]); setActiveId(chat.id); setError(null); setRetry(null)
    return chat
  }

  async function submit(value = draft, retrySessionId?: string) {
    const message = value.trim()
    if (!message || pending) return
    const chat = retrySessionId ? sessions.find(item => item.id === retrySessionId) : active ?? createSession()
    if (!chat) return

    const startedForIdentity = identityGeneration.current
    const userMessage: ChatMessage = { id: newId(), role: 'user', content: message, contentType: 'text', createdAt: now() }
    updateSession(chat.id, current => retrySessionId
      ? { ...current, isPending: true }
      : { ...current, updatedAt: userMessage.createdAt, messages: [...current.messages, userMessage], isPending: true }
    )
    setDraft(''); setError(null); setRetry(null); setPending(true); setPendingSessionId(chat.id)
    const controller = new AbortController(); requestRef.current = controller
    try {
      const reply = await sendChatMessage({ sessionId: chat.backendSessionId ?? null, message }, controller.signal)
      if (identityGeneration.current !== startedForIdentity) return
      if (!chat.backendSessionId && !reply.sessionId) {
        throw new Error('Köməkçi yeni söhbət üçün sessionId qaytarmadı.')
      }
      const assistantMessage: ChatMessage = { id: newId(), role: 'assistant', content: reply.content, contentType: reply.contentType, actions: reply.actions, createdAt: now() }
      updateSession(chat.id, current => ({
        ...current,
        backendSessionId: current.backendSessionId ?? reply.sessionId,
        updatedAt: assistantMessage.createdAt,
        messages: [...current.messages, assistantMessage],
      }))
    } catch (cause) {
      if ((cause as Error).name !== 'AbortError' && identityGeneration.current === startedForIdentity) {
        const messageText = (cause as Error).message || 'Mesaj göndərilə bilmədi.'
        setError({ sessionId: chat.id, message: messageText }); setRetry({ sessionId: chat.id, message })
      }
    } finally {
      updateSession(chat.id, current => ({ ...current, isPending: false }))
      if (requestRef.current === controller) { requestRef.current = null; setPending(false); setPendingSessionId(null) }
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() } }
  const closeChat = () => { requestRef.current?.abort(); setOpen(false) }
  const activeError = error?.sessionId === activeId ? error : null
  const isAuthenticated = Boolean(userId)

  return <div className="chatbot-root">
    <AnimatePresence>
      {open && <motion.section className="chatbot-panel" role="dialog" aria-modal="true" aria-label="Sinapsmed AI köməkçisi" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .18 }}>
        <header className="chatbot-header"><div><p className="chatbot-eyebrow">SINAPSMED</p><h2>AI Köməkçi</h2><span><i /> {isAuthenticated ? 'Hesabınızla bağlı' : 'Qonaq rejimi'}</span></div><button onClick={closeChat} aria-label="Söhbəti bağla"><FontAwesomeIcon icon={faTimes} /></button></header>
        <div className="chatbot-main">
          <aside className="chatbot-sidebar" aria-label="Söhbətlər">
            <button className="chatbot-new" onClick={createSession}><FontAwesomeIcon icon={faPlus} /> Yeni söhbət</button>
            {sessions.map(chat => <button key={chat.id} className={chat.id === activeId ? 'active' : ''} onClick={() => { setActiveId(chat.id); setError(null); setRetry(null) }} aria-current={chat.id === activeId ? 'page' : undefined}><span>{chat.title}</span></button>)}
          </aside>
          <div className="chatbot-conversation">
            {!active?.messages.length ? <Welcome onSelect={text => submit(text)} /> : <div className="chatbot-messages">{active.messages.map(message => <article key={message.id} className={`chatbot-message ${message.role}`}><div className="chatbot-avatar">{message.role === 'assistant' ? 'S' : 'Siz'}</div><div className="chatbot-bubble"><ChatMessageRenderer content={message.content} contentType={message.contentType} /></div></article>)}{pendingSessionId === activeId && <div className="chatbot-typing" aria-label="Köməkçi yazır"><span /><span /><span /></div>}{activeError && retry && <div className="chatbot-error"><FontAwesomeIcon icon={faTriangleExclamation} /><span>{activeError.message}</span><button onClick={() => submit(retry.message, retry.sessionId)} disabled={pending}><FontAwesomeIcon icon={faRotateRight} /> Təkrar sına</button></div>}<div ref={endRef} /></div>}
            <form className="chatbot-input" onSubmit={(event: FormEvent) => { event.preventDefault(); submit() }}><textarea ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={onKeyDown} placeholder="Mesajınızı yazın..." aria-label="Mesajınız" rows={1} maxLength={6000} disabled={pending} /><button type="submit" aria-label="Mesajı göndər" disabled={!draft.trim() || pending}><FontAwesomeIcon icon={faArrowUp} /></button><small>Enter göndərir · Shift + Enter yeni sətir</small></form>
          </div>
        </div>
        <footer className="chatbot-disclaimer">Məlumat xarakterlidir, həkim məsləhətini əvəz etmir.</footer>
      </motion.section>}
    </AnimatePresence>
    <button className="chatbot-launcher" onClick={() => open ? closeChat() : setOpen(true)} aria-label={open ? 'AI köməkçini bağla' : 'AI köməkçini aç'} aria-expanded={open}><FontAwesomeIcon icon={open ? faTimes : faCommentMedical} /></button>
  </div>
}

function Welcome({ onSelect }: { onSelect: (text: string) => void }) {
  return <div className="chatbot-welcome"><div className="chatbot-welcome-icon"><FontAwesomeIcon icon={faCommentMedical} /></div><h3>Sinapsmed-ə xoş gəlmisiniz</h3><p>Həkim, randevu və xidmətlər haqqında məlumat almağa kömək edəcəyəm.</p><div>{suggestions.map(question => <button key={question} onClick={() => onSelect(question)}>{question}</button>)}</div></div>
}
