import type { ReactNode } from 'react'

/**
 * 폼 필드 한 칸(라벨 · 도움말 · 에러)의 공통 골격.
 *
 * 라벨-입력 연결과 에러 안내를 한곳에서 처리해 접근성을 일정하게 유지한다
 * (PRD §9 접근성).
 */

export const inputClasses =
  'mt-1.5 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-brand focus:outline-none'

export const errorInputClasses = 'border-danger focus:border-danger'

type FormFieldProps = {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
            <span className="sr-only">필수 입력</span>
          </>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
