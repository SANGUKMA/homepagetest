import Link from 'next/link'

import { ADMIN_ENTRY, LEGAL_NAV, MAIN_NAV, SITE } from '@/lib/content/site'

/**
 * 공개 사이트 공통 푸터.
 *
 * 참고 디자인처럼 여백 안에 놓인 둥근 파란 블록이다. 파란 면 위의 보조 텍스트는
 * `text-brand-muted` 를 쓴다 — 흰색을 흐리게(opacity) 쓰면 대비가 무너진다.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand text-brand-foreground">
        <div className="grid gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold">{SITE.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
              {SITE.description}
            </p>
            <p className="mt-6 text-sm text-brand-muted">{SITE.tagline}</p>
          </div>

          <nav aria-label="푸터 메뉴">
            <p className="font-display text-base font-bold">바로가기</p>
            <ul className="mt-4 space-y-3">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-muted hover:text-brand-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/inquiry"
                  className="text-sm text-brand-muted hover:text-brand-foreground"
                >
                  입학·과정 문의
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-display text-base font-bold">문의</p>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-brand-foreground"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.contact.phone.replace(/-/g, '')}`}
                  className="hover:text-brand-foreground"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li>{SITE.contact.hours}</li>
              <li className="leading-relaxed">{SITE.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-foreground/15">
          <div className="flex flex-col gap-3 px-6 py-6 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p>
              © {SITE.name} · 대표 {SITE.org.representative} · 사업자등록번호{' '}
              {SITE.org.registrationNumber}
            </p>
            <ul className="flex flex-wrap gap-4">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={ADMIN_ENTRY.href}
                  className="text-brand-muted/70 hover:text-brand-foreground"
                >
                  {ADMIN_ENTRY.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
