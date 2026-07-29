import Link from 'next/link'

import { MAIN_NAV, SITE } from '@/lib/content/site'
import { COMMON } from '@/lib/content/strings'
import { ButtonLink } from '@/components/button'
import { MobileNav } from '@/components/mobile-nav'
import { NavLink } from '@/components/nav-link'

/** 공개 사이트 공통 헤더. 문의 CTA 를 항상 노출한다 (설계 문서 §01). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground"
          >
            {SITE.shortName.slice(0, 1)}
          </span>
          {SITE.name}
        </Link>

        <nav aria-label="주 메뉴" className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <ButtonLink href="/inquiry" className="ml-2 hidden md:inline-flex">
          {COMMON.inquiryCta}
        </ButtonLink>

        <MobileNav />
      </div>
    </header>
  )
}
