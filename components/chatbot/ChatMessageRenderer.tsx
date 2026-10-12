'use client'

import { useMemo } from 'react'
import DOMPurify from 'dompurify'
import { ChatContentType } from '@/types/chatbot'

interface Props { content: string; contentType: ChatContentType }

const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'code', 'pre', 'blockquote']
const allowedAttributes = ['href', 'colspan', 'rowspan']

export default function ChatMessageRenderer({ content, contentType }: Props) {
  const sanitized = useMemo(() => {
    if (contentType !== 'html') return null
    return sanitizeHtml(content)
  }, [content, contentType])

  if (contentType !== 'html') return <p className="chatbot-plain-text">{content}</p>
  return <div className="chatbot-rich-text" dangerouslySetInnerHTML={{ __html: sanitized || '' }} />
}

/** Only explicit typed HTML reaches this strict, maintained sanitizer. */
function sanitizeHtml(input: string) {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):)/i,
  })
}
