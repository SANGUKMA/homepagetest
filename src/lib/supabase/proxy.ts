import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import type { Database } from './database.types'
import { getSupabaseEnv } from './env'

/**
 * 프록시용 Supabase 클라이언트 (`src/proxy.ts`).
 *
 * Server Component 에서는 쿠키를 쓸 수 없어(`server.ts` 참고) 만료된 액세스 토큰을
 * 갱신해도 저장할 방법이 없다. 그래서 갱신은 프록시가 맡는다.
 * `getUser()` 호출이 필요하면 토큰을 갱신하고, 갱신된 쿠키를 응답에 실어 보낸다.
 *
 * 반환한 응답을 그대로 돌려주어야 한다. 새 응답 객체를 만들면 갱신된 쿠키가
 * 사라져 로그인 상태가 임의로 풀린다.
 */
export async function updateSupabaseSession(
  request: NextRequest,
): Promise<NextResponse> {
  let response = NextResponse.next({ request })

  const { url, anonKey } = getSupabaseEnv()

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  // 이 호출이 토큰 갱신을 유발한다. 결과는 여기서 쓰지 않는다 —
  // 접근 제어 판단은 항상 서버 컴포넌트(관리자 레이아웃)에서 다시 한다.
  await supabase.auth.getUser()

  return response
}
