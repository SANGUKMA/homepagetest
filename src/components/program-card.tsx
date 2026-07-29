import Link from 'next/link'

import type { Program } from '@/lib/content/programs'
import { COMMON } from '@/lib/content/strings'

/** 과정 목록·홈에서 함께 쓰는 과정 카드. */
export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-brand">
      <p className="text-xs font-semibold text-brand">{program.degree}</p>
      <h3 className="mt-2 text-xl font-bold tracking-tight">
        <Link href={`/programs/${program.slug}`} className="hover:text-brand">
          {program.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{program.tagline}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
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
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand"
      >
        {COMMON.learnMore}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
