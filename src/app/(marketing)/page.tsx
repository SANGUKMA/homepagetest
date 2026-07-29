import Link from 'next/link'

import { ArrowIcon, ButtonLink } from '@/components/button'
import { FeatureItem } from '@/components/feature-item'
import { InquiryCta } from '@/components/inquiry-cta'
import { ProgramCard } from '@/components/program-card'
import { SectionHeading } from '@/components/section-heading'
import { Stat } from '@/components/stat'
import { ADMISSIONS } from '@/lib/content/admissions'
import { HOME } from '@/lib/content/pages'
import { listPrograms } from '@/lib/content/programs'

/** 홈 — 탐색 진입점이자 전환 허브 (PRD §7 · 설계 문서 §02 Flow A). */
export default function HomePage() {
  const programs = listPrograms()

  return (
    <>
      {/* 히어로 — 여백 안에 놓인 둥근 파란 카드 */}
      <section className="px-4 pt-2 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand text-brand-foreground">
          <div className="grid gap-12 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-mint">
                {HOME.hero.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.25] sm:text-5xl">
                {HOME.hero.title.split('\n').map((line, index) => (
                  <span key={line} className="block">
                    {index === 0 ? (
                      <span className="font-semibold text-brand-muted">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-lg leading-relaxed text-brand-muted">
                {HOME.hero.description}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/inquiry" size="lg">
                  {HOME.hero.primaryCta}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/programs" size="lg" variant="onBrand">
                  {HOME.hero.secondaryCta}
                </ButtonLink>
              </div>
            </div>

            {/*
              원본 디자인은 이 자리에 사진을 겹쳐 쌓았다. 사진이 없으므로 같은
              '카드 스택' 인상을 과정 목록으로 만든다 — 장식이 아니라 내용이 된다.
            */}
            <ul className="space-y-3 lg:pl-6">
              {programs.map((program, index) => (
                <li
                  key={program.slug}
                  className={
                    index === 0
                      ? 'rounded-2xl bg-brand-foreground/15 p-5 lg:-translate-x-4'
                      : index === 1
                        ? 'rounded-2xl bg-brand-foreground/10 p-5'
                        : 'rounded-2xl bg-brand-foreground/5 p-5 lg:translate-x-4'
                  }
                >
                  <Link href={`/programs/${program.slug}`} className="block">
                    <p className="text-xs text-mint">{program.degree}</p>
                    <p className="mt-1.5 font-display text-lg font-bold">
                      {program.name}
                    </p>
                    <p className="mt-1 text-sm text-brand-muted">
                      {program.duration} · {program.credits}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 특징 */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="핵심 특징"
          title={HOME.features.title}
          description={HOME.features.description}
        />
        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {HOME.features.items.map((feature) => (
            <FeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </section>

      {/* 숫자 — 회색 밴드로 섹션을 끊는다 */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="한눈에 보기"
            title={HOME.stats.title}
            description={HOME.stats.description}
          />
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOME.stats.items.map((item) => (
              <Stat
                key={item.label}
                value={item.value}
                label={item.label}
                trend={item.trend}
              />
            ))}
          </dl>
        </div>
      </section>

      {/* 과정 */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="학위과정"
          title={HOME.programs.title}
          description={HOME.programs.description}
          action={
            <ButtonLink href="/programs" variant="secondary">
              {HOME.programs.allLink}
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      {/* 입학 일정 */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="입학"
            title={HOME.admissions.title}
            description={HOME.admissions.description}
            action={
              <ButtonLink href="/admissions" variant="secondary">
                {HOME.admissions.detailLink}
              </ButtonLink>
            }
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ADMISSIONS.schedule.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <p className="text-sm font-medium text-accent">
                  {item.period}
                </p>
                <p className="mt-2 font-display font-bold text-ink">
                  {item.title}
                </p>
                {item.note ? (
                  <p className="mt-1 text-xs text-muted">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-muted">{ADMISSIONS.scheduleNotice}</p>
        </div>
      </section>

      <InquiryCta />
    </>
  )
}
