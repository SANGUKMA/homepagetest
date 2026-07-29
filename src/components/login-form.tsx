'use client'

import { useActionState, useState } from 'react'

import { submitLogin, type LoginFormState } from '@/app/login/actions'
import { buttonClasses } from '@/components/button'
import { FormField, inputClasses } from '@/components/form-field'
import { LOGIN } from '@/lib/content/strings'

/** 관리자 로그인 폼 (PRD FR-7). 검증·인증은 서버가 한다. */
const INITIAL_STATE: LoginFormState = { status: 'idle' }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    submitLogin,
    INITIAL_STATE,
  )
  const [email, setEmail] = useState(() => state.values?.email ?? '')

  const emailError = state.fieldErrors?.email?.[0]
  const passwordError = state.fieldErrors?.password?.[0]

  return (
    <form action={formAction} className="space-y-5">
      {state.status === 'error' && state.message ? (
        <p
          role="alert"
          className="rounded-lg bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <FormField id="email" label={LOGIN.labels.email} required error={emailError}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder={LOGIN.placeholders.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClasses}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
      </FormField>

      <FormField
        id="password"
        label={LOGIN.labels.password}
        required
        error={passwordError}
      >
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClasses}
          aria-invalid={passwordError ? true : undefined}
          aria-describedby={passwordError ? 'password-error' : undefined}
        />
      </FormField>

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses('primary', 'lg', 'w-full')}
      >
        {isPending ? LOGIN.submitting : LOGIN.submit}
      </button>
    </form>
  )
}
