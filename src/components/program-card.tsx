import Link from 'next/link'

import type { Program } from '@/lib/content/programs'
import { COMMON } from '@/lib/content/strings'

/**
 * 과정 카드. 참고 디자인의 후기 카드와 같은 결 — 흰 바탕에 얇은 테두리,
 * 큰 라운드, 제목은 세리프.
 */
export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-7 transition-colors hover:border-brand">
      <p className="text-xs font-medium text-accent">{program.degree}</p>
      <h3 className="mt-3 font-display text-xl font-bold text-ink">
        <Link href={`/programs/${program.slug}`} className="hover:text-brand">
          {program.name}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {program.tagline}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-sm">
        <div>
          <dt className="text-xs text-muted">수업 기간</dt>
          <dd className="mt-1 font-medium">{program.duration}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">이수 학점</dt>
          <dd className="mt-1 font-medium">{program.credits}</dd>
        </div>
      </dl>

      <Link
        href={`/programs/${program.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5"
      >
        {COMMON.learnMore}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
