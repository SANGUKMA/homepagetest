import type { NextRequest } from 'next/server'

import { updateSupabaseSession } from '@/lib/supabase/proxy'

/**
 * 세션 토큰 갱신만 담당한다 (PRD FR-7).
 *
 * **접근 제어는 여기서 하지 않는다.** 프록시의 판단은 쿠키만 보고 내려지므로,
 * 실제 차단은 `(admin)` 레이아웃이 `getCurrentUser()` 로 다시 확인한다.
 * 관리자 화면과 로그인 화면에서만 동작시켜 공개 페이지에는 부담을 주지 않는다.
 */
export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request)
}

// Next 16.2 는 프록시 파일에서도 matcher 를 `config` 로 읽는다 (`proxyConfig` 아님).
// 이름을 바꾸면 조용히 전체 경로에 매칭되어 공개 페이지마다 세션 조회가 붙는다.
export const config = {
  matcher: ['/admin/:path*', '/login'],
}
