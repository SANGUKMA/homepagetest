'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/lib/mutations/auth'
import type { FieldErrors } from '@/types/result'

/**
 * 관리자 로그인 Server Action (PRD FR-7).
 *
 * 인증 처리는 `src/lib/mutations/auth` 가 담당한다 (CLAUDE.md §4).
 * 비밀번호는 상태에 담아 돌려주지 않는다 — 실패해도 다시 입력하게 한다.
 */
export type LoginFormState = {
  status: 'idle' | 'error'
  message?: string
  fieldErrors?: FieldErrors
  values?: { email: string }
}

export async function submitLogin(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = formData.get('email')
  const password = formData.get('password')

  const result = await signIn({
    email: typeof email === 'string' ? email : '',
    password: typeof password === 'string' ? password : '',
  })

  if (!result.ok) {
    return {
      status: 'error',
      message: result.message,
      fieldErrors: result.fieldErrors,
      values: { email: typeof email === 'string' ? email : '' },
    }
  }

  redirect('/admin')
}
