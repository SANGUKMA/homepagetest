import type { Metadata } from 'next'

import { InquiryCta } from '@/components/inquiry-cta'
import { PageHeader } from '@/components/page-header'
import { ADMISSIONS } from '@/lib/content/admissions'

export const metadata: Metadata = {
  title: ADMISSIONS.title,
  description: ADMISSIONS.description,
}

/** 입학 안내 — 모집요강·전형절차·일정·장학 (PRD FR-3). */
export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        title={ADMISSIONS.title}
        description={ADMISSIONS.description}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">지원 자격</h2>
            <ul className="mt-5 space-y-3">
              {ADMISSIONS.eligibility.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-0.5 text-brand">
                    ✓
                  </span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">제출 서류</h2>
            <ul className="mt-5 space-y-3">
              {ADMISSIONS.documents.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-0.5 text-brand">
                    ✓
                  </span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">전형 절차</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {ADMISSIONS.steps.map((step) => (
              <li
                key={step.order}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface text-sm font-bold text-brand">
                  {step.order}
                </span>
                <p className="mt-3 font-semibold">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">모집 일정</h2>
        <table className="mt-8 w-full border-collapse text-left text-sm">
          <caption className="sr-only">1학기 기준 모집 일정</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-3 pr-4 font-semibold">
                시기
              </th>
              <th scope="col" className="py-3 font-semibold">
                일정
              </th>
            </tr>
          </thead>
          <tbody>
            {ADMISSIONS.schedule.map((item) => (
              <tr key={item.title} className="border-b border-border">
                <td className="w-40 py-4 pr-4 align-top font-medium text-brand">
                  {item.period}
                </td>
                <td className="py-4 align-top">
                  {item.title}
                  {item.note ? (
                    <span className="ml-2 text-xs text-muted">
                      ({item.note})
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-muted">{ADMISSIONS.scheduleNotice}</p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">장학 제도</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ADMISSIONS.scholarships.map((scholarship) => (
              <div
                key={scholarship.name}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h3 className="font-semibold">{scholarship.name}</h3>
                <p className="mt-3 text-sm font-medium text-brand">
                  {scholarship.benefit}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {scholarship.requirement}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            {ADMISSIONS.scholarshipNotice}
          </p>
        </div>
      </section>

      <InquiryCta />
    </>
  )
}
