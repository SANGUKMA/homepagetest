# src/lib — 데이터 접근 계층

CLAUDE.md §4 규칙: **모든 DB/외부 API 접근은 이 계층을 통해서만** 한다.
`src/app`·`src/components`에서 Supabase 클라이언트를 직접 생성하거나 `.from()`을 호출하지 않는다.

| 디렉터리 | 역할 |
|---|---|
| `supabase/` | 클라이언트 생성, 생성된 `Database` 타입 |
| `queries/` | 읽기 |
| `mutations/` | 쓰기 |
| `validators/` | zod 스키마 (입력 검증) |

각 함수는 입력을 zod로 검증하고 결과를 명시적 타입으로 반환한다.
Supabase/zod 의존성은 CLAUDE.md §7에 따라 도입 전 승인 후 추가한다.
