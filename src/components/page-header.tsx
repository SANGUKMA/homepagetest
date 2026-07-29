import type { ReactNode } from 'react'

/**
 * 하위 페이지 상단.
 *
 * 참고 디자인의 히어로를 축소한 형태 — 여백 안에 놓인 둥근 파란 카드다.
 * 페이지마다 같은 리듬을 유지하기 위한 것이므로 여기서 여백을 정하고
 * 각 페이지는 본문만 채운다.
 */
type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="px-4 pt-2 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-brand px-6 py-16 text-brand-foreground sm:px-12 sm:py-20">
        {eyebrow ? (
          <p className="text-sm font-medium text-mint">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl leading-relaxed text-brand-muted">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}
