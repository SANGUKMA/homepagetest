import Link from 'next/link'

import { ADMIN_ENTRY, LEGAL_NAV, MAIN_NAV, SITE } from '@/lib/content/site'

/** 공개 사이트 공통 푸터. 기관 정보와 법적 고지 링크를 담는다. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-bold">{SITE.name}</p>
          <p className="mt-2 text-sm text-muted">{SITE.tagline}</p>
        </div>

        <nav aria-label="푸터 메뉴">
          <p className="text-sm font-semibold">바로가기</p>
          <ul className="mt-3 space-y-2">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/inquiry"
                className="text-sm text-muted hover:text-foreground"
              >
                입학·과정 문의
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">문의</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="hover:text-foreground"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.contact.phone.replace(/-/g, '')}`}
                className="hover:text-foreground"
              >
                {SITE.contact.phone}
              </a>
            </li>
            <li>{SITE.contact.hours}</li>
            <li>{SITE.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {SITE.name} · 대표 {SITE.org.representative} · 사업자등록번호{' '}
            {SITE.org.registrationNumber}
          </p>
          <ul className="flex gap-4">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={ADMIN_ENTRY.href}
                className="text-muted/70 hover:text-foreground"
              >
                {ADMIN_ENTRY.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
