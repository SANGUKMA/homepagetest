import type { Metadata } from 'next'

import { InquiryForm } from '@/components/inquiry-form'
import { PageHeader } from '@/components/page-header'
import { listPrograms } from '@/lib/content/programs'
import { SITE } from '@/lib/content/site'
import { INQUIRY_FORM } from '@/lib/content/strings'
import { getTurnstileSiteKey } from '@/lib/spam/turnstile'
import { INQUIRY_TYPES } from '@/types/inquiry'

export const metadata: Metadata = {
  title: INQUIRY_FORM.title,
  description: INQUIRY_FORM.description,
}

type PageProps = {
  searchParams: Promise<{ program?: string; type?: string }>
}

/**
 * 문의 접수 (PRD FR-4 · 1차 전환 지점).
 *
 * 과정 상세에서 `?program=slug` 로 들어오면 해당 과정이 미리 선택된다.
 * 쿼리는 그대로 믿지 않고 알려진 값인지 확인한 뒤에만 쓴다.
 */
export default async function InquiryPage({ searchParams }: PageProps) {
  const { program, type } = await searchParams

  const programs = listPrograms().map(({ slug, name }) => ({ slug, name }))
  const selectedProgram =
    program && programs.some((item) => item.slug === program) ? program : ''
  const selectedType =
    type && (INQUIRY_TYPES as readonly string[]).includes(type)
      ? type
      : selectedProgram
        ? 'program'
        : 'admission'

  return (
    <>
      <PageHeader
        title={INQUIRY_FORM.title}
        description={INQUIRY_FORM.description}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <InquiryForm
          defaultValues={{
            name: '',
            email: '',
            phone: '',
            inquiryType: selectedType,
            programSlug: selectedProgram,
            message: '',
            privacyConsent: false,
          }}
          programs={programs}
          turnstileSiteKey={getTurnstileSiteKey()}
        />

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-semibold">전화·이메일 문의</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            폼 작성이 어려우시면 아래로 연락 주셔도 됩니다.
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-muted">이메일</dt>
              <dd className="mt-1 font-medium">
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-brand"
                >
                  {SITE.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">전화</dt>
              <dd className="mt-1 font-medium">
                <a
                  href={`tel:${SITE.contact.phone.replace(/-/g, '')}`}
                  className="hover:text-brand"
                >
                  {SITE.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">운영 시간</dt>
              <dd className="mt-1 font-medium">{SITE.contact.hours}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </>
  )
}
