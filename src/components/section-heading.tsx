import type { ReactNode } from 'react'

/**
 * 밝은 배경 섹션의 제목 묶음.
 *
 * 참고 디자인은 작은 브랜드색 라벨 → 세리프 큰 제목 → 회색 설명 순서를 반복한다.
 * 그 리듬을 한곳에서 관리한다.
 */
type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  /** 제목 오른쪽에 두는 링크·버튼 */
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-sm font-medium text-brand">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
