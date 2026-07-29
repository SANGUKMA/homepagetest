import type { MetadataRoute } from 'next'

import { listPrograms } from '@/lib/content/programs'
import { LEGAL_NAV, MAIN_NAV, getSiteUrl } from '@/lib/content/site'

/** 공개 페이지 sitemap (PRD §9 SEO). 관리자·접수 완료 화면은 넣지 않는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()

  const staticPaths = [
    '/',
    ...MAIN_NAV.map((item) => item.href),
    '/inquiry',
    ...LEGAL_NAV.map((item) => item.href),
  ]

  const programPaths = listPrograms().map(
    (program) => `/programs/${program.slug}`,
  )

  return [...staticPaths, ...programPaths].map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
