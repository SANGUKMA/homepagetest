/**
 * 문의 알림 메일 발송 (PRD FR-10).
 *
 * 외부 API 호출이므로 `src/lib` 안에 둔다 (CLAUDE.md §4).
 * M2 승인 사항: **Resend HTTP API 직접 호출** — SDK 패키지를 추가하지 않고
 * fetch 로 REST 엔드포인트를 호출한다 (CLAUDE.md §7).
 *
 * 필요한 서버 전용 환경 변수 (`NEXT_PUBLIC_` 금지 · CLAUDE.md §5)
 *   RESEND_API_KEY      Resend API 키
 *   INQUIRY_NOTIFY_FROM 발신 주소 (Resend 에서 인증된 도메인)
 *   INQUIRY_NOTIFY_TO   수신 주소 (쉼표로 여러 개)
 */

import {
  buildInquiryNotificationEmail,
  type InquiryEmailData,
} from '@/lib/content/emails'

const SEND_ENDPOINT = 'https://api.resend.com/emails'

export type NotificationResult =
  | { status: 'sent' }
  /** 환경 변수 미설정 — 로컬 개발 등 */
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string }

function getRecipients(): string[] {
  return (process.env.INQUIRY_NOTIFY_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter((address) => address !== '')
}

/**
 * 신규 문의를 관리자에게 알린다.
 *
 * **이 함수는 절대 throw 하지 않는다.** 문의는 이미 저장된 뒤에 호출되므로,
 * 메일 발송 실패가 사용자에게 접수 실패로 보이면 안 된다. 실패는 로그로만 남긴다
 * (CLAUDE.md §7 — 에러는 삼키지 않는다).
 *
 * 로그에 문의 본문·연락처를 남기지 않는다. 개인정보이기 때문이다.
 */
export async function sendInquiryNotification(
  data: InquiryEmailData,
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.INQUIRY_NOTIFY_FROM
  const to = getRecipients()

  if (!apiKey || !from || to.length === 0) {
    console.warn(
      '[email/inquiry-notification] RESEND_API_KEY · INQUIRY_NOTIFY_FROM · INQUIRY_NOTIFY_TO 중 누락된 값이 있어 발송을 건너뜁니다.',
    )
    return { status: 'skipped', reason: 'missing-env' }
  }

  const { subject, text } = buildInquiryNotificationEmail(data)

  try {
    const response = await fetch(SEND_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        // 관리자가 메일에서 바로 회신하면 문의자에게 가도록 한다.
        reply_to: data.email,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      // 응답 본문에 API 키는 포함되지 않는다. 원인 파악을 위해 상태 코드만 남긴다.
      console.error(
        '[email/inquiry-notification] 발송 실패',
        response.status,
        response.statusText,
      )
      return { status: 'failed', reason: `http-${response.status}` }
    }

    return { status: 'sent' }
  } catch (error) {
    console.error('[email/inquiry-notification] 발송 요청 실패', error)
    return { status: 'failed', reason: 'request-failed' }
  }
}
