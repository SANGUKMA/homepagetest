import { PageHeader } from '@/components/page-header'
import type { LegalDocument as LegalDocumentContent } from '@/lib/content/legal'
import { SITE } from '@/lib/content/site'

/** 개인정보처리방침·이용약관 공통 레이아웃 (PRD FR-6 · FR-15). */
export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  return (
    <>
      <PageHeader title={document.title} description={document.description} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="rounded-lg bg-surface px-4 py-3 text-sm text-muted">
          {document.draftNotice}
        </p>
        <p className="mt-4 text-sm text-muted">
          시행일 · {document.effectiveDate}
        </p>

        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-bold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="text-brand">
                        ·
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border p-6 text-sm">
          <p className="font-semibold">문의처</p>
          <ul className="mt-3 space-y-1 text-muted">
            <li>개인정보 보호책임자 · {SITE.org.privacyOfficer}</li>
            <li>이메일 · {SITE.contact.email}</li>
            <li>전화 · {SITE.contact.phone}</li>
          </ul>
        </div>
      </div>
    </>
  )
}
