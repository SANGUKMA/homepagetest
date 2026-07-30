import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import type { Database } from './database.types'
import { getSupabaseEnv } from './env'

/**
 * 서버(Server Component · Server Action · route handler)용 Supabase 클라이언트.
 *
 * anon 키로 만들고 세션 쿠키를 붙이므로 모든 접근은 RLS 정책의 통제를 받는다.
 * 서비스 롤 키는 여기서 쓰지 않는다 (CLAUDE.md §5).
 *
 * `src/app` · `src/components` 에서 직접 호출하지 않는다. queries/mutations 계층만
 * 이 함수를 사용한다 (CLAUDE.md §4).
 */
export async function createSupabaseServerClient() {
  // `cookies()` 를 먼저 부른다. 이 호출이 "이 페이지는 요청 시점에 렌더한다"는
  // 신호라서, 빌드의 프리렌더 단계는 여기서 빠져나간다.
  //
  // 순서를 바꿔 환경 변수 검사가 앞에 오면, 빌드 환경에 변수가 없을 때 그 예외가
  // 프리렌더 도중 터져 빌드 전체가 실패한다. 실제로 Vercel 첫 배포가 이렇게 깨졌다.
  // 런타임에 변수가 없으면 여전히 아래에서 예외가 나며, 그게 맞는 동작이다.
  const cookieStore = await cookies()
  const { url, anonKey } = getSupabaseEnv()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Server Component 에서는 쿠키를 쓸 수 없다.
          // 세션 갱신은 proxy 가 담당하므로 여기서는 무시해도 안전하다.
        }
      },
    },
  })
}
