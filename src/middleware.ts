import type { NextRequest } from 'next/server'

import { updateSupabaseSession } from '@/lib/supabase/middleware'

/**
 * 세션 토큰 갱신만 담당한다 (PRD FR-7).
 *
 * **접근 제어는 여기서 하지 않는다.** 미들웨어의 판단은 쿠키만 보고 내려지므로,
 * 실제 차단은 `(admin)` 레이아웃이 `getCurrentUser()` 로 다시 확인한다.
 * 관리자 화면과 로그인 화면에서만 동작시켜 공개 페이지에는 부담을 주지 않는다.
 */
export async function middleware(request: NextRequest) {
  return updateSupabaseSession(request)
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
