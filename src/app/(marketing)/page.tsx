import { ButtonLink } from '@/components/button'
import { InquiryCta } from '@/components/inquiry-cta'
import { ProgramCard } from '@/components/program-card'
import { ADMISSIONS } from '@/lib/content/admissions'
import { HOME } from '@/lib/content/pages'
import { listPrograms } from '@/lib/content/programs'

/** 홈 — 탐색 진입점이자 전환 허브 (PRD §7 · 설계 문서 §02 Flow A). */
export default function HomePage() {
  const programs = listPrograms()

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold text-brand">
            {HOME.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl whitespace-pre-line text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {HOME.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {HOME.hero.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/inquiry" size="lg">
              {HOME.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="/programs" size="lg" variant="secondary">
              {HOME.hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {HOME.features.title}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{HOME.features.description}</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {HOME.features.items.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-border p-6"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {HOME.programs.title}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                {HOME.programs.description}
              </p>
            </div>
            <ButtonLink href="/programs" variant="ghost">
              {HOME.programs.allLink}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {HOME.admissions.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              {HOME.admissions.description}
            </p>
          </div>
          <ButtonLink href="/admissions" variant="ghost">
            {HOME.admissions.detailLink}
          </ButtonLink>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ADMISSIONS.schedule.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border p-5"
            >
              <p className="text-sm font-semibold text-brand">{item.period}</p>
              <p className="mt-2 font-medium">{item.title}</p>
              {item.note ? (
                <p className="mt-1 text-xs text-muted">{item.note}</p>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted">{ADMISSIONS.scheduleNotice}</p>
      </section>

      <InquiryCta />
    </>
  )
}
