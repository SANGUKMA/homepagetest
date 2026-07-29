import { z } from 'zod'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  createInquirySchema,
  updateInquiryStatusSchema,
} from '@/lib/validators/inquiry'
import type { ActionResult } from '@/types/result'

/**
 * 문의 쓰기.
 *
 * 입력은 항상 zod 로 다시 검증한다. 실패 원인은 서버 로그로만 남기고,
 * 호출부에는 사용자에게 그대로 보여줄 한국어 문구를 돌려준다 (CLAUDE.md §5·§7).
 */

/**
 * 문의 접수 (공개).
 *
 * RLS 상 anon 은 insert 만 가능하고 select 권한이 없다. 따라서 삽입 후
 * `.select()` 를 붙이지 않는다 — 붙이면 권한 오류가 난다 (설계 문서 §03).
 */
export async function createInquiry(input: unknown): Promise<ActionResult> {
  const parsed = createInquirySchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: '입력값을 다시 확인해 주세요.',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('inquiries').insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    inquiry_type: parsed.data.inquiryType,
    program_slug: parsed.data.programSlug,
    message: parsed.data.message,
    privacy_consent: parsed.data.privacyConsent,
    // status 는 DB 기본값 'new' 를 쓴다. RLS insert 정책도 'new' 만 허용한다.
  })

  if (error) {
    console.error('[mutations/inquiries] createInquiry failed', error)
    return {
      ok: false,
      message: '문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  return { ok: true, data: undefined }
}

/**
 * 문의 상태 변경 (관리자).
 *
 * `authenticated` 에게는 status 컬럼 update 권한만 부여돼 있어, 다른 컬럼을
 * 바꾸려 하면 DB 가 거부한다.
 */
export async function updateInquiryStatus(input: unknown): Promise<ActionResult> {
  const parsed = updateInquiryStatusSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: '요청이 올바르지 않습니다.',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const supabase = await createSupabaseServerClient()

  const { error, count } = await supabase
    .from('inquiries')
    .update({ status: parsed.data.status }, { count: 'exact' })
    .eq('id', parsed.data.id)

  if (error) {
    console.error('[mutations/inquiries] updateInquiryStatus failed', error)
    return {
      ok: false,
      message: '상태를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  if (count === 0) {
    // RLS 로 걸러졌거나 존재하지 않는 문의다. 어느 쪽인지는 구분해 알리지 않는다.
    return { ok: false, message: '해당 문의를 찾을 수 없습니다.' }
  }

  return { ok: true, data: undefined }
}
