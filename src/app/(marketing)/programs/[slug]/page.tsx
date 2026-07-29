import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { InquiryCta } from '@/components/inquiry-cta'
import { PageHeader } from '@/components/page-header'
import { ButtonLink } from '@/components/button'
import { getProgram, listPrograms } from '@/lib/content/programs'

type PageProps = {
  params: Promise<{ slug: string }>
}

/** 정적 콘텐츠라 빌드 시점에 전부 생성한다. */
export function generateStaticParams() {
  return listPrograms().map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const program = getProgram(slug)

  if (!program) {
    return { title: '과정을 찾을 수 없습니다' }
  }

  return {
    title: program.name,
    description: program.summary,
    openGraph: { title: program.name, description: program.summary },
  }
}

/** 과정 상세 — 커리큘럼·학위·기간·대상 + 문의 CTA (PRD FR-2). */
export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params
  const program = getProgram(slug)

  if (!program) {
    notFound()
  }

  return (
    <>
      <PageHeader
        eyebrow={program.degree}
        title={program.name}
        description={program.tagline}
      >
        <div className="mt-8">
          <ButtonLink href={`/inquiry?program=${program.slug}`} size="lg">
            이 과정 문의하기
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <dl className="grid gap-6 rounded-2xl border border-border p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm text-muted">취득 학위</dt>
            <dd className="mt-1 font-semibold">{program.degree}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">수업 기간</dt>
            <dd className="mt-1 font-semibold">{program.duration}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">이수 학점</dt>
            <dd className="mt-1 font-semibold">{program.credits}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">수업 방식</dt>
            <dd className="mt-1 font-semibold">{program.format}</dd>
          </div>
        </dl>

        <p className="mt-10 max-w-3xl leading-relaxed text-muted">
          {program.summary}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight">이런 분께 맞습니다</h2>
            <ul className="mt-4 space-y-2">
              {program.audience.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span aria-hidden="true" className="text-brand">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">과정 특징</h2>
            <ul className="mt-4 space-y-2">
              {program.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span aria-hidden="true" className="text-brand">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">커리큘럼</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {program.curriculum.map((term) => (
              <div
                key={term.term}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <p className="text-sm font-semibold text-brand">{term.term}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {term.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">졸업 후 진로</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {program.careers.map((career) => (
            <li
              key={career}
              className="rounded-full bg-brand-surface px-4 py-2 text-sm font-medium text-brand"
            >
              {career}
            </li>
          ))}
        </ul>
      </section>

      <InquiryCta
        programSlug={program.slug}
        title={`${program.name}에 대해 더 알고 싶으신가요?`}
      />
    </>
  )
}
