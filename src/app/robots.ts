import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/content/site'

/** 관리자 영역(M3)과 접수 완료 화면은 색인 대상이 아니다. */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/inquiry/complete'],
    },
    sitemap: new URL('/sitemap.xml', base).toString(),
  }
}
