import { createBrowserClient } from '@supabase/ssr'

import type { Database } from './database.types'
import { getSupabaseEnv } from './env'

/**
 * 브라우저용 Supabase 클라이언트.
 *
 * **현재 사용처 없음.** M3 의 관리자 로그인은 Server Action 으로 처리한다
 * (`src/lib/mutations/auth.ts`) — 비밀번호를 클라이언트 자바스크립트에서 다루지
 * 않고 세션 쿠키도 서버가 설정하기 때문이다.
 * 브라우저에서 직접 Supabase 를 호출해야 할 일이 생기면 이 함수를 쓴다.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv()

  return createBrowserClient<Database>(url, anonKey)
}
