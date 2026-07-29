import type { Metadata } from 'next'

import { InquiryCta } from '@/components/inquiry-cta'
import { PageHeader } from '@/components/page-header'
import { ProgramCard } from '@/components/program-card'
import { listPrograms } from '@/lib/content/programs'

const TITLE = '학위과정'
const DESCRIPTION =
  '학위과정과 단기 수료과정을 함께 운영합니다. 목표와 가용 시간에 맞는 과정을 선택하세요.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
}

/** 과정 목록 (PRD FR-2). 콘텐츠는 정적 관리 — `programs` 테이블은 만들지 않는다. */
export default function ProgramsPage() {
  const programs = listPrograms()

  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <InquiryCta />
    </>
  )
}
