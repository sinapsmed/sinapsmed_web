import { aiPages } from '@/libs/ai-pages'
import { localePrefix, locales } from '@/navigation'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

/** Public, read-only navigation data for the AI integration. */
export function GET() {
  return NextResponse.json({
    success: true,
    data: {
      localePrefix,
      defaultLocale: 'az',
      locales,
      pages: aiPages,
    },
  }, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  })
}
