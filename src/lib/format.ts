/**
 * 표시용 포맷 유틸.
 *
 * 데이터 접근은 하지 않는다. 서버·클라이언트 어디서 부르든 같은 결과가 나오도록
 * 시간대를 한국 시간으로 고정한다 — 고정하지 않으면 서버(UTC)와 브라우저(KST)의
 * 렌더 결과가 달라져 하이드레이션 불일치가 난다.
 */

const KST = 'Asia/Seoul'

const DATE_TIME = new Intl.DateTimeFormat('ko-KR', {
  timeZone: KST,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const DATE_ONLY = new Intl.DateTimeFormat('ko-KR', {
  timeZone: KST,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** `2026. 07. 29. 11:20` 형태 */
export function formatDateTime(isoString: string): string {
  return DATE_TIME.format(new Date(isoString))
}

/** `2026. 07. 29.` 형태 */
export function formatDate(isoString: string): string {
  return DATE_ONLY.format(new Date(isoString))
}
