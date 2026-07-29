# 배포 런북 — Phase 1

> Preview → Production 절차와 배포 후 검증 항목. M4 산출물.

| 항목 | 값 |
|---|---|
| 호스팅 | Vercel — 프로젝트 `univ_homepagetest` |
| 운영 URL | https://univhomepagetest.vercel.app |
| DB · 인증 | Supabase — `online-university` (ap-northeast-2) |
| 브랜치 전략 | `main` = Production · PR = Preview |
| 최초 배포 | 2026-07-29 |

> Preview 배포 URL 은 Vercel 인증으로 보호된다. 외부에서 열리지 않는 것이 정상이며,
> Preview 를 외부와 공유하려면 Deployment Protection 설정을 따로 손봐야 한다.

---

## 00. 배포 전 준비 (사람이 해야 하는 일)

계정 로그인·키 발급이 필요해 코드로 자동화할 수 없는 작업이다.

| # | 작업 | 위치 | 확인 방법 |
|---|---|---|---|
| 1 | 관리자 계정 생성 | Supabase → Authentication → Users → Add user (**Auto Confirm User** 체크) | `/login` 으로 로그인된다 |
| 2 | **공개 회원가입 차단** | Supabase → Authentication → Sign In / Providers → Email → *Allow new users to sign up* 해제 | §03 검증 스크립트 |
| 3 | Turnstile 키 발급 | Cloudflare → Turnstile → 사이트 추가(배포 도메인 등록) | 문의 폼에 위젯이 뜬다 |
| 4 | Resend 도메인 인증·키 발급 | Resend → Domains → 발신 도메인 인증 후 API Key | 문의 접수 시 알림 메일 수신 |
| 5 | 배포 도메인 확정 | Vercel → Domains | `NEXT_PUBLIC_SITE_URL` 에 반영 |

> ⚠️ **2번은 선택이 아니다.** Phase 1 인증 모델은 "인증자 = 관리자"다. 공개 가입이 켜져 있으면
> 누구나 공개된 anon 키로 가입해 문의(개인정보)를 열람할 수 있다.

---

## 01. 환경 변수

Vercel → Settings → Environment Variables. **Production 과 Preview 에 각각** 넣는다.

| 변수 | 노출 | 필수 | 값 · 비고 |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | CLIENT | ❌ | Vercel 에서는 `VERCEL_PROJECT_PRODUCTION_URL` 로 자동 판별한다(커스텀 도메인 포함). 다른 값을 강제할 때만 넣는다 |
| `NEXT_PUBLIC_SUPABASE_URL` | CLIENT | ✅ | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | CLIENT | ✅ | 공개 키. RLS 로 보호된다 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CLIENT | 운영 ✅ | 없으면 위젯을 띄우지 않는다 |
| `TURNSTILE_SECRET_KEY` | **SERVER** | 운영 ✅ | 없으면 서버 검증을 건너뛴다 |
| `RESEND_API_KEY` | **SERVER** | 알림 시 ✅ | 없으면 발송만 건너뛴다(접수는 정상) |
| `INQUIRY_NOTIFY_FROM` | **SERVER** | 알림 시 ✅ | Resend 에서 인증한 도메인의 주소 |
| `INQUIRY_NOTIFY_TO` | **SERVER** | 알림 시 ✅ | 수신 주소. 쉼표로 여러 개 |
| `SUPABASE_SERVICE_ROLE_KEY` | **SERVER** | ❌ | 현재 코드에서 쓰지 않는다. 넣지 않는 편이 안전하다 |

**규칙** — `NEXT_PUBLIC_` 접두사는 위 표에서 CLIENT 로 표시된 것에만 붙인다. SERVER 항목에
접두사를 붙이면 브라우저 번들에 그대로 박힌다 (CLAUDE.md §5).

Preview 환경에는 **운영과 다른 Supabase 프로젝트를 쓰는 것이 안전하다.** 같은 프로젝트를 쓰면
Preview 테스트 문의가 운영 데이터에 섞인다. 현재는 프로젝트가 하나뿐이라 Preview 에서 실제
제출 테스트를 했다면 §04 로 정리한다.

---

