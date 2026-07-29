# 온라인 대학 홈페이지 (homepagetest)

대학 소개 + 입학·과정 문의 접수를 위한 웹 서비스 (Phase 1).
저장소 규칙은 [`CLAUDE.md`](./CLAUDE.md)를 따른다.

## 기술 스택

- **Next.js 16** (App Router)
- **TypeScript** (`strict: true`)
- **Tailwind CSS v4**
- (M1 예정) Supabase (Postgres + Auth) · `zod` · `@supabase/ssr`
- (M4 예정) Vercel 배포

## 요구사항

- Node.js **20 이상** (개발은 v22 기준)

## 시작하기

```bash
# 1) 의존성 설치
npm install

# 2) 환경 변수 준비 (Supabase 연동은 M1부터 필요)
cp .env.example .env.local

# 3) 개발 서버 실행 → http://localhost:3000
npm run dev
```

기타 스크립트:

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```

## 디렉터리 구조

```
src/
  app/          # 라우트, 페이지, layout, route handler
  components/   # 재사용 UI (데이터 접근 금지)
  lib/          # 데이터 접근 계층 (DB/외부 API는 전부 여기로)
    supabase/   # 클라이언트 생성, 타입
    queries/    # 읽기
    mutations/  # 쓰기
    validators/ # zod 스키마
  types/        # 공용 타입
docs/           # 설계 문서 (PRD, Phase 1 설계)
```

## 문서

- [`CLAUDE.md`](./CLAUDE.md) — 저장소 규칙
- [`docs/prd.md`](./docs/prd.md) — 제품 요구사항
- [`docs/phase1-design.md`](./docs/phase1-design.md) — 사이트 구조·User Flow·기술 스택
