import { ArrowIcon, ButtonLink } from '@/components/button'
import { HOME } from '@/lib/content/pages'

/**
 * 문의 유도 배너.
 *
 * 모든 공개 정보 페이지 하단에 넣어 어느 단계에서든 문의로 들어올 수 있게 한다
 * (설계 문서 §02 Flow A · PRD §7).
 *
 * 참고 디자인의 CTA 섹션과 같은 형태 — 둥근 파란 띠에 코랄 버튼 하나.
 */
type InquiryCtaProps = {
  /** 과정 상세에서 진입하면 해당 과정이 폼에 미리 선택된다. */
  programSlug?: string
  title?: string
  description?: string
}

export function InquiryCta({
  programSlug,
  title = HOME.cta.title,
  description = HOME.cta.description,
}: InquiryCtaProps) {
  const href = programSlug ? `/inquiry?program=${programSlug}` : '/inquiry'

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-brand px-6 py-12 text-brand-foreground sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold leading-snug">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted">
            {description}
          </p>
        </div>
        <ButtonLink href={href} size="lg" className="shrink-0">
          {HOME.cta.button}
          <ArrowIcon />
        </ButtonLink>
      </div>
    </section>
  )
}
