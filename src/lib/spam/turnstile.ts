/**
 * Cloudflare Turnstile 검증 (PRD FR-12).
 *
 * 외부 API 호출이므로 `src/lib` 안에 둔다 (CLAUDE.md §4).
 * M0 결정: 허니팟 + Turnstile 병행. M2 승인 사항: **무의존 직접 연동** —
 * 위젯은 Cloudflare 스크립트를 그대로 쓰고, 검증은 아래 siteverify 호출로 한다.
 * 추가 npm 패키지는 쓰지 않는다 (CLAUDE.md §7).
 */

const VERIFY_ENDPOINT =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export type TurnstileVerification =
  /** 검증 통과, 또는 키 미설정으로 검증을 건너뜀 */
  | { status: 'ok' }
  /** Cloudflare 가 토큰을 거부함 — 사용자 제출을 막는다 */
  | { status: 'rejected'; reason: string }

type SiteVerifyResponse = {
  success: boolean
  'error-codes'?: string[]
}

/**
 * 위젯 렌더링용 공개 사이트 키.
 *
 * `NEXT_PUBLIC_*` 는 정적으로 참조해야 번들에 인라인된다 (`supabase/env.ts` 와 동일).
 * 키가 없으면 위젯을 렌더링하지 않고 허니팟만으로 동작한다 — 로컬 개발용 경로다.
 */
export function getTurnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null
}

/**
 * 위젯이 발급한 토큰을 Cloudflare 에 확인한다.
 *
 * 실패 처리 방침 — Cloudflare 가 토큰을 **명시적으로 거부**하면 제출을 막는다.
 * 반면 siteverify 자체에 닿지 못하는 장애 상황에서는 통과시킨다.
 * 문의 접수(FR-4, Must)를 외부 서비스 장애로 전면 중단시키지 않기 위한 선택이며,
 * 이 경우에도 허니팟과 서버 zod 재검증은 그대로 동작한다. 원인은 로그로 남긴다.
 */
export async function verifyTurnstileToken(
  token: unknown,
  remoteIp?: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    console.warn(
      '[spam/turnstile] TURNSTILE_SECRET_KEY 가 없어 검증을 건너뜁니다. 운영 환경에서는 반드시 설정해야 합니다.',
    )
    return { status: 'ok' }
  }

  if (typeof token !== 'string' || token.trim() === '') {
    return { status: 'rejected', reason: 'missing-token' }
  }

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  try {
    const response = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(
        '[spam/turnstile] siteverify 응답 오류',
        response.status,
        response.statusText,
      )
      return { status: 'ok' }
    }

    const result = (await response.json()) as SiteVerifyResponse

    if (!result.success) {
      const reason = result['error-codes']?.join(',') ?? 'unknown'
      console.warn('[spam/turnstile] 토큰이 거부되었습니다', reason)
      return { status: 'rejected', reason }
    }

    return { status: 'ok' }
  } catch (error) {
    console.error('[spam/turnstile] siteverify 호출 실패', error)
    return { status: 'ok' }
  }
}
