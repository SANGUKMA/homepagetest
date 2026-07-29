import { z } from 'zod'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validators/auth'
import type { ActionResult } from '@/types/result'

/**
 * 관리자 인증 (PRD FR-7).
 *
 * 세션 쿠키는 서버 클라이언트가 설정하므로 Server Action 안에서만 호출한다.
 * 실패 원인은 로그로 남기고, 반환하는 `message` 는 사용자에게 그대로 보여줄
 * 한국어 문구다 (CLAUDE.md §7).
 */

export async function signIn(input: unknown): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: '입력값을 다시 확인해 주세요.',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    })

    if (error) {
      // 어떤 쪽이 틀렸는지 알리지 않는다 — 계정 존재 여부가 드러나면 안 된다.
      console.error('[mutations/auth] signIn failed', error.message)
      return {
        ok: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      }
    }
  } catch (cause) {
    console.error('[mutations/auth] signIn threw', cause)
    return {
      ok: false,
      message: '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  return { ok: true, data: undefined }
}

export async function signOut(): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('[mutations/auth] signOut failed', error)
      return {
        ok: false,
        message: '로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      }
    }
  } catch (cause) {
    console.error('[mutations/auth] signOut threw', cause)
    return {
      ok: false,
      message: '로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  return { ok: true, data: undefined }
}
