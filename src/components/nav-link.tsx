'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * 현재 위치를 표시하는 내비게이션 링크.
 *
 * 경로 비교에만 클라이언트가 필요하므로 이 컴포넌트만 `'use client'` 다
 * (CLAUDE.md §7 — 최소 단위).
 */
type NavLinkProps = {
  href: string
  label: string
  className?: string
  onNavigate?: () => void
}

export function NavLink({ href, label, className = '', onNavigate }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      className={[
        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive ? 'text-brand' : 'text-muted hover:text-foreground',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </Link>
  )
}
