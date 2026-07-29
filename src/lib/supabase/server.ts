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
  const { url, anonKey } = getSupabaseEnv()
  const cookieStore = await cookies()

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
          // 세션 갱신은 middleware 가 담당하므로 여기서는 무시해도 안전하다.
        }
      },
    },
  })
}
