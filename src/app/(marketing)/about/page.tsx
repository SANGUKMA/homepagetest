import type { Metadata } from 'next'

import { InquiryCta } from '@/components/inquiry-cta'
import { PageHeader } from '@/components/page-header'
import { ABOUT } from '@/lib/content/pages'
import { SITE } from '@/lib/content/site'

export const metadata: Metadata = {
  title: ABOUT.title,
  description: ABOUT.description,
}

/** 소개 — 기관·파트너십·비전·오시는 길 (PRD FR-1). */
export default function AboutPage() {
  return (
    <>
      <PageHeader title={ABOUT.title} description={ABOUT.description} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {ABOUT.mission.title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4">
          {ABOUT.mission.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            {ABOUT.partnership.title}
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            {ABOUT.partnership.description}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {ABOUT.partnership.items.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {ABOUT.vision.title}
        </h2>
        <ol className="mt-8 space-y-6 border-l border-border pl-6">
          {ABOUT.vision.items.map((item) => (
            <li key={item.year} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand"
              />
              <p className="text-sm font-semibold text-brand">{item.year}</p>
              <p className="mt-1 font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            {ABOUT.location.title}
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            {ABOUT.location.description}
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">
                {ABOUT.location.addressLabel}
              </dt>
              <dd className="mt-1 font-medium">{SITE.contact.address}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">
                {ABOUT.location.hoursLabel}
              </dt>
              <dd className="mt-1 font-medium">{SITE.contact.hours}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">
                {ABOUT.location.contactLabel}
              </dt>
              <dd className="mt-1 font-medium">
                {SITE.contact.phone} · {SITE.contact.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <InquiryCta />
    </>
  )
}
