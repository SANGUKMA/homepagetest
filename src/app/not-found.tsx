import Link from 'next/link'

import { ButtonLink } from '@/components/button'
import { MAIN_NAV } from '@/lib/content/site'
import { NOT_FOUND } from '@/lib/content/strings'

/**
 * 404. 라우트 그룹 밖이라 공개 레이아웃(헤더·푸터)이 붙지 않으므로
 * 주요 메뉴 링크를 여기에 직접 둔다.
 */
export default function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {NOT_FOUND.title}
      </h1>
      <p className="mt-4 text-muted">{NOT_FOUND.description}</p>

      <div className="mt-10">
        <ButtonLink href="/" size="lg">
          {NOT_FOUND.backHome}
        </ButtonLink>
      </div>

      <nav aria-label="주 메뉴" className="mt-10 flex flex-wrap justify-center gap-4">
        {MAIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  )
}
