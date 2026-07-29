/**
 * Supabase 환경 변수 접근.
 *
 * `process.env.NEXT_PUBLIC_*` 는 반드시 정적으로 참조해야 클라이언트 번들에
 * 인라인된다. 동적 인덱싱(`process.env[name]`)을 쓰면 브라우저에서 undefined 가
 * 되므로 아래처럼 리터럴로 읽는다.
 *
 * 서비스 롤 키는 서버 전용이라 이 파일에서 다루지 않는다 (CLAUDE.md §5).
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export type SupabaseEnv = {
  url: string
  anonKey: string
}

export function getSupabaseEnv(): SupabaseEnv {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase 환경 변수가 없습니다. .env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 설정하세요.',
    )
  }

  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY }
}
