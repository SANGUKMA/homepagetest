/**
 * 체크 아이콘이 붙은 특징 항목. 참고 디자인의 Key Features 형식이다.
 */
type FeatureItemProps = {
  title: string
  description: string
}

function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-brand-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  )
}

export function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <li className="flex gap-4">
      <CheckMark />
      <div>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </li>
  )
}
