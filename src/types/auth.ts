/**
 * 인증 도메인 공용 타입.
 *
 * Phase 1 의 인증 모델은 **인증자 = 관리자**다 (M0 확정 · `docs/prd.md` §12.1).
 * 역할 구분(`profiles.role`)은 Phase 2 범위이므로 여기에 role 필드를 두지 않는다.
 */

export type AdminUser = {
  id: string
  email: string | null
}
