import type { Metadata } from 'next'

import { InquiryCta } from '@/components/inquiry-cta'
import { PageHeader } from '@/components/page-header'
import { FAQ_CATEGORIES, listFaqByCategory } from '@/lib/content/faq'

const TITLE = '자주 묻는 질문'
const DESCRIPTION =
  '문의가 많은 내용을 모았습니다. 찾는 답이 없다면 문의를 남겨 주세요.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
}

/**
 * FAQ (PRD FR-11).
 *
 * 펼침/접힘은 `<details>` 로 처리해 클라이언트 자바스크립트 없이 동작한다
 * (CLAUDE.md §7 — 기본은 Server Component).
 */
export default function FaqPage() {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {FAQ_CATEGORIES.map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <h2 className="font-display text-lg font-bold text-brand">
              {category}
            </h2>
            <ul className="mt-5 space-y-3">
              {listFaqByCategory(category).map((item) => (
                <li key={item.question}>
                  <details className="group rounded-2xl border border-border px-6 py-5 open:border-brand/40 open:bg-brand-surface/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                      {item.question}
                      {/* 원본 디자인의 원형 화살표 버튼 */}
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand text-brand transition-transform group-open:rotate-180"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m4 6 4 4 4-4" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <InquiryCta
        title="찾는 답이 없으신가요?"
        description="궁금한 점을 남겨 주시면 담당자가 직접 안내드립니다."
      />
    </>
  )
}
