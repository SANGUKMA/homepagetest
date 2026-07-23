import { createBrowserClient } from '@supabase/ssr'

import type { Database } from './database.types'
import { getSupabaseEnv } from './env'

/**
 * 브라우저용 Supabase 클라이언트.
 *
 * Phase 1 에서는 관리자 로그인(M3, `/login`)의 인증 흐름에만 쓴다.
 * 문의 데이터 읽기·쓰기는 서버 경로(queries/mutations)로만 처리한다.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv()

  return createBrowserClient<Database>(url, anonKey)
}
