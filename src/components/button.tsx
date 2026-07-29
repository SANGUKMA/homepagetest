import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/**
 * 버튼 모양을 한곳에서 관리한다. 링크는 `ButtonLink`, 폼 제출 버튼은
 * `buttonClasses()` 를 className 으로 쓴다.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-brand-foreground hover:bg-brand-strong',
  secondary:
    'border border-border bg-background text-foreground hover:bg-surface',
  ghost: 'text-brand hover:bg-brand-surface',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
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
