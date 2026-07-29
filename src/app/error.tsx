'use client'

import { useEffect } from 'react'

import { buttonClasses } from '@/components/button'
import { ERROR_PAGE } from '@/lib/content/strings'

/**
 * 렌더링 중 발생한 오류의 마지막 방어선.
 *
 * 사용자에게는 한국어 안내만 보여주고, 원인은 로그로 남긴다 (CLAUDE.md §7).
 * `error.tsx` 는 클라이언트 컴포넌트여야 한다.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app] 렌더링 오류', error)
  }, [error])

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink">{ERROR_PAGE.title}</h1>
      <p className="mt-4 text-muted">{ERROR_PAGE.description}</p>
      <button
        type="button"
        onClick={reset}
        className={buttonClasses('primary', 'lg', 'mt-10')}
      >
        {ERROR_PAGE.retry}
      </button>
    </section>
  )
}
