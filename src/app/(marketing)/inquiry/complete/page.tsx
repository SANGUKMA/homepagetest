import type { Metadata } from 'next'

import { ButtonLink } from '@/components/button'
import { INQUIRY_COMPLETE } from '@/lib/content/strings'

export const metadata: Metadata = {
  title: INQUIRY_COMPLETE.title,
  description: INQUIRY_COMPLETE.description,
  // 접수 완료 화면은 검색 결과에 노출될 이유가 없다.
  robots: { index: false, follow: false },
}

/** 접수 완료 안내 (PRD FR-5). 문의 내용은 다시 보여주지 않는다(개인정보). */
export default function InquiryCompletePage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface text-2xl text-brand"
      >
        ✓
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        {INQUIRY_COMPLETE.title}
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        {INQUIRY_COMPLETE.description}
      </p>
      <p className="mt-2 text-sm text-muted">{INQUIRY_COMPLETE.notice}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          {INQUIRY_COMPLETE.backHome}
        </ButtonLink>
        <ButtonLink href="/programs" size="lg" variant="secondary">
          {INQUIRY_COMPLETE.viewPrograms}
        </ButtonLink>
      </div>
    </section>
  )
}
