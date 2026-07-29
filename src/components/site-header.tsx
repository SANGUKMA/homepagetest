import Link from 'next/link'

import { MAIN_NAV, SITE } from '@/lib/content/site'
import { COMMON } from '@/lib/content/strings'
import { ArrowIcon, ButtonLink } from '@/components/button'
import { MobileNav } from '@/components/mobile-nav'
import { NavLink } from '@/components/nav-link'

/**
 * 공개 사이트 공통 헤더 (설계 문서 §01).
 *
 * 참고 디자인처럼 테두리 없는 흰 바탕이다. 헤더 아래로 둥근 카드 섹션이 이어져
 * 경계선 없이도 구분이 된다. 문의 CTA 는 항상 노출한다.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="mr-auto flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-display text-sm font-bold text-brand-foreground"
          >
            {SITE.shortName.slice(0, 1)}
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="주 메뉴" className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <ButtonLink href="/inquiry" className="ml-3 hidden md:inline-flex">
          {COMMON.inquiryCta}
          <ArrowIcon />
        </ButtonLink>

        <MobileNav />
      </div>
    </header>
  )
}
