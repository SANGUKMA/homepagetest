/**
 * 문의 도메인 공용 타입.
 *
 * 저장 값은 영어 코드로 두고, 화면에 보이는 한국어 라벨은 별도 문자열 계층에서
 * 관리한다 (CLAUDE.md §6).
 */

export const INQUIRY_TYPES = ['admission', 'program', 'other'] as const
export type InquiryType = (typeof INQUIRY_TYPES)[number]

export const INQUIRY_STATUSES = ['new', 'in_progress', 'done'] as const
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number]

/** `src/lib` 밖으로 노출되는 문의 한 건. DB 컬럼명이 아닌 도메인 표현을 쓴다. */
export type Inquiry = {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string | null
  inquiryType: InquiryType
  programSlug: string | null
  privacyConsent: boolean
  message: string
  status: InquiryStatus
}

/** 문의 접수 입력 (검증 통과 후). */
export type InquiryInput = {
  name: string
  email: string
  phone: string | null
  inquiryType: InquiryType
  programSlug: string | null
  message: string
  privacyConsent: true
}
