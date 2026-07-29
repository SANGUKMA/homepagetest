'use client'

import Link from 'next/link'
import { useActionState, useMemo, useState, type FormEvent } from 'react'
import { z } from 'zod'

import {
  submitInquiry,
  type InquiryFormState,
  type InquiryFormValues,
} from '@/app/(marketing)/inquiry/actions'
import { buttonClasses } from '@/components/button'
import {
  FormField,
  errorInputClasses,
  inputClasses,
} from '@/components/form-field'
import { TurnstileWidget } from '@/components/turnstile-widget'
import { INQUIRY_FORM, INQUIRY_TYPE_LABELS } from '@/lib/content/strings'
import { HONEYPOT_FIELD, createInquirySchema } from '@/lib/validators/inquiry'
import { INQUIRY_TYPES } from '@/types/inquiry'
import type { FieldErrors } from '@/types/result'

/**
 * 문의 폼 (PRD FR-4 · §6.1).
 *
 * 클라이언트에서 zod 로 먼저 검증해 즉시 안내하고, 제출된 값은 서버가 다시
 * 검증한다 (CLAUDE.md §5). 검증 실패 시 입력값은 그대로 남는다.
 * 데이터 접근은 하지 않는다 — 저장은 Server Action 이 `src/lib` 를 통해 한다.
 */

const INITIAL_STATE: InquiryFormState = { status: 'idle' }

type FieldName = keyof InquiryFormValues

type InquiryFormProps = {
  defaultValues: InquiryFormValues
  programs: { slug: string; name: string }[]
  /** 키가 없으면 위젯을 띄우지 않는다(로컬 개발). 서버 검증도 함께 건너뛴다. */
  turnstileSiteKey: string | null
}

