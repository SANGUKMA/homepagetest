'use client'

import { useState } from 'react'
import Link from 'next/link'

import { MAIN_NAV } from '@/lib/content/site'
import { COMMON } from '@/lib/content/strings'
import { NavLink } from '@/components/nav-link'
import { buttonClasses } from '@/components/button'

/** 모바일 헤더 메뉴. 열고 닫는 상태 때문에만 클라이언트 컴포넌트다. */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground"
      >
        <span className="sr-only">{open ? '메뉴 닫기' : '메뉴 열기'}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <path d="M5 5l10 10" />
              <path d="M15 5L5 15" />
            </>
          ) : (
            <>
              <path d="M3 6h14" />
              <path d="M3 10h14" />
              <path d="M3 14h14" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-18 border-b border-border bg-background px-4 pb-4 shadow-sm"
        >
          <nav aria-label="주 메뉴" className="flex flex-col py-2">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                className="py-3 text-base"
                onNavigate={close}
              />
            ))}
          </nav>
          <Link
            href="/inquiry"
            onClick={close}
            className={buttonClasses('primary', 'md', 'w-full')}
          >
            {COMMON.inquiryCta}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
