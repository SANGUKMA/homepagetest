/**
 * 숫자 강조 항목. 참고 디자인의 `4x ↑` · `70% ↑` 형식이다.
 *
 * 숫자는 세리프로 크게, 설명은 작게 둔다. 화살표는 장식이므로 스크린리더에서 뺀다.
 */
type StatProps = {
  value: string
  label: string
  /** 상승을 나타내는 화살표를 붙일지 */
  trend?: boolean
}

export function Stat({ value, label, trend = false }: StatProps) {
  return (
    <div>
      <p className="flex items-start gap-1 font-display text-4xl font-bold text-brand">
        {value}
        {trend ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="mt-1 h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12 12 4" />
            <path d="M6 4h6v6" />
          </svg>
        ) : null}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  )
}