export function InquiryForm({
  defaultValues,
  programs,
  turnstileSiteKey,
}: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    INITIAL_STATE,
  )
  const [values, setValues] = useState<InquiryFormValues>(
    () => state.values ?? defaultValues,
  )
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [attempted, setAttempted] = useState(false)

  const clientErrors: FieldErrors = useMemo(() => {
    const parsed = createInquirySchema.safeParse(values)
    return parsed.success ? {} : z.flattenError(parsed.error).fieldErrors
  }, [values])

  const serverErrors: FieldErrors = state.fieldErrors ?? {}

  function errorFor(field: FieldName): string | undefined {
    if (touched[field] || attempted) {
      const clientError = clientErrors[field]?.[0]
      if (clientError) {
        return clientError
      }
      // 사용자가 고친 필드에는 지난 서버 에러를 계속 띄우지 않는다.
      if (touched[field]) {
        return undefined
      }
    }
    return serverErrors[field]?.[0]
  }

  function update<K extends FieldName>(key: K, value: InquiryFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function markTouched(field: FieldName) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setAttempted(true)
    if (!createInquirySchema.safeParse(values).success) {
      // 서버도 다시 검증하지만, 왕복 없이 바로 안내한다.
      event.preventDefault()
    }
  }

  function fieldProps(field: FieldName, hasHint = false) {
    const error = errorFor(field)
    return {
      error,
      inputClassName: `${inputClasses} ${error ? errorInputClasses : ''}`,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error
        ? `${field}-error`
        : hasHint
          ? `${field}-hint`
          : undefined,
    }
  }

  const name = fieldProps('name')
  const email = fieldProps('email')
  const phone = fieldProps('phone', true)
  const inquiryType = fieldProps('inquiryType')
  const programSlug = fieldProps('programSlug', true)
  const message = fieldProps('message')
  const consent = fieldProps('privacyConsent')

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-6"
    >
      {state.status === 'error' && state.message ? (
        <p
          role="alert"
          className="rounded-lg bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <p className="text-xs text-muted">{INQUIRY_FORM.hints.required}</p>

      <FormField id="name" label={INQUIRY_FORM.labels.name} required error={name.error}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={INQUIRY_FORM.placeholders.name}
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          onBlur={() => markTouched('name')}
          className={name.inputClassName}
          aria-invalid={name['aria-invalid']}
          aria-describedby={name['aria-describedby']}
        />
      </FormField>

      <FormField
        id="email"
        label={INQUIRY_FORM.labels.email}
        required
        error={email.error}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={INQUIRY_FORM.placeholders.email}
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          onBlur={() => markTouched('email')}
          className={email.inputClassName}
          aria-invalid={email['aria-invalid']}
          aria-describedby={email['aria-describedby']}
        />
      </FormField>

      <FormField
        id="phone"
        label={INQUIRY_FORM.labels.phone}
        hint={INQUIRY_FORM.hints.phone}
        error={phone.error}
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={INQUIRY_FORM.placeholders.phone}
          value={values.phone}
          onChange={(event) => update('phone', event.target.value)}
          onBlur={() => markTouched('phone')}
          className={phone.inputClassName}
          aria-invalid={phone['aria-invalid']}
          aria-describedby={phone['aria-describedby']}
        />
      </FormField>

      <FormField
        id="inquiryType"
        label={INQUIRY_FORM.labels.inquiryType}
        required
        error={inquiryType.error}
      >
        <select
          id="inquiryType"
          name="inquiryType"
          value={values.inquiryType}
          onChange={(event) => update('inquiryType', event.target.value)}
          onBlur={() => markTouched('inquiryType')}
          className={inquiryType.inputClassName}
          aria-invalid={inquiryType['aria-invalid']}
          aria-describedby={inquiryType['aria-describedby']}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {INQUIRY_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="programSlug"
        label={INQUIRY_FORM.labels.programSlug}
        hint={INQUIRY_FORM.hints.programSlug}
        error={programSlug.error}
      >
        <select
          id="programSlug"
          name="programSlug"
          value={values.programSlug}
          onChange={(event) => update('programSlug', event.target.value)}
          onBlur={() => markTouched('programSlug')}
          className={programSlug.inputClassName}
          aria-invalid={programSlug['aria-invalid']}
          aria-describedby={programSlug['aria-describedby']}
        >
          <option value="">{INQUIRY_FORM.programPlaceholder}</option>
          {programs.map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="message"
        label={INQUIRY_FORM.labels.message}
        required
        error={message.error}
      >
        <textarea
          id="message"
          name="message"
          rows={7}
          placeholder={INQUIRY_FORM.placeholders.message}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          onBlur={() => markTouched('message')}
          className={`${message.inputClassName} resize-y`}
          aria-invalid={message['aria-invalid']}
          aria-describedby={message['aria-describedby']}
        />
      </FormField>

      <div>
        <div className="flex items-start gap-3 rounded-lg bg-surface px-4 py-3">
          <input
            id="privacyConsent"
            name="privacyConsent"
            type="checkbox"
            checked={values.privacyConsent}
            onChange={(event) => {
              update('privacyConsent', event.target.checked)
              markTouched('privacyConsent')
            }}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
            aria-invalid={consent['aria-invalid']}
            aria-describedby={consent['aria-describedby']}
          />
          <label htmlFor="privacyConsent" className="text-sm">
            {INQUIRY_FORM.labels.privacyConsent}
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
            <span className="mt-1 block text-xs text-muted">
              {INQUIRY_FORM.privacyDetail.prefix}
              <Link href="/privacy" className="underline hover:text-foreground">
                {INQUIRY_FORM.privacyDetail.linkLabel}
              </Link>
              {INQUIRY_FORM.privacyDetail.suffix}
            </span>
          </label>
        </div>
        {consent.error ? (
          <p
            id="privacyConsent-error"
            role="alert"
            className="mt-1.5 text-xs text-danger"
          >
            {consent.error}
          </p>
        ) : null}
      </div>

      {/*
        허니팟 — 사람 눈에는 보이지 않고 스크린리더도 읽지 않는다.
        값이 채워져 오면 서버가 봇으로 보고 버린다 (FR-12).
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={HONEYPOT_FIELD}>회사 홈페이지</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} /> : null}

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}
      >
        {isPending ? INQUIRY_FORM.submitting : INQUIRY_FORM.submit}
      </button>
    </form>
  )
}
