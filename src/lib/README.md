# src/lib — 데이터 접근 계층

CLAUDE.md §4 규칙: **모든 DB/외부 API 접근은 이 계층을 통해서만** 한다.
`src/app`·`src/components`에서 Supabase 클라이언트를 직접 생성하거나 `.from()`을 호출하지 않는다.

| 디렉터리 | 역할 | 현재 파일 |
|---|---|---|
| `supabase/` | 클라이언트 생성, 생성된 `Database` 타입 | `server.ts` · `client.ts` · `middleware.ts` · `env.ts` · `database.types.ts` |
| `queries/` | 읽기 | `inquiries.ts` — `listInquiries` · `getInquiry` <br> `auth.ts` — `getCurrentUser` |
| `mutations/` | 쓰기 | `inquiries.ts` — `createInquiry` · `updateInquiryStatus` <br> `auth.ts` — `signIn` · `signOut` |
| `validators/` | zod 스키마 (입력 검증) | `inquiry.ts` · `auth.ts` |
| `content/` | 정적 콘텐츠·노출 문자열 | `site.ts` · `strings.ts` · `pages.ts` · `programs.ts` · `admissions.ts` · `faq.ts` · `legal.ts` · `emails.ts` |
| `spam/` | 스팸 방지 외부 API | `turnstile.ts` — `getTurnstileSiteKey` · `verifyTurnstileToken` |
| `email/` | 알림 메일 발송 외부 API | `inquiry-notification.ts` — `sendInquiryNotification` |
| `format.ts` | 표시용 포맷 (데이터 접근 없음) | `formatDateTime` · `formatDate` — 한국 시간 고정 |

각 함수는 입력을 zod로 검증하고 결과를 명시적 타입으로 반환한다.

## 규약

- **읽기**는 실패 시 예외를 던진다. 호출부(Server Component)는 `error.tsx`로 받는다.
- **쓰기**는 `ActionResult`를 반환한다. 실패 원인은 `console.error`로 남기고, 반환하는 `message`는 사용자에게 그대로 보여줄 한국어 문구다.
- DB 컬럼명(snake_case)은 이 계층 밖으로 나가지 않는다. 도메인 타입(`src/types`)으로 옮겨서 반환한다.
- `database.types.ts`는 **생성물**이다. 손으로 고치지 않고 아래 명령으로 덮어쓴다.

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> > src/lib/supabase/database.types.ts
```

## 승인된 의존성

`zod`, `@supabase/ssr`(+ peer `@supabase/supabase-js`). 그 밖의 패키지는 CLAUDE.md §7에 따라 도입 전 승인을 받는다.
