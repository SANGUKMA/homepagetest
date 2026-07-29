'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { INQUIRY_FORM } from '@/lib/content/strings'
import { sendInquiryNotification } from '@/lib/email/inquiry-notification'
import { createInquiry } from '@/lib/mutations/inquiries'
import { verifyTurnstileToken } from '@/lib/spam/turnstile'
import { HONEYPOT_FIELD } from '@/lib/validators/inquiry'
import type { FieldErrors } from '@/types/result'

/**
 * 문의 접수 Server Action (PRD FR-4).
 *
 * 이 파일은 흐름만 조립한다. 검증·DB·외부 API 는 전부 `src/lib` 함수가 담당한다
 * (CLAUDE.md §4). 클라이언트 검증은 신뢰하지 않고 서버에서 항상 다시 검증한다
 * (CLAUDE.md §5) — 재검증은 `createInquiry` 안에서 일어난다.
 */

/** 검증 실패 시 화면에 되돌려 줄 입력값. 사용자가 다시 타이핑하지 않게 한다. */
export type InquiryFormValues = {
  name: string
  email: string
  phone: string
  inquiryType: string
  programSlug: string
  message: string
  privacyConsent: boolean
}

export type InquiryFormState = {
  status: 'idle' | 'error'
  message?: string
  fieldErrors?: FieldErrors
  values?: InquiryFormValues
}

function readValues(formData: FormData): InquiryFormValues {
  const text = (key: string) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value : ''
  }

  return {
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    inquiryType: text('inquiryType'),
    programSlug: text('programSlug'),
    message: text('message'),
    privacyConsent: formData.get('privacyConsent') === 'on',
  }
}

/** 프록시를 거친 요청의 원 IP. Turnstile 검증에 함께 보낸다(선택 항목). */
async function getClientIp(): Promise<string | undefined> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || undefined
}

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const values = readValues(formData)

  // 1) 허니팟 — 사람에게는 보이지 않는 필드다. 값이 있으면 봇으로 본다.
  //    봇이 실패를 학습하지 못하도록 오류를 알리지 않고 조용히 버린다 (FR-12).
  const honeypot = formData.get(HONEYPOT_FIELD)
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    console.warn('[inquiry] 허니팟에 값이 있어 접수를 버립니다.')
    redirect('/inquiry/complete')
  }

  // 2) Turnstile — 키가 설정된 환경에서만 실제 검증이 일어난다.
  const turnstile = await verifyTurnstileToken(
    formData.get('cf-turnstile-response'),
    await getClientIp(),
  )
  if (turnstile.status === 'rejected') {
    return {
      status: 'error',
      message: INQUIRY_FORM.errors.turnstile,
      values,
    }
  }

  // 3) 서버 재검증 + 저장. zod 검증은 mutations 계층 안에서 이뤄진다.
  const result = await createInquiry({
    name: values.name,
    email: values.email,
    phone: values.phone,
    inquiryType: values.inquiryType,
    programSlug: values.programSlug,
    message: values.message,
    privacyConsent: values.privacyConsent,
  })

  if (!result.ok) {
    return {
      status: 'error',
      message: result.message,
      fieldErrors: result.fieldErrors,
      values,
    }
  }

  // 4) 관리자 알림 (FR-10). 이미 접수는 끝났으므로 실패해도 사용자 흐름을 막지 않는다.
  await sendInquiryNotification({
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone,
    inquiryType: result.data.inquiryType,
    programSlug: result.data.programSlug,
    message: result.data.message,
  })

  redirect('/inquiry/complete')
}
