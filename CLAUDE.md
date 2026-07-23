# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 따라야 할 규칙을 정의한다.
여기 적힌 규칙은 편의보다 우선한다. 규칙과 충돌하는 요청을 받으면 먼저 확인을 요청할 것.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 제품 | 온라인 대학 웹 서비스 |
| 1단계 | 대학 소개 + 입학·과정 문의 접수 — **범위 확정** (`docs/prd.md` v1.0) |
| 2단계 | LMS(학습관리) 확장 — 범위 미확정 |
| 상태 | Phase 1 구현 진행 (M0 설계 확정 완료 · 2026-07-23) |

**Phase 1 확정 사항** (상세는 `docs/prd.md` §12)

| 항목 | 결정 |
|---|---|
| 관리자 인증 | 인증자 = 관리자. `profiles.role`은 Phase 2 |
| 데이터 모델 | `inquiries` 단일 테이블 |
| 과정 콘텐츠 | 정적 관리(`src/lib/content`). DB 이관은 Phase 2 |
| 승인된 의존성 | `zod`, `@supabase/ssr` |
| 포함 페이지 | `/faq`, `/terms`, `/privacy` 모두 포함 |
| 스팸 방지 | 허니팟 + Cloudflare Turnstile |
| 문의 알림 | 신규 접수 시 관리자 이메일 발송 |

> ⚠️ 2단계 범위가 확정되기 전에는 LMS 도메인 테이블·화면을 임의로 추가하지 않는다.

---

## 2. 기술 스택

| 레이어 | 기술 | 비고 |
|---|---|---|
| 프레임워크 | Next.js (App Router) | Pages Router 사용 금지 |
| 언어 | TypeScript | `strict: true`, `any` 금지 |
| 스타일 | Tailwind CSS | 인라인 style 속성 지양 |
| DB / 인증 | Supabase (Postgres + Auth) | RLS 필수 |
| 배포 | Vercel | Preview → Production |

패키지 매니저와 Node 버전은 저장소 루트 설정을 따른다. 임의로 바꾸지 않는다.

---

## 3. 디렉터리 구조

```
src/
  app/          # 라우트, 페이지, layout, route handler
  components/   # 재사용 UI 컴포넌트 (데이터 접근 금지)
  lib/          # ★ 데이터 접근 계층 — DB/외부 API는 전부 여기로
    supabase/   # 클라이언트 생성, 타입
    queries/    # 읽기
    mutations/  # 쓰기
    validators/ # zod 스키마
  types/        # 공용 타입
```

---

## 4. 데이터 접근 규칙 (핵심)

- **모든 DB 접근은 `src/lib` 계층을 통해서만 한다.**
- `src/app/**`, `src/components/**` 에서 Supabase 클라이언트를 직접 생성하거나 `.from()`을 호출하지 않는다.
- 페이지·컴포넌트는 `src/lib`가 노출한 함수만 호출한다.

```ts
// ❌ 금지 — 페이지에서 직접 쿼리
const { data } = await supabase.from('inquiries').select('*')

// ✅ 허용 — lib 계층 경유
import { listInquiries } from '@/lib/queries/inquiries'
const inquiries = await listInquiries()
```

- `src/lib` 함수는 입력을 zod로 검증하고, 결과를 명시적 타입으로 반환한다.
- Supabase 타입은 생성된 타입(`Database`)을 기준으로 하고 손으로 고치지 않는다.

---

## 5. 보안 규칙

- **`.env*` 파일은 절대 커밋하지 않는다.** `.env.example`만 커밋한다.
- 시크릿을 코드·주석·로그·커밋 메시지·테스트 픽스처에 하드코딩하지 않는다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용. `NEXT_PUBLIC_` 접두사를 붙이지 않는다.
- 클라이언트 노출 허용: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 뿐.
- **모든 Supabase 테이블은 RLS를 켠다.** RLS 없는 테이블 생성 금지.
  - 테이블 생성 마이그레이션에는 `enable row level security` 와 정책이 같은 커밋에 포함되어야 한다.
  - 정책은 최소 권한 원칙. `using (true)` 는 공개 읽기가 명시적으로 의도된 경우에만.
- 사용자 입력은 서버 측에서 다시 검증한다. 클라이언트 검증만 믿지 않는다.

---

## 6. 언어 규칙

| 대상 | 언어 |
|---|---|
| 화면 카피, 라벨, 버튼, 에러 메시지, 이메일 문구 | **한국어** |
| 변수·함수·타입·파일명·DB 컬럼명 | **영어** |
| 커밋 메시지, 코드 주석 | 영어 권장 (한국어 허용) |

```ts
// ✅
const submitInquiry = async (input: InquiryInput) => { ... }
<button>문의 보내기</button>

// ❌
const 문의보내기 = async () => { ... }
<button>Submit Inquiry</button>
```

- 사용자 노출 문자열은 하드코딩 대신 한 곳에 모아 관리한다 (다국어 확장 대비).

---

## 7. 코딩 컨벤션

- 기본은 Server Component. `'use client'`는 상호작용이 필요한 최소 단위에만.
- 폼 제출·쓰기 작업은 Server Action 또는 route handler를 사용한다.
- 컴포넌트는 하나의 책임만. 200줄을 넘으면 분리를 검토한다.
- 에러는 삼키지 않는다. 사용자에게는 한국어 안내, 로그에는 원인.
- 새 의존성 추가는 먼저 제안하고 승인받는다.

---

## 8. 작업 방식

- 요청 범위 밖의 파일을 임의로 리팩터링하지 않는다.
- 파일을 새로 만들기 전에 기존 파일에서 해결 가능한지 먼저 본다.
- 스키마 변경은 마이그레이션 파일로 남긴다. 대시보드에서 직접 수정하지 않는다.
- 완료 전 확인: 타입 체크 통과 / 시크릿 노출 없음 / lib 계층 우회 없음 / RLS 존재.
