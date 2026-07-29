/**
 * 알림 메일 문구 (PRD FR-10).
 *
 * 이메일 문구도 한국어로 관리한다 (CLAUDE.md §6). 발송 자체는
 * `src/lib/email/inquiry-notification.ts` 가 담당하고 여기서는 본문만 만든다.
 */

import { INQUIRY_TYPE_LABELS } from '@/lib/content/strings'
import { getProgram } from '@/lib/content/programs'
import type { InquiryType } from '@/types/inquiry'

export type InquiryEmailData = {
  name: string
  email: string
  phone: string | null
  inquiryType: InquiryType
  programSlug: string | null
  message: string
}

export type InquiryEmailContent = {
  subject: string
  text: string
}

/** 관리자에게 보내는 신규 문의 알림. 회신은 문의자 이메일로 하도록 안내한다. */
export function buildInquiryNotificationEmail(
  data: InquiryEmailData,
  options: { adminUrl?: string } = {},
): InquiryEmailContent {
  const typeLabel = INQUIRY_TYPE_LABELS[data.inquiryType]
  const programName = data.programSlug
    ? (getProgram(data.programSlug)?.name ?? data.programSlug)
    : '선택 안 함'

  const lines = [
    `새 문의가 접수되었습니다. (${typeLabel})`,
    '',
    `이름: ${data.name}`,
    `이메일: ${data.email}`,
    `연락처: ${data.phone ?? '미입력'}`,
    `관심 과정: ${programName}`,
    '',
    '문의 내용',
    '─────────────────────────',
    data.message,
    '─────────────────────────',
    '',
    `회신은 ${data.email} 로 보내 주세요.`,
  ]

  if (options.adminUrl) {
    lines.push('', `관리자 화면: ${options.adminUrl}`)
  }

  return {
    subject: `[문의 접수] ${typeLabel} · ${data.name}`,
    text: lines.join('\n'),
  }
}
