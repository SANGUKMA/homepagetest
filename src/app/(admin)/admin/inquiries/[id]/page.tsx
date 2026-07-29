import Link from 'next/link'
import { notFound } from 'next/navigation'

import { InquiryStatusBadge } from '@/components/inquiry-status-badge'
import { InquiryStatusForm } from '@/components/inquiry-status-form'
import { getProgram } from '@/lib/content/programs'
import { ADMIN, INQUIRY_TYPE_LABELS } from '@/lib/content/strings'
import { formatDateTime } from '@/lib/format'
import { getInquiry } from '@/lib/queries/inquiries'
import { inquiryIdSchema } from '@/lib/validators/inquiry'

type PageProps = {
  params: Promise<{ id: string }>
}

/** 문의 상세 + 상태 변경 (PRD FR-9). */
export default async function InquiryDetailPage({ params }: PageProps) {
  const { id } = await params

  // 형식이 어긋난 id 는 조회하지 않고 404 로 처리한다. 그대로 넘기면
  // 스키마가 예외를 던져 오류 화면이 뜬다.
  if (!inquiryIdSchema.safeParse(id).success) {
    notFound()
  }

  const inquiry = await getInquiry(id)

  if (!inquiry) {
    notFound()
  }

  const programName = inquiry.programSlug
    ? (getProgram(inquiry.programSlug)?.name ?? inquiry.programSlug)
    : ADMIN.detail.noProgram

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/admin" className="text-sm text-muted hover:text-foreground">
        ← {ADMIN.detail.back}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">
          {ADMIN.detail.title}
        </h1>
        <InquiryStatusBadge status={inquiry.status} />
      </div>

      <section className="mt-8 rounded-2xl border border-border p-6">
        <h2 className="text-sm font-semibold text-muted">
          {ADMIN.detail.contact}
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted">이름</dt>
            <dd className="mt-1 font-medium">{inquiry.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">이메일</dt>
            <dd className="mt-1 font-medium">
              <a
                href={`mailto:${inquiry.email}`}
                className="text-brand hover:underline"
              >
                {inquiry.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">연락처</dt>
            <dd className="mt-1 font-medium">
              {inquiry.phone ?? ADMIN.detail.noPhone}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">
              {ADMIN.detail.consent}
            </dt>
            <dd className="mt-1 font-medium">
              {inquiry.privacyConsent ? ADMIN.detail.consentGiven : '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-6">
        <h2 className="text-sm font-semibold text-muted">
          {ADMIN.detail.meta}
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted">접수일</dt>
            <dd className="mt-1 font-medium">
              {formatDateTime(inquiry.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">문의 유형</dt>
            <dd className="mt-1 font-medium">
              {INQUIRY_TYPE_LABELS[inquiry.inquiryType]}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">관심 과정</dt>
            <dd className="mt-1 font-medium">{programName}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-6">
        <h2 className="text-sm font-semibold text-muted">
          {ADMIN.detail.content}
        </h2>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed">
          {inquiry.message}
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-6">
        <InquiryStatusForm id={inquiry.id} current={inquiry.status} />
      </section>
    </div>
  )
}
