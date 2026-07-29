import Link from 'next/link'

import { signOutAction } from '@/app/(admin)/actions'
import { ADMIN } from '@/lib/content/strings'
import { SITE } from '@/lib/content/site'

/** 관리자 영역 헤더. 공개 사이트 헤더와 구분되도록 다른 배경을 쓴다. */
export function AdminHeader({ email }: { email: string | null }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/admin" className="font-display font-bold">
          {SITE.shortName} <span className="text-muted">·</span> {ADMIN.title}
        </Link>

        <nav aria-label={ADMIN.navLabel} className="ml-auto flex items-center gap-4">
          {email ? (
            <span className="hidden text-sm text-muted sm:inline">{email}</span>
          ) : null}
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground"
          >
            {ADMIN.viewSite}
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-surface-strong"
            >
              {ADMIN.signOut}
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