## 02. 배포 절차

### 최초 1회

1. Vercel → Add New Project → GitHub 저장소 연결
2. Framework Preset: **Next.js** (자동 감지). Build Command·Output 은 기본값 그대로
3. §01 환경 변수 입력 (Production · Preview 모두)
4. Deploy

### 스키마 변경이 있을 때

마이그레이션은 **배포보다 먼저** 적용한다. 새 코드가 없는 컬럼을 참조하면 배포 직후 깨진다.

```bash
supabase link --project-ref <PROJECT_REF>
supabase db push
```

원격에 이미 적용된 마이그레이션은 `supabase_migrations.schema_migrations` 의 `version` 이
파일명 접두사와 일치해야 재적용을 시도하지 않는다.

### 평소

1. 작업 브랜치 → PR → **Preview 배포 자동 생성**
2. Preview URL 에서 §03 검증
3. PR 머지 → `main` → Production 자동 배포

---

## 03. 배포 후 검증

`BASE` 를 배포 URL 로 바꿔 실행한다.

```bash
BASE=https://example.com

# 1) 공개 라우트가 전부 뜨는가
for p in / /about /programs /programs/ai-convergence /admissions /faq \
         /inquiry /inquiry/complete /privacy /terms /login /sitemap.xml /robots.txt; do
  printf "%-32s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE$p")"
done

# 2) 관리자 영역이 비로그인 접근을 막는가  → 307 → /login
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "$BASE/admin"

# 3) 익명 조회가 막히는가  → permission denied
curl -s "$SUPABASE_URL/rest/v1/inquiries?select=id" \
  -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY"

# 4) 공개 회원가입이 막혔는가  → signup_disabled
curl -s -X POST "$SUPABASE_URL/auth/v1/signup" \
  -H "apikey: $ANON_KEY" -H "Content-Type: application/json" \
  -d '{"email":"probe@example.com","password":"a-long-enough-password-123"}'

# 5) sitemap 이 실제 도메인을 가리키는가 (localhost 면 NEXT_PUBLIC_SITE_URL 미설정)
curl -s "$BASE/sitemap.xml" | head -5

# 6) 보안 헤더
curl -s -I "$BASE/" | grep -i "x-content-type-options\|referrer-policy\|x-frame-options"
```

브라우저에서 직접 확인할 것:

- [ ] 문의 폼 제출 → `/inquiry/complete` 이동 → 관리자 목록에 실제로 보인다
- [ ] **Turnstile 위젯이 뜨고, 통과해야 제출된다** (로컬 미검증 항목)
- [ ] **관리자 알림 메일이 도착한다** (로컬 미검증 항목)
- [ ] 관리자 상태 변경이 목록에 반영된다
- [ ] 모바일 폭에서 헤더 메뉴·표가 깨지지 않는다

---

## 04. 운영 데이터 정리

Preview·검증 과정에서 넣은 테스트 문의는 남겨 두지 않는다. 익명·관리자 모두 삭제 권한이 없으므로
(RLS 상 DELETE 정책 없음) Supabase 대시보드의 SQL Editor 에서 지운다.

```sql
delete from public.inquiries where email like '%@example.com';
```

---

## 05. 롤백

| 상황 | 조치 |
|---|---|
| 배포 직후 오류 | Vercel → Deployments → 직전 배포 **Promote to Production** |
| 마이그레이션 문제 | 되돌리는 마이그레이션을 새로 작성해 적용한다. 이미 나간 마이그레이션 파일은 고치지 않는다 |
| 시크릿 유출 의심 | Supabase → API Keys 회전, Resend·Turnstile 키 재발급 후 Vercel 환경 변수 갱신 → 재배포 |

---

## 06. 알려진 미검증 항목

| 항목 | 상태 | 확인 시점 |
|---|---|---|
| Turnstile 위젯 렌더·서버 검증 | 키가 없어 로컬 미검증 | 키 발급 후 Preview |
| Resend 알림 메일 발송 | 키가 없어 로컬 미검증 | 도메인 인증 후 Preview |
| 실제 도메인 기준 메타·OG 태그 | `localhost` 로만 확인 | 도메인 연결 후 |
