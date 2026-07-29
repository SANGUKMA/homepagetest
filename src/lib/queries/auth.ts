import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { AdminUser } from '@/types/auth'

/**
 * 현재 로그인한 관리자 조회 (PRD FR-7).
 *
 * `getUser()` 를 쓴다. `getSession()` 은 쿠키에 담긴 값을 그대로 돌려주므로
 * 위조된 쿠키를 걸러내지 못한다. `getUser()` 는 Supabase Auth 서버에 토큰을
 * 검증시키므로 접근 제어 판단에는 이쪽만 쓴다.
 *
 * 인증되지 않았으면 예외 대신 `null` 을 돌려준다 — 비로그인은 오류가 아니라
 * 정상 상태이고, 호출부(관리자 레이아웃)가 로그인 화면으로 보낸다.
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    // 세션 없음(AuthSessionMissingError)은 정상 흐름이라 로그를 남기지 않는다.
    if (error.name !== 'AuthSessionMissingError') {
      console.error('[queries/auth] getCurrentUser failed', error)
    }
    return null
  }

  if (!user) {
    return null
  }

  return { id: user.id, email: user.email ?? null }
}
