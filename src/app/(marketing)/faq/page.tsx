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
            <h2 className="text-lg font-bold tracking-tight text-brand">
              {category}
            </h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {listFaqByCategory(category).map((item) => (
                <li key={item.question}>
                  <details className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-muted transition-transform group-open:rotate-45"
                      >
                        ＋
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
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
