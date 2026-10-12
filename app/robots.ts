import { domainLink } from '@/libs/keys'
import type { MetadataRoute } from 'next'
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow:  ['/dashboard','/payment', '/reset', '/cart', '/checkout', '/verify', '/verify-email'],
    },
    sitemap: `${domainLink}/sitemap.xml`,
  }
}