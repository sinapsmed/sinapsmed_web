import { auth } from '@/next-auth/auth'
import { baseApi } from '@/libs/keys'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!baseApi) return NextResponse.json({ success: false, message: 'Chat service is not configured.' }, { status: 503 })

  const body: unknown = await request.json().catch(() => null)
  if (!isRequest(body)) return NextResponse.json({ success: false, message: 'Invalid chat message.' }, { status: 400 })

  // Verified backend route: [Route("api/chat")] + [HttpPost("message")].
  const upstream = await fetch(`${baseApi}/api/chat/message`, {
    method: 'POST',
    headers: {
      // Guest requests deliberately carry no Authorization header. The backend
      // determines whether the session is authenticated or temporary.
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      'Content-Type': 'application/json',
      'Accept-Language': request.headers.get('accept-language') || 'az',
    },
    body: JSON.stringify({ sessionId: body.sessionId, message: body.message }),
    cache: 'no-store',
    signal: request.signal,
  }).catch(() => null)

  if (!upstream) return NextResponse.json({ success: false, message: 'Chat service is unavailable.' }, { status: 502 })
  const responseBody = await upstream.text()
  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
  })
}

function isRequest(value: unknown): value is { sessionId: string; message: string } {
  if (!value || typeof value !== 'object') return false
  const request = value as Record<string, unknown>
  return typeof request.sessionId === 'string' && request.sessionId.length > 0 && request.sessionId.length <= 128
    && typeof request.message === 'string' && request.message.trim().length > 0 && request.message.length <= 6000
}
