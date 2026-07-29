import { z } from 'zod'

import { INQUIRY_STATUSES, INQUIRY_TYPES } from '@/types/inquiry'

/**
 * 문의 관련 zod 스키마.
 *
 * 같은 스키마를 클라이언트와 서버가 함께 쓰되, 서버는 클라이언트 검증을 믿지 않고
 * 항상 다시 검증한다 (CLAUDE.md §5).
 * 에러 메시지는 사용자에게 그대로 노출되므로 한국어로 쓴다 (CLAUDE.md §6).
 */

/** 빈 문자열을 null 로 바꾼다. HTML 폼은 미입력을 '' 로 보낸다. */
const emptyToNull = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? null : value

/**
 * 허니팟 필드 이름. 사람에게는 보이지 않고 봇만 채운다.
 * 값이 있으면 스팸으로 간주한다 (PRD FR-12).
 */
export const HONEYPOT_FIELD = 'company_website'

export const honeypotSchema = z
  .string()
  .max(0, '잘못된 요청입니다.')
  .optional()

export const createInquirySchema = z.object({
  name: z
    .string({ error: '이름을 입력해 주세요.' })
    .trim()
    .min(2, '이름을 2자 이상 입력해 주세요.')
    .max(50, '이름은 50자를 넘을 수 없습니다.'),

  email: z
    .email({ error: '올바른 이메일 주소를 입력해 주세요.' })
    .trim()
    .max(254, '이메일 주소가 너무 깁니다.'),

  phone: z.preprocess(
    emptyToNull,
    z
      .string()
      .trim()
      .max(30, '연락처는 30자를 넘을 수 없습니다.')
      .regex(/^[0-9+\-\s()]+$/, '연락처는 숫자와 - + ( ) 만 사용할 수 있습니다.')
      .nullable(),
  ),

  inquiryType: z.enum(INQUIRY_TYPES, { error: '문의 유형을 선택해 주세요.' }),

  programSlug: z.preprocess(
    emptyToNull,
    z
      .string()
      .trim()
      .max(100, '관심 과정 값이 올바르지 않습니다.')
      .nullable(),
  ),

  message: z
    .string({ error: '문의 내용을 입력해 주세요.' })
    .trim()
    .min(10, '문의 내용을 10자 이상 입력해 주세요.')
    .max(2000, '문의 내용은 2000자를 넘을 수 없습니다.'),

  privacyConsent: z.literal(true, {
    error: '개인정보 수집·이용에 동의해 주세요.',
  }),
})

export type CreateInquiryInput = z.infer<typeof createInquirySchema>

export const inquiryIdSchema = z.uuid({ error: '잘못된 문의 번호입니다.' })

export const updateInquiryStatusSchema = z.object({
  id: inquiryIdSchema,
  status: z.enum(INQUIRY_STATUSES, { error: '잘못된 상태 값입니다.' }),
})

export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>

/** `YYYY-MM-DD`. 관리자 목록의 기간 필터에 쓴다. */
const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜는 YYYY-MM-DD 형식이어야 합니다.')

export const listInquiriesFilterSchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
  from: dateOnly.optional(),
  to: dateOnly.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export type ListInquiriesFilter = z.infer<typeof listInquiriesFilterSchema>
