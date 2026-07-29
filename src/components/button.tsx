import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/**
 * 버튼 모양을 한곳에서 관리한다. 링크는 `ButtonLink`, 폼 제출 버튼은
 * `buttonClasses()` 를 className 으로 쓴다.
 *
 * 참고 디자인의 규칙 — **주요 행동은 코랄, 보조는 파란 테두리**다.
 * 파란 면 위에서는 두 색 다 묻히므로 `onBrand` 를 쓴다.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'onBrand' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-strong',
  secondary:
    'border border-brand bg-background text-brand hover:bg-brand-surface',
  onBrand:
    'border border-brand-foreground/50 text-brand-foreground hover:bg-brand-foreground/10',
  ghost: 'text-brand hover:bg-brand-surface',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [BASE, VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(' ')
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  )
}

/** 버튼 안 화살표. 참고 디자인의 버튼은 대부분 이 아이콘을 달고 있다. */
export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9" />
      <path d="M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  )
}
