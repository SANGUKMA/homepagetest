import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { COMMON } from '@/lib/content/strings'

/** 공개 사이트 공통 레이아웃 (설계 문서 §01). 관리자 영역은 별도 그룹을 쓴다. */
export default function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-brand-foreground"
      >
        {COMMON.skipToContent}
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
